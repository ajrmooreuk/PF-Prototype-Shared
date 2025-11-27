#!/bin/bash
# =============================================================================
# PF-CORE Droplet Bootstrap Script
# =============================================================================
# Run this script on a fresh Digital Ocean Ubuntu 22.04 Droplet
# Usage: curl -sSL https://raw.githubusercontent.com/REPO/main/scripts/bootstrap.sh | bash
# =============================================================================

set -e

echo "=============================================="
echo "  PF-CORE Droplet Bootstrap"
echo "  Target: Ubuntu 22.04 LTS"
echo "=============================================="

# Configuration
DOMAIN="${1:-pf-core.app}"
EMAIL="${2:-admin@pf-core.app}"
APP_DIR="/app"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# =============================================================================
# Step 1: System Updates
# =============================================================================
log_info "Updating system packages..."
apt-get update && apt-get upgrade -y

# =============================================================================
# Step 2: Install Docker
# =============================================================================
log_info "Installing Docker..."
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Enable Docker service
systemctl enable docker
systemctl start docker

log_info "Docker installed: $(docker --version)"

# =============================================================================
# Step 3: Install Nginx
# =============================================================================
log_info "Installing Nginx..."
apt-get install -y nginx

systemctl enable nginx
systemctl start nginx

# =============================================================================
# Step 4: Install Certbot for SSL
# =============================================================================
log_info "Installing Certbot..."
apt-get install -y certbot python3-certbot-nginx

# =============================================================================
# Step 5: Configure Firewall (UFW)
# =============================================================================
log_info "Configuring firewall..."
apt-get install -y ufw

ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

log_info "Firewall configured"

# =============================================================================
# Step 6: Install Fail2ban
# =============================================================================
log_info "Installing Fail2ban..."
apt-get install -y fail2ban

cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
port = http,https
logpath = /var/log/nginx/error.log
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# =============================================================================
# Step 7: Create Application Directory Structure
# =============================================================================
log_info "Setting up application directory..."
mkdir -p ${APP_DIR}/{nginx/conf.d,logs}

# =============================================================================
# Step 8: Create Nginx Configuration
# =============================================================================
log_info "Configuring Nginx..."

cat > ${APP_DIR}/nginx/conf.d/app.conf << EOF
upstream nextjs {
    server localhost:3000;
}

server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    # SSL will be configured by Certbot
    # ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://nextjs;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }

    # Health check endpoint
    location /api/health {
        proxy_pass http://nextjs;
        proxy_set_header Host \$host;
    }

    # Static files caching
    location /_next/static/ {
        proxy_pass http://nextjs;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}
EOF

# Link Nginx config
ln -sf ${APP_DIR}/nginx/conf.d/app.conf /etc/nginx/sites-available/pf-core
ln -sf /etc/nginx/sites-available/pf-core /etc/nginx/sites-enabled/pf-core
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t && systemctl reload nginx

# =============================================================================
# Step 9: Create Docker Compose File
# =============================================================================
log_info "Creating Docker Compose configuration..."

cat > ${APP_DIR}/docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    image: ghcr.io/${GITHUB_REPOSITORY:-pf-core/platform}:${IMAGE_TAG:-latest}
    container_name: pf-core-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file:
      - .env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

networks:
  default:
    name: pf-core-network
EOF

# =============================================================================
# Step 10: Create Environment Template
# =============================================================================
log_info "Creating environment template..."

cat > ${APP_DIR}/.env.template << 'EOF'
# =============================================================================
# PF-CORE Environment Variables
# =============================================================================
# Copy this file to .env and fill in the values
# NEVER commit .env to version control
# =============================================================================

NODE_ENV=production

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# GitHub Container Registry
GITHUB_REPOSITORY=your-org/pf-core
IMAGE_TAG=latest

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
EOF

# =============================================================================
# Step 11: Set Permissions
# =============================================================================
log_info "Setting permissions..."
chown -R root:docker ${APP_DIR}
chmod -R 755 ${APP_DIR}

# =============================================================================
# Step 12: Create Helper Scripts
# =============================================================================
log_info "Creating helper scripts..."

# Deployment script
cat > ${APP_DIR}/deploy.sh << 'EOF'
#!/bin/bash
set -e
cd /app
echo "Pulling latest image..."
docker compose pull
echo "Starting services..."
docker compose up -d
echo "Cleaning up old images..."
docker image prune -f
echo "Deployment complete!"
docker compose ps
EOF
chmod +x ${APP_DIR}/deploy.sh

# Logs script
cat > ${APP_DIR}/logs.sh << 'EOF'
#!/bin/bash
docker compose logs -f --tail=100 ${1:-app}
EOF
chmod +x ${APP_DIR}/logs.sh

# Status script
cat > ${APP_DIR}/status.sh << 'EOF'
#!/bin/bash
echo "=== Docker Status ==="
docker compose ps
echo ""
echo "=== Resource Usage ==="
docker stats --no-stream
echo ""
echo "=== Disk Usage ==="
df -h /
EOF
chmod +x ${APP_DIR}/status.sh

# =============================================================================
# Step 13: Final Instructions
# =============================================================================
echo ""
echo "=============================================="
echo -e "${GREEN}  Bootstrap Complete!${NC}"
echo "=============================================="
echo ""
echo "Next steps:"
echo "1. Copy .env.template to .env and configure:"
echo "   cp ${APP_DIR}/.env.template ${APP_DIR}/.env"
echo "   nano ${APP_DIR}/.env"
echo ""
echo "2. Configure SSL certificate:"
echo "   certbot --nginx -d ${DOMAIN} --email ${EMAIL} --agree-tos --non-interactive"
echo ""
echo "3. Login to GitHub Container Registry:"
echo "   echo \$GHCR_TOKEN | docker login ghcr.io -u USERNAME --password-stdin"
echo ""
echo "4. Deploy the application:"
echo "   cd ${APP_DIR} && ./deploy.sh"
echo ""
echo "Useful commands:"
echo "  ${APP_DIR}/deploy.sh  - Pull and deploy latest"
echo "  ${APP_DIR}/logs.sh    - View application logs"
echo "  ${APP_DIR}/status.sh  - Check system status"
echo ""
echo "=============================================="
