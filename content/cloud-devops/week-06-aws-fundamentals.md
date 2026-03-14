# Week 6 — AWS Fundamentals

## Objective

Introduce cloud infrastructure using **Amazon Web Services**.

Students will learn:

• cloud computing fundamentals  
• AWS services  
• server deployment  

---

# What is Cloud Computing?

Cloud computing provides:

• servers  
• storage  
• networking  
• computing power  

without managing physical hardware.

Benefits:

• scalability  
• reliability  
• global access  

---

# AWS Global Infrastructure

AWS infrastructure includes:

```

Regions
↓
Availability Zones
↓
Data Centers

```

Example region:

```

ap-south-1 (Mumbai)

```

---

# Identity & Access Management (IAM)

IAM manages permissions.

Key concepts:

• users  
• roles  
• policies  

Best practice:

```

Never use root account

```

Create IAM user for daily work.

---

# EC2 — Virtual Servers

EC2 allows launching virtual machines.

Example use cases:

• host backend servers  
• run containers  
• run batch jobs  

Launch steps:

1. Choose AMI  
2. Choose instance type  
3. Configure security group  
4. Launch instance  

---

# SSH Connection

Connect to EC2 instance:

```bash
ssh -i key.pem ubuntu@ip-address
```

---

# S3 — Object Storage

Amazon S3 stores files such as:

• images
• backups
• logs

Create bucket:

```
my-devops-assets
```

Upload file:

```bash
aws s3 cp image.png s3://my-devops-assets
```

---

# Security Groups

Security groups act as firewalls.

Example rules:

| Port | Purpose |
| ---- | ------- |
| 22   | SSH     |
| 80   | HTTP    |
| 443  | HTTPS   |

---

# RDS — Managed Databases

RDS provides managed databases:

• PostgreSQL
• MySQL
• MariaDB

Benefits:

• automated backups
• scaling
• patching

---

# CloudWatch

CloudWatch monitors:

• server metrics
• logs
• alarms

Example metrics:

• CPU usage
• memory usage
• network traffic

---

# Practice Exercises

## Exercise 1

Create AWS account and IAM user.

---

## Exercise 2

Launch EC2 instance.

Install Node.js.

Deploy simple API.

---

## Exercise 3

Create S3 bucket and upload file.

---

## Exercise 4

Configure security group for web server.

---

# Mini Project

Deploy Node.js app on EC2.

Requirements:

• SSH access
• running API
• public access

---

# Deliverables

Students must submit:

• EC2 instance URL
• deployed API

---

# Weekly Outcome

Students can now:

• deploy applications on cloud
• manage servers
• use AWS infrastructure
