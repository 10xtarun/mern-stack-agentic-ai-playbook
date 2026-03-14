# Week 9 — CI/CD for Cloud Deployment

## Objective

Automate full **deployment pipeline** from GitHub to AWS.

Students will learn:

• build automation  
• deployment pipelines  
• rollback strategies  

---

# CI/CD Architecture

Typical pipeline:

```

Developer Push
↓
GitHub Actions
↓
Build Docker Image
↓
Push to Registry
↓
Deploy to ECS

```

---

# Example Workflow

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Image
        run: docker build -t app .

      - name: Push Image
        run: docker push myrepo/app

      - name: Deploy
        run: aws ecs update-service
```

---

# Deployment Strategies

## Rolling Deployment

Gradually replaces containers.

---

## Blue-Green Deployment

Two environments:

```
Blue → current
Green → new
```

Traffic switches once new version passes tests.

---

# Rollback

If deployment fails:

```
Revert to previous image version
```

Example:

```
app:1.2 → rollback → app:1.1
```

---

# Practice Exercises

## Exercise 1

Create GitHub Action for Docker build.

---

## Exercise 2

Add step to push image to registry.

---

## Exercise 3

Add step to deploy container.

---

# Mini Project

Create full **CI/CD pipeline for ECS deployment**.

---

# Weekly Outcome

Students can now **automate production deployments**.
