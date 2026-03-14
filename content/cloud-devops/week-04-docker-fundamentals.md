# Week 4 — Docker Fundamentals

## Objective

Learn how to package applications using **containers** so they run consistently across environments.

By the end of this week students will:

• Understand containerization  
• Build Docker images  
• Run containers locally  
• Push images to container registries  

---

# What is Containerization?

Containerization packages:

- application code
- runtime
- dependencies
- system libraries

into a **portable environment**.

This ensures:

• consistent development  
• easier deployment  
• environment isolation  

---

# Virtual Machines vs Containers

| Feature | Virtual Machine | Container |
|------|------|------|
| Size | GBs | MBs |
| Boot Time | Minutes | Seconds |
| OS | Full OS | Shared Kernel |
| Performance | Lower | Higher |

Containers are **lightweight and efficient**.

---

# Docker Architecture

Docker consists of:

```

Docker Client
↓
Docker Daemon
↓
Images → Containers

```

Key components:

• Docker Engine  
• Docker Images  
• Docker Containers  
• Docker Registry  

---

# Installing Docker

Verify installation:

```bash
docker --version
```

Start Docker service:

```bash
sudo systemctl start docker
```

---

# Docker Images

Images are **blueprints** for containers.

Example:

```bash
docker pull node
```

List images:

```bash
docker images
```

---

# Docker Containers

Containers are running instances of images.

Example:

```bash
docker run node
```

Run container interactively:

```bash
docker run -it node bash
```

---

# Dockerfile

Dockerfile defines how images are built.

Example:

```dockerfile
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]
```

---

# Build Docker Image

```bash
docker build -t my-app .
```

---

# Run Docker Container

```bash
docker run -p 3000:3000 my-app
```

This maps:

```
localhost:3000 → container:3000
```

---

# Docker Layers

Each Dockerfile instruction creates a **layer**.

Benefits:

• caching
• faster builds
• efficient storage

---

# Docker Volumes

Volumes allow persistent data.

Example:

```bash
docker run -v data:/app/data my-app
```

Use cases:

• databases
• logs
• uploads

---

# Docker Networking

Containers communicate through networks.

Example:

```bash
docker network create my-network
```

---

# Practice Exercises

## Exercise 1

Run nginx container:

```bash
docker run -p 8080:80 nginx
```

Visit:

```
http://localhost:8080
```

---

## Exercise 2

Create Dockerfile for Node.js app.

Requirements:

• install dependencies
• start server

---

## Exercise 3

Push Docker image to registry.

Example:

```bash
docker tag my-app username/my-app
docker push username/my-app
```

---

# Mini Project

Containerize a **Node.js REST API**.

Requirements:

• Dockerfile
• working container
• accessible API

---

# Deliverables

Students must submit:

• Dockerfile
• running container
• pushed image to registry

---

# Weekly Outcome

Students can now:

• build Docker images
• run containers
• containerize applications
