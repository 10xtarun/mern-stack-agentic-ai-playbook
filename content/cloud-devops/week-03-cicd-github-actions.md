# Week 3 — CI/CD & GitHub Actions

## Objective

Students learn **Continuous Integration and Continuous Deployment**.

This week introduces automation pipelines.

---

# What is CI/CD?

CI/CD automates software delivery.

### Continuous Integration

Automatically:

• build code  
• run tests  
• validate changes  

### Continuous Deployment

Automatically:

• deploy application  
• update servers  
• release software  

---

# GitHub Actions

GitHub Actions allows building pipelines directly inside GitHub.

Components:

```

Workflow
Job
Step
Action

```

---

# Example Workflow

```

.github/workflows/ci.yml

```

Example:

```yaml
name: Node CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
```

---

# Event Driven Automation

Events trigger workflows.

Examples:

```
push
pull_request
schedule
release
```

---

# Secrets & Environment Variables

Sensitive data must be protected.

Example:

```
DATABASE_URL
API_KEY
```

Stored securely in GitHub secrets.

---

# Artifacts

Artifacts allow storing build outputs.

Examples:

• build files
• test reports
• logs

---

# Practice Exercises

### Exercise 1

Create CI pipeline for Node.js project.

Pipeline must:

• install dependencies
• run tests

---

### Exercise 2

Create workflow for pull requests.

Pipeline must run before merge.

---

### Exercise 3

Add scheduled job.

Example:

```
daily build check
```

---

# Mini Project

Build **complete CI pipeline** for application.

Features:

• build
• test
• artifact storage

---

# Deliverable

Working GitHub Actions pipeline.
