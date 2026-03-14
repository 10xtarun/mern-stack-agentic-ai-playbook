# Week 8 — AWS Container Deployment

## Objective

Deploy Docker containers to **AWS infrastructure**.

Students will learn:

• container orchestration  
• load balancing  
• scalable deployments  

---

# AWS Container Services

AWS provides multiple container services:

| Service | Use |
|------|------|
| ECS | managed container orchestration |
| EKS | Kubernetes |
| Fargate | serverless containers |

For this course we use **ECS**.

---

# Amazon ECS

ECS manages container deployments.

Architecture:

```

Docker Image
↓
ECR Registry
↓
ECS Task
↓
ECS Service
↓
Load Balancer

```

---

# ECS Task Definition

Defines container configuration.

Example:

• CPU  
• memory  
• container image  
• ports  

---

# ECS Service

Service ensures containers remain running.

Features:

• auto restart  
• scaling  
• load balancing  

---

# Load Balancer

Load balancers distribute traffic.

Types:

• Application Load Balancer (ALB)  
• Network Load Balancer (NLB)

Architecture example:

```

Internet
↓
Load Balancer
↓
ECS Service
↓
Containers

```

---

# Auto Scaling

Auto scaling adjusts container count based on traffic.

Example policy:

```

CPU > 70% → add container
CPU < 30% → remove container

```

---

# Practice Exercises

## Exercise 1

Create ECR repository.

Push container image.

---

## Exercise 2

Create ECS task definition.

---

## Exercise 3

Deploy ECS service.

---

# Mini Project

Deploy Dockerized Node.js API to ECS.

Requirements:

• ECR image  
• ECS service  
• public endpoint  

---

# Weekly Outcome

Students can now deploy **containers to cloud infrastructure**.
