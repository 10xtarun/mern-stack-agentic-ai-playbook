# Week 5 — Docker Compose

## Objective

Learn how to run **multi-container applications**.

Real applications require multiple services such as:

• backend  
• database  
• cache  

Docker Compose allows managing these easily.

---

# What is Docker Compose?

Docker Compose defines services using a YAML configuration.

Example architecture:

```

Frontend
↓
Backend
↓
Database

```

All services run together.

---

# docker-compose.yml Structure

Example:

```yaml
version: "3"

services:
  app:
    build: .
    ports:
      - "3000:3000"

  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

---

# Running Compose

Start services:

```bash
docker-compose up
```

Run in background:

```bash
docker-compose up -d
```

Stop services:

```bash
docker-compose down
```

---

# Service Networking

Docker Compose automatically creates a network.

Example connection:

```
Node App → MongoDB
```

Connection string:

```
mongodb://mongo:27017/mydb
```

Where `mongo` is service name.

---

# Environment Variables

Environment configuration:

```yaml
environment:
  DATABASE_URL: mongodb://mongo:27017
```

Use `.env` files for secrets.

---

# Volumes in Compose

Persist database data:

```yaml
volumes:
  - db-data:/data/db
```

Define volume:

```yaml
volumes:
  db-data:
```

---

# Health Checks

Ensure service is ready.

Example:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
```

---

# Scaling Services

Example:

```bash
docker-compose up --scale app=3
```

Run multiple containers.

---

# Practice Exercises

## Exercise 1

Run:

```
Node.js + MongoDB
```

using docker-compose.

---

## Exercise 2

Add volume persistence for MongoDB.

---

## Exercise 3

Add environment variables.

---

# Mini Project

Deploy full **MERN backend stack** locally.

Services:

```
node-api
mongo-db
redis-cache
```

---

# Deliverables

Students must submit:

• docker-compose.yml
• running multi-container app

---

# Weekly Outcome

Students can now:

• run distributed applications locally
• manage multi-container environments
• configure service networking
