# Step 7 — CI/CD (GitHub Actions)

## Frontend Deployment

Before building the Docker image, create `.env.production` inside the workflow:

```yaml
- name: Create .env.production
  run: |
    echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" > ./frontend/.env.production
```

## Full Workflow Includes

- Build Docker image
- Push image to Docker Hub
- SSH into VPS
- Pull the updated image
- Restart the container
