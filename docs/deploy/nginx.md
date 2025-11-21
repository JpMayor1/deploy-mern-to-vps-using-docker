# Step 6 — Nginx Reverse Proxy

## Install Nginx

```bash
apt install nginx
```

## Create Nginx SSL

Create folder for ssl:

```bash
mkdir -p /etc/nginx/ssl
```

Create pem file:

```bash
nano /etc/nginx/ssl/yourdomain.pem
```

Paste the pem file you saved earlier:

```
-----BEGIN CERTIFICATE-----
(Cloudflare Certificate)
-----END CERTIFICATE-----
```

Create key file:

```bash
nano /etc/nginx/ssl/yourdomain.key
```

Paste the key file you saved earlier:

```
-----BEGIN PRIVATE KEY-----
(Cloudflare Private Key)
-----END PRIVATE KEY-----
```

Set correct permissions:

```bash
chmod 600 /etc/nginx/ssl/yourdomain.key
chmod 644 /etc/nginx/ssl/yourdomain.pem
```

Your Nginx server now uses this SSL certificate:

```
/etc/nginx/ssl/yourdomain.pem
/etc/nginx/ssl/yourdomain.key
```

## Create Nginx Configuration

Create the file:

```bash
nano /etc/nginx/sites-available/yourproject
```

Add the following:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name yourdomain.com;

    ssl_certificate     /etc/nginx/ssl/yourdomain.pem;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.key;

    # --- Frontend (Vite/Nginx container runs on port <frontend_port>) ---
    location / {
        proxy_pass http://127.0.0.1:<frontend_port>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # --- Backend API (Node container runs on port <backend_port>) ---
    location /api/ {
        proxy_pass http://127.0.0.1:<backend_port>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
```

## Enable the Site

```bash
ln -s /etc/nginx/sites-available/yourproject /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```
