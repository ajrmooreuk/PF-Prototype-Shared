"""
Digital Ocean API Client.

Implements WBS-2.3.1: Setup DO API client.
"""

from typing import Any

import structlog
import digitalocean
from digitalocean import Droplet, Firewall, Domain, Record

from pf_cicd_agent.config.settings import Settings, get_settings


logger = structlog.get_logger(__name__)


class DOClientError(Exception):
    """Custom exception for Digital Ocean client errors."""

    def __init__(
        self,
        message: str,
        details: dict[str, Any] | None = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.details = details or {}


class DOClient:
    """
    Digital Ocean API client wrapper.

    Provides a simplified interface for common DO operations
    used by the CI/CD agent.
    """

    def __init__(self, settings: Settings | None = None) -> None:
        """
        Initialize the Digital Ocean client.

        Args:
            settings: Application settings
        """
        self.settings = settings or get_settings()
        self._token = self.settings.do_api_token.get_secret_value()

    def _get_manager(self) -> digitalocean.Manager:
        """Get a DO Manager instance."""
        return digitalocean.Manager(token=self._token)

    def get_droplet(self, droplet_id: int) -> Droplet:
        """
        Get a droplet by ID.

        Args:
            droplet_id: Droplet ID

        Returns:
            Droplet object
        """
        try:
            manager = self._get_manager()
            return manager.get_droplet(droplet_id)
        except Exception as e:
            raise DOClientError(f"Failed to get droplet: {e}")

    def get_droplet_by_name(self, name: str) -> Droplet | None:
        """
        Get a droplet by name.

        Args:
            name: Droplet name

        Returns:
            Droplet object or None
        """
        try:
            manager = self._get_manager()
            droplets = manager.get_all_droplets()
            for droplet in droplets:
                if droplet.name == name:
                    return droplet
            return None
        except Exception as e:
            raise DOClientError(f"Failed to find droplet: {e}")

    def create_droplet(
        self,
        name: str,
        size: str = "s-1vcpu-1gb",
        region: str | None = None,
        image: str | None = None,
        ssh_keys: list[str] | None = None,
        backups: bool = False,
        monitoring: bool = True,
        tags: list[str] | None = None,
        user_data: str | None = None,
    ) -> Droplet:
        """
        Create a new droplet.

        Args:
            name: Droplet name
            size: Droplet size slug
            region: Region slug
            image: Image slug
            ssh_keys: List of SSH key fingerprints
            backups: Enable backups
            monitoring: Enable monitoring
            tags: List of tags
            user_data: Cloud-init user data script

        Returns:
            Created Droplet object
        """
        try:
            droplet = Droplet(
                token=self._token,
                name=name,
                region=region or self.settings.do_region,
                image=image or self.settings.do_default_image,
                size_slug=size,
                ssh_keys=ssh_keys or [self.settings.do_ssh_key_fingerprint],
                backups=backups,
                monitoring=monitoring,
                tags=tags or [],
                user_data=user_data,
            )
            droplet.create()

            logger.info(
                "droplet_created",
                name=name,
                id=droplet.id,
                region=region or self.settings.do_region,
                size=size,
            )

            return droplet

        except Exception as e:
            raise DOClientError(f"Failed to create droplet: {e}")

    def wait_for_droplet(self, droplet: Droplet, timeout: int = 300) -> Droplet:
        """
        Wait for a droplet to be active and get its IP.

        Args:
            droplet: Droplet to wait for
            timeout: Timeout in seconds

        Returns:
            Droplet with IP address
        """
        import time

        start = time.time()
        while time.time() - start < timeout:
            droplet.load()
            if droplet.status == "active" and droplet.ip_address:
                logger.info(
                    "droplet_active",
                    name=droplet.name,
                    ip=droplet.ip_address,
                )
                return droplet
            time.sleep(5)

        raise DOClientError(
            f"Timeout waiting for droplet {droplet.name} to be active",
            details={"status": droplet.status, "timeout": timeout},
        )

    def delete_droplet(self, droplet_id: int) -> bool:
        """
        Delete a droplet.

        Args:
            droplet_id: Droplet ID

        Returns:
            True if deleted
        """
        try:
            droplet = self.get_droplet(droplet_id)
            droplet.destroy()
            logger.info("droplet_deleted", id=droplet_id)
            return True
        except Exception as e:
            raise DOClientError(f"Failed to delete droplet: {e}")

    def get_firewall(self, firewall_id: str) -> Firewall:
        """
        Get a firewall by ID.

        Args:
            firewall_id: Firewall ID

        Returns:
            Firewall object
        """
        try:
            manager = self._get_manager()
            firewalls = manager.get_all_firewalls()
            for fw in firewalls:
                if fw.id == firewall_id:
                    return fw
            raise DOClientError(f"Firewall {firewall_id} not found")
        except DOClientError:
            raise
        except Exception as e:
            raise DOClientError(f"Failed to get firewall: {e}")

    def create_firewall(
        self,
        name: str,
        inbound_rules: list[dict[str, Any]],
        outbound_rules: list[dict[str, Any]],
        droplet_ids: list[int] | None = None,
        tags: list[str] | None = None,
    ) -> Firewall:
        """
        Create a firewall.

        Args:
            name: Firewall name
            inbound_rules: List of inbound rule dicts
            outbound_rules: List of outbound rule dicts
            droplet_ids: Droplets to attach
            tags: Tags for the firewall

        Returns:
            Created Firewall object
        """
        try:
            # Convert rule dicts to InboundRule/OutboundRule objects
            from digitalocean import InboundRule, OutboundRule, Sources, Destinations

            inbound = []
            for rule in inbound_rules:
                sources = Sources(
                    addresses=rule.get("sources", {}).get("addresses", ["0.0.0.0/0", "::/0"])
                )
                inbound.append(
                    InboundRule(
                        protocol=rule.get("protocol", "tcp"),
                        ports=rule.get("ports", "22"),
                        sources=sources,
                    )
                )

            outbound = []
            for rule in outbound_rules:
                destinations = Destinations(
                    addresses=rule.get("destinations", {}).get("addresses", ["0.0.0.0/0", "::/0"])
                )
                outbound.append(
                    OutboundRule(
                        protocol=rule.get("protocol", "tcp"),
                        ports=rule.get("ports", "all"),
                        destinations=destinations,
                    )
                )

            firewall = Firewall(
                token=self._token,
                name=name,
                inbound_rules=inbound,
                outbound_rules=outbound,
                droplet_ids=droplet_ids or [],
                tags=tags or [],
            )
            firewall.create()

            logger.info("firewall_created", name=name, id=firewall.id)
            return firewall

        except Exception as e:
            raise DOClientError(f"Failed to create firewall: {e}")

    def add_droplet_to_firewall(self, firewall_id: str, droplet_id: int) -> bool:
        """
        Add a droplet to a firewall.

        Args:
            firewall_id: Firewall ID
            droplet_id: Droplet ID

        Returns:
            True if added
        """
        try:
            firewall = self.get_firewall(firewall_id)
            firewall.add_droplets([droplet_id])
            logger.info("droplet_added_to_firewall", firewall=firewall_id, droplet=droplet_id)
            return True
        except Exception as e:
            raise DOClientError(f"Failed to add droplet to firewall: {e}")

    def get_domain(self, domain_name: str) -> Domain:
        """
        Get a domain by name.

        Args:
            domain_name: Domain name

        Returns:
            Domain object
        """
        try:
            domain = Domain(token=self._token, name=domain_name)
            domain.load()
            return domain
        except Exception as e:
            raise DOClientError(f"Failed to get domain: {e}")

    def create_dns_record(
        self,
        domain_name: str,
        record_type: str,
        name: str,
        data: str,
        ttl: int = 3600,
    ) -> Record:
        """
        Create a DNS record.

        Args:
            domain_name: Domain name
            record_type: Record type (A, AAAA, CNAME, etc.)
            name: Record name (subdomain)
            data: Record data (IP for A, target for CNAME)
            ttl: TTL in seconds

        Returns:
            Created Record object
        """
        try:
            domain = self.get_domain(domain_name)
            record = domain.create_new_domain_record(
                type=record_type,
                name=name,
                data=data,
                ttl=ttl,
            )

            logger.info(
                "dns_record_created",
                domain=domain_name,
                type=record_type,
                name=name,
                data=data,
            )

            return record

        except Exception as e:
            raise DOClientError(f"Failed to create DNS record: {e}")

    def delete_dns_record(self, domain_name: str, record_id: int) -> bool:
        """
        Delete a DNS record.

        Args:
            domain_name: Domain name
            record_id: Record ID

        Returns:
            True if deleted
        """
        try:
            domain = self.get_domain(domain_name)
            records = domain.get_records()
            for record in records:
                if record.id == record_id:
                    record.destroy()
                    logger.info("dns_record_deleted", domain=domain_name, id=record_id)
                    return True
            raise DOClientError(f"Record {record_id} not found")
        except DOClientError:
            raise
        except Exception as e:
            raise DOClientError(f"Failed to delete DNS record: {e}")

    def list_droplets(self, tag: str | None = None) -> list[Droplet]:
        """
        List all droplets, optionally filtered by tag.

        Args:
            tag: Optional tag filter

        Returns:
            List of droplets
        """
        try:
            manager = self._get_manager()
            if tag:
                return manager.get_all_droplets(tag_name=tag)
            return manager.get_all_droplets()
        except Exception as e:
            raise DOClientError(f"Failed to list droplets: {e}")
