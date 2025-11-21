# Step 5 — Cloudflare DNS

## Log in to Cloudflare

1. Go to **https://dash.cloudflare.com**
2. Log in to your Cloudflare account

## Select Your Domain

1. From the dashboard, click the domain you want to configure  
   _(Example: `yourdomain.com`)_

## Navigate to DNS Settings

1. In the left sidebar, click **DNS**
2. Go to **DNS Records**

## Create DNS Records

Add an **A Record**:

| Type | Name | IPv4 address | Proxy   | TTL  |
| ---- | ---- | ------------ | ------- | ---- |
| A    | @    | VPS IP       | Proxied | Auto |

If you are using a **subdomain** for your API (recommended):

| Type | Name | IPv4 address | Proxy   | TTL  |
| ---- | ---- | ------------ | ------- | ---- |
| A    | api  | VPS IP       | Proxied | Auto |

> 💡 **Proxied (orange cloud)** protects your server and enables Cloudflare SSL.

---

## Enable Required Cloudflare Settings

### SSL/TLS Settings

1. Go to **SSL/TLS**
2. Set **SSL Mode** → **Full (Strict)**

### Additional Settings

- **Always Use HTTPS** → **ON**
- **Automatic HTTPS Rewrites** → **ON**

## Generate SSL Certificate

Cloudflare _can_ handle SSL termination, but Nginx still needs **valid certificate files** locally to serve HTTPS.

## Use Cloudflare Origin Certificates

1. Go to **SSL/TLS → Origin Server**
2. Click **Create Certificate**
3. Settings:
   - **Key Format:** PEM
   - **Validity:** 15 years
4. Cloudflare gives you **two files**.

**Note:** Save these files because you will need to create it on Nginx SSL later.

#### `yourdomain.pem`

```
-----BEGIN CERTIFICATE-----
(Cloudflare Certificate)
-----END CERTIFICATE-----
```

#### `yourdomain.key`

```
-----BEGIN PRIVATE KEY-----
(Cloudflare Private Key)
-----END PRIVATE KEY-----
```
