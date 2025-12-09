"""
GitHub API Client.

Implements WBS-2.2.1: Setup GitHub API client.
"""

from typing import Any

import structlog
from github import Github, GithubException
from github.Repository import Repository
from github.Organization import Organization

from pf_cicd_agent.config.settings import Settings, get_settings


logger = structlog.get_logger(__name__)


class GitHubClientError(Exception):
    """Custom exception for GitHub client errors."""

    def __init__(
        self,
        message: str,
        status_code: int | None = None,
        response: Any = None,
    ) -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.response = response


class GitHubClient:
    """
    GitHub API client wrapper.

    Provides a simplified interface for common GitHub operations
    used by the CI/CD agent.
    """

    def __init__(self, settings: Settings | None = None) -> None:
        """
        Initialize the GitHub client.

        Args:
            settings: Application settings
        """
        self.settings = settings or get_settings()
        self._client: Github | None = None

    @property
    def client(self) -> Github:
        """Get the PyGithub client instance."""
        if self._client is None:
            self._client = Github(self.settings.github_token.get_secret_value())
        return self._client

    @property
    def org(self) -> Organization:
        """Get the configured organization."""
        return self.client.get_organization(self.settings.github_org)

    def get_repo(self, repo_name: str) -> Repository:
        """
        Get a repository by name.

        Args:
            repo_name: Repository name (without org prefix)

        Returns:
            Repository object
        """
        full_name = f"{self.settings.github_org}/{repo_name}"
        return self.client.get_repo(full_name)

    def repo_exists(self, repo_name: str) -> bool:
        """
        Check if a repository exists.

        Args:
            repo_name: Repository name

        Returns:
            True if repo exists
        """
        try:
            self.get_repo(repo_name)
            return True
        except GithubException as e:
            if e.status == 404:
                return False
            raise GitHubClientError(
                f"Error checking repository: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def create_repo(
        self,
        name: str,
        description: str = "",
        private: bool = True,
        auto_init: bool = True,
        has_issues: bool = True,
        has_wiki: bool = False,
        has_projects: bool = True,
        template_repo: str | None = None,
    ) -> Repository:
        """
        Create a new repository in the organization.

        Args:
            name: Repository name
            description: Repository description
            private: Whether repo is private
            auto_init: Initialize with README
            has_issues: Enable issues
            has_wiki: Enable wiki
            has_projects: Enable projects
            template_repo: Optional template repository name

        Returns:
            Created Repository object
        """
        try:
            if template_repo:
                # Create from template
                template = self.get_repo(template_repo)
                repo = self.org.create_repo_from_template(
                    name=name,
                    repo=template,
                    description=description,
                    private=private,
                )
            else:
                # Create empty repo
                repo = self.org.create_repo(
                    name=name,
                    description=description,
                    private=private,
                    auto_init=auto_init,
                    has_issues=has_issues,
                    has_wiki=has_wiki,
                    has_projects=has_projects,
                )

            logger.info("repo_created", repo=name, org=self.settings.github_org)
            return repo

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to create repository: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def delete_repo(self, repo_name: str) -> bool:
        """
        Delete a repository.

        Args:
            repo_name: Repository name

        Returns:
            True if deleted
        """
        try:
            repo = self.get_repo(repo_name)
            repo.delete()
            logger.info("repo_deleted", repo=repo_name)
            return True
        except GithubException as e:
            raise GitHubClientError(
                f"Failed to delete repository: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def set_branch_protection(
        self,
        repo_name: str,
        branch: str,
        required_approving_review_count: int = 1,
        dismiss_stale_reviews: bool = True,
        require_code_owner_reviews: bool = False,
        required_status_checks: list[str] | None = None,
        enforce_admins: bool = True,
    ) -> dict[str, Any]:
        """
        Set branch protection rules.

        Args:
            repo_name: Repository name
            branch: Branch to protect
            required_approving_review_count: Required approvals
            dismiss_stale_reviews: Dismiss stale reviews on push
            require_code_owner_reviews: Require code owner review
            required_status_checks: Required CI checks
            enforce_admins: Enforce rules for admins

        Returns:
            Branch protection settings
        """
        try:
            repo = self.get_repo(repo_name)
            branch_obj = repo.get_branch(branch)

            branch_obj.edit_protection(
                required_approving_review_count=required_approving_review_count,
                dismiss_stale_reviews=dismiss_stale_reviews,
                require_code_owner_reviews=require_code_owner_reviews,
                required_linear_history=False,
                enforce_admins=enforce_admins,
                contexts=required_status_checks or [],
                strict=True,
            )

            logger.info(
                "branch_protection_set",
                repo=repo_name,
                branch=branch,
                reviews=required_approving_review_count,
            )

            return {
                "branch": branch,
                "required_reviews": required_approving_review_count,
                "status_checks": required_status_checks,
            }

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to set branch protection: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def create_environment(
        self,
        repo_name: str,
        environment_name: str,
        wait_timer: int = 0,
        reviewers: list[str] | None = None,
    ) -> dict[str, Any]:
        """
        Create a deployment environment.

        Args:
            repo_name: Repository name
            environment_name: Environment name
            wait_timer: Wait timer in minutes
            reviewers: List of reviewer usernames

        Returns:
            Environment configuration
        """
        try:
            repo = self.get_repo(repo_name)

            # GitHub API for environments
            url = f"/repos/{self.settings.github_org}/{repo_name}/environments/{environment_name}"

            payload: dict[str, Any] = {}
            if wait_timer > 0:
                payload["wait_timer"] = wait_timer

            if reviewers:
                payload["reviewers"] = [
                    {"type": "User", "id": self.client.get_user(r).id} for r in reviewers
                ]
                payload["prevent_self_review"] = True

            # Use the underlying requester
            _, data = repo._requester.requestJsonAndCheck("PUT", url, input=payload)

            logger.info(
                "environment_created",
                repo=repo_name,
                environment=environment_name,
            )

            return {
                "name": environment_name,
                "wait_timer": wait_timer,
                "reviewers": reviewers,
            }

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to create environment: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def set_environment_secret(
        self,
        repo_name: str,
        environment_name: str,
        secret_name: str,
        secret_value: str,
    ) -> bool:
        """
        Set an environment secret.

        Args:
            repo_name: Repository name
            environment_name: Environment name
            secret_name: Secret name
            secret_value: Secret value

        Returns:
            True if set successfully
        """
        try:
            repo = self.get_repo(repo_name)

            # Get repo public key for encryption
            public_key = repo.get_public_key()

            # Encrypt the secret using the public key
            from nacl import public, encoding

            public_key_bytes = public.PublicKey(
                public_key.key.encode("utf-8"),
                encoding.Base64Encoder(),
            )
            sealed_box = public.SealedBox(public_key_bytes)
            encrypted = sealed_box.encrypt(secret_value.encode("utf-8"))
            encrypted_value = encoding.Base64Encoder().encode(encrypted).decode("utf-8")

            # Create the secret
            url = f"/repos/{self.settings.github_org}/{repo_name}/environments/{environment_name}/secrets/{secret_name}"
            repo._requester.requestJsonAndCheck(
                "PUT",
                url,
                input={
                    "encrypted_value": encrypted_value,
                    "key_id": public_key.key_id,
                },
            )

            logger.info(
                "environment_secret_set",
                repo=repo_name,
                environment=environment_name,
                secret=secret_name,
            )

            return True

        except ImportError:
            # Fall back to repo-level secrets if nacl not available
            logger.warning("nacl not available, using repo-level secrets")
            return self.set_repo_secret(repo_name, secret_name, secret_value)

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to set environment secret: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def set_repo_secret(
        self,
        repo_name: str,
        secret_name: str,
        secret_value: str,
    ) -> bool:
        """
        Set a repository secret.

        Args:
            repo_name: Repository name
            secret_name: Secret name
            secret_value: Secret value

        Returns:
            True if set successfully
        """
        try:
            repo = self.get_repo(repo_name)
            repo.create_secret(secret_name, secret_value)

            logger.info("repo_secret_set", repo=repo_name, secret=secret_name)
            return True

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to set repo secret: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def create_file(
        self,
        repo_name: str,
        path: str,
        content: str,
        message: str,
        branch: str = "main",
    ) -> dict[str, Any]:
        """
        Create or update a file in a repository.

        Args:
            repo_name: Repository name
            path: File path
            content: File content
            message: Commit message
            branch: Target branch

        Returns:
            Commit information
        """
        try:
            repo = self.get_repo(repo_name)

            # Check if file exists
            try:
                existing = repo.get_contents(path, ref=branch)
                result = repo.update_file(
                    path=path,
                    message=message,
                    content=content,
                    sha=existing.sha,
                    branch=branch,
                )
            except GithubException:
                result = repo.create_file(
                    path=path,
                    message=message,
                    content=content,
                    branch=branch,
                )

            logger.info("file_created", repo=repo_name, path=path)

            return {
                "path": path,
                "sha": result["commit"].sha,
                "branch": branch,
            }

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to create file: {e.data.get('message', str(e))}",
                status_code=e.status,
            )

    def trigger_workflow(
        self,
        repo_name: str,
        workflow_file: str,
        ref: str = "main",
        inputs: dict[str, str] | None = None,
    ) -> bool:
        """
        Trigger a workflow dispatch event.

        Args:
            repo_name: Repository name
            workflow_file: Workflow filename
            ref: Git ref (branch/tag)
            inputs: Workflow inputs

        Returns:
            True if triggered
        """
        try:
            repo = self.get_repo(repo_name)
            workflow = repo.get_workflow(workflow_file)
            workflow.create_dispatch(ref=ref, inputs=inputs or {})

            logger.info(
                "workflow_triggered",
                repo=repo_name,
                workflow=workflow_file,
                ref=ref,
            )
            return True

        except GithubException as e:
            raise GitHubClientError(
                f"Failed to trigger workflow: {e.data.get('message', str(e))}",
                status_code=e.status,
            )
