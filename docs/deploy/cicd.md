# Optional — Step 7: GitHub Actions CI/CD

This step enables automatic deployment:

- Push to GitHub → auto-build Docker image
- Push image to Docker Hub
- SSH into VPS
- Pull + restart containers

---

# 1. Add Required GitHub Secrets

Go to:

**GitHub Repo → Settings → Secrets and variables → Actions → New Repository Secret**

Add the following:

| Secret Name        | Value Example                          |
| ------------------ | -------------------------------------- |
| DOCKERHUB_USERNAME | username                               |
| DOCKERHUB_TOKEN    | Docker Hub Token (PAT)                 |
| VPS_HOST           | Your VPS IP                            |
| VPS_USER           | root or non-root user                  |
| VPS_SSH_KEY        | Your `id_rsa` private key              |
| VPS_APP_PATH       | `/apps/yourproject`                    |
| VITE_API_URL       | https://yourdomain.com (frontend only) |
| OTHER_SECRET_KEY   | OTHER_SECRET_VALUE                     |

---

# 2. Create GitHub Actions Folder Structure

Inside your project root, create:

```
.github/
└── workflows/
    ├── backend.yml
    └── frontend.yml
```

Manual creation:

```bash
mkdir -p .github/workflows
nano .github/workflows/backend.yml
nano .github/workflows/frontend.yml
```

Correct folder structure:

```
root-folder/
├── backend/
├── frontend/
└── .github/
    └── workflows/
        ├── backend.yml
        └── frontend.yml
```

---

# 3. Backend CI/CD Workflow

Open:

```
.github/workflows/backend.yml
```

Add:

```yaml
name: "🚀 Deploy Backend"

on:
  push:
    branches:
      - main
    paths:
      - "backend/**"
      - ".github/workflows/backend.yml"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # Login to Docker Hub
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # Build and Push Image
      - name: Build & Push Backend Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/<backend-image>:latest ./backend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/<backend-image>:latest

      # SSH → VPS → pull + restart backend
      - name: SSH to VPS and redeploy backend
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ${{ secrets.VPS_APP_PATH }}
            docker compose pull backend
            docker compose up -d backend
            docker image prune -f
```

---

# 4. Frontend CI/CD Workflow

Open:

```
.github/workflows/frontend.yml
```

Add:

```yaml
name: "🚀 Deploy Frontend"

on:
  push:
    branches:
      - main
    paths:
      - "frontend/**"
      - ".github/workflows/frontend.yml"

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # Checkout code
      - name: Checkout code
        uses: actions/checkout@v3

      # Generate .env.production before building
      - name: Create .env.production
        run: |
          echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" > ./frontend/.env.production

      # Login to Docker Hub
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      # Build & Push Image
      - name: Build & Push Frontend Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/<frontend-image>:latest ./frontend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/<frontend-image>:latest

      # Deploy container on VPS
      - name: SSH to VPS and redeploy frontend
        uses: appleboy/ssh-action@v0.1.7
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ${{ secrets.VPS_APP_PATH }}
            docker compose pull frontend
            docker compose up -d frontend
            docker image prune -f
```

---

# 5. Scripts (Optional)

```json
{
  "scripts": {
    "docker:build": "docker build --no-cache -t image_name .",
    "docker:tag": "docker tag image_name username/image_name:latest",
    "docker:up": "docker compose up --build -d",
    "docker:down": "docker compose down",
    "docker:restart": "npm run docker:down && npm run docker:up",
    "docker:logs": "docker compose logs -f backend",
    "docker:push": "npm run docker:build && npm run docker:tag && docker push username/image_name:latest"
  }
}
```

---

# 6. Summary of the CI/CD Pipeline

Once set up:

✔ Push to GitHub  
✔ GitHub Actions builds Docker images  
✔ Images pushed to Docker Hub  
✔ GitHub connects to VPS via SSH  
✔ VPS pulls latest images  
✔ Containers restart automatically  
✔ Deployment complete 🚀

---

# 🎉 Your CI/CD is Now Fully Operational!

Every push to **main**:

- Automatically rebuilds backend
- Automatically rebuilds frontend
- Pushes both to Docker Hub
- Updates your VPS automatically
- No manual deployments needed ever again

You're now running **full DevOps automation** for your MERN app.  
Amazing work! 🚀🔥
