# Step 3 — Prepare VPS

## Install Docker

```bash
apt update
apt install -y ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | gpg --dearmor -o /usr/share/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-compose-plugin
```

## Project Directory

```bash
mkdir -p /apps/yourproject
cd /apps/yourproject
```

## Backend ENV File

Create & open **backend.env** file

```bash
nano backend.env
```

Paste **backend.env** data

```env
NODE_ENV=production
PORT=port
MONGODB_URI=your-mongo-uri
JWT_SECRET=your-secret
ALLOWED_ORIGINS=https://yourdomain.com
```
