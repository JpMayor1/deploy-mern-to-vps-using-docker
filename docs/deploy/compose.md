# Step 4 — Docker Compose Setup

## Create `docker-compose.yml`

```bash
nano docker-compose.yml
```

Paste **docker-compose.yml** data

```yaml
services:
  backend:
    image: <username>/<backend-image>:latest
    env_file: ./backend.env
    ports:
      - "<backend_port>:<backend_port>"
    restart: unless-stopped
    networks:
      - mern-net

  frontend:
    image: <username>/<frontend-image>:latest
    ports:
      - "<frontend_port>:<frontend_port>"
    restart: unless-stopped
    networks:
      - mern-net

networks:
  mern-net:
    driver: bridge
```

## Start Containers

```bash
docker compose pull
docker compose up -d
```
