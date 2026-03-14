# Week 1 — Git & GitHub Essentials

## Objective

Learn **version control and collaboration workflows** used in real engineering teams.

By the end of this week students will understand:

• Git workflow  
• Repository management  
• Branching strategies  
• Code collaboration  

---

# Topics Covered

## Introduction to Version Control

Why version control matters:

- Track code history
- Collaborate safely
- Prevent code loss
- Maintain code quality

---

## Git Fundamentals

Core commands:

```bash
git init
git add
git commit
git push
git pull
git clone
```

Students learn:

• repository lifecycle
• staging area
• commits

---

## Branching Strategy

Branches allow safe experimentation.

Example workflow:

```
main
 ├── feature-login
 ├── feature-api
 └── bugfix-auth
```

Commands:

```bash
git branch
git checkout
git merge
```

---

## Merge Conflicts

Students will intentionally create merge conflicts and resolve them.

Example conflict:

```
<<<<<<< HEAD
console.log("Version A")
=======
console.log("Version B")
>>>>>>> feature
```

---

## GitHub Platform

GitHub provides:

• collaboration
• pull requests
• code reviews
• issue tracking

---

# Practice Exercises

### Exercise 1 — Git Setup

Install Git and configure identity.

```
git config --global user.name
git config --global user.email
```

---

### Exercise 2 — Create Repository

Students create a **DevOps portfolio repository**.

Structure:

```
devops-portfolio
│
├── projects
├── notes
└── experiments
```

---

### Exercise 3 — Branch Workflow

Students must:

1. Create feature branch
2. Add feature
3. Push branch
4. Create pull request
5. Merge PR

---

### Exercise 4 — Resolve Merge Conflict

Two branches modify same file.

Students must fix conflict manually.

---

# Mini Project

Create **personal developer portfolio repository**.

Requirements:

• README documentation
• Git history
• Branch workflow

---

# Deliverable

GitHub repository with:

* README
* commit history
* branches
* pull request

---

# Weekly Outcome

Students can now:

• manage repositories
• collaborate using GitHub
• handle merge conflicts
