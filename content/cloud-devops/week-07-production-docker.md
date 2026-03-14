# Week 7 — Production Docker

## Objective

Learn how to build **production-ready Docker containers** used in real infrastructure.

Students will learn:

• optimized Docker images  
• multi-stage builds  
• security practices  
• container registries  

---

# Why Production Docker is Different

Development containers are often large and inefficient.

Production containers must be:

• small  
• secure  
• reproducible  
• fast to deploy  

---

# Multi-Stage Builds

Multi-stage builds reduce image size.

Example:

```dockerfile
# build stage
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app .

CMD ["node", "index.js"]
```

Benefits:

• smaller images
• faster deployments
• cleaner containers

---

# Docker Image Optimization

Best practices:

• use alpine images
• avoid unnecessary packages
• minimize layers
• use `.dockerignore`

Example `.dockerignore`:

```
node_modules
.git
.env
logs
```

---

# Container Security

Security practices include:

• minimal base images
• non-root user
• vulnerability scanning

Example:

```dockerfile
USER node
```

---

# Container Registry

Containers are stored in registries.

Examples:

• Docker Hub
• GitHub Container Registry
• AWS ECR

Push image example:

```bash
docker tag app myrepo/app:1.0
docker push myrepo/app:1.0
```

---

# Versioning Images

Use semantic versioning.

Example:

```
myapp:1.0
myapp:1.1
myapp:2.0
```

Never rely only on `latest`.

---

# Practice Exercises

## Exercise 1

Convert development Dockerfile to **production optimized Dockerfile**.

---

## Exercise 2

Push container image to registry.

---

## Exercise 3

Scan image vulnerabilities.

Example tool:

```
docker scan
```

---

# Mini Project

Build **production Docker image for Node API**.

Requirements:

• multi-stage build
• optimized image
• pushed to registry

---

# Weekly Outcome

Students can now build **production-grade containers**.
