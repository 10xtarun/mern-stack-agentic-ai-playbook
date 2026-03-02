# Setup Guide & Project Structure

## 🚀 Getting Started

### Prerequisites

Install these tools before starting:

1. **Node.js & npm** [^1]
   - Download: https://nodejs.org/
   - Verify: `node --version` (should be v18+)

2. **Git** [^2]
   - Download: https://git-scm.com/
   - Verify: `git --version`

3. **VS Code** (Recommended editor)
   - Download: https://code.visualstudio.com/
   - Extensions: ESLint, Prettier, Thunder Client

4. **MongoDB Atlas** (Cloud database) [^3]
   - Sign up: https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string

5. **GitHub Account**
   - Sign up: https://github.com
   - Create organization for your team

---

## 📁 Frontend Project Setup (Week 5-6+)

### Create Next.js Project

```bash
# Create new Next.js app with TypeScript
npx create-next-app@latest portfolio --typescript --app

# Navigate to project
cd portfolio

# Install additional dependencies
npm install next-auth axios zustand

# Start development server
npm run dev

# Open http://localhost:3000
```

### Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/page.tsx
│   └── api/auth/[...nextauth]/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProjectCard.tsx
├── lib/
│   ├── api.ts                  # API calls
│   └── auth.ts                 # Auth config
├── styles/
│   └── globals.css
├── public/
│   ├── images/
│   └── favicon.ico
├── .env.local                  # Environment variables
├── tsconfig.json
├── package.json
└── README.md
```

### .env.local Template

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
```

---

## 📁 Backend Project Setup (Week 7-8+)

### Create NestJS Project

```bash
# Install NestJS CLI
npm install -g @nestjs/cli

# Create new project
nest new backend --package-manager npm

# Navigate to project
cd backend

# Install database dependencies
npm install @nestjs/mongoose mongoose bcrypt @nestjs/jwt @nestjs/passport passport-jwt class-validator class-transformer

# Start development server
npm run start:dev

# API will run on http://localhost:3001
```

### Project Structure

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   └── strategies/
│   │   │       └── jwt.strategy.ts
│   │   │
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── schemas/
│   │   │   │   └── user.schema.ts
│   │   │   └── dto/
│   │   │       └── create-user.dto.ts
│   │   │
│   │   └── [other-modules]/
│   │
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   └── decorators/
│   │       └── current-user.decorator.ts
│   │
│   ├── app.module.ts
│   └── main.ts
├── .env                        # Environment variables
├── tsconfig.json
├── package.json
└── README.md
```

### .env Template

```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

---

## 🔐 MongoDB Setup

### Atlas Setup Steps

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Create new project
4. Create a cluster (free tier available)
5. Add user credentials
6. Get connection string
7. Replace in .env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### Mongoose Connection

```typescript
// app.module.ts
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ]
})
export class AppModule {}
```

---

## 🔄 Team Collaboration Setup

### Repository Structure

```
your-organization/
├── frontend-repo/          # Next.js project
│   └── branch: main, develop, feature/*
├── backend-repo/           # NestJS project
│   └── branch: main, develop, feature/*
├── documentation/          # API docs, design docs
└── README.md               # Team overview
```

### GitHub Workflow

```bash
# Clone repository
git clone https://github.com/org/project-name.git
cd project-name

# Create feature branch
git checkout -b feature/add-login

# Make changes and commit
git add .
git commit -m "feat(auth): add login functionality"

# Push to GitHub
git push origin feature/add-login

# Create Pull Request on GitHub UI
# - Add description
# - Request review
# - Team reviews code
# - Merge after approval

# Update local main
git checkout main
git pull origin main
```

### Branch Naming Convention

```
feature/add-authentication      # New feature
feature/improve-performance     # Enhancement
fix/incorrect-validation        # Bug fix
docs/api-documentation          # Documentation
refactor/simplify-service       # Code cleanup
```

---

## 📋 Daily Development Checklist

### Morning
- [ ] `git pull origin main` - Get latest changes
- [ ] Check team messages / Slack
- [ ] Review code assigned for review
- [ ] Create feature branch for today's work

### During Day
- [ ] Commit changes regularly (2-3 times per day minimum)
- [ ] Write meaningful commit messages
- [ ] Test functionality locally
- [ ] No console.log left in code

### Before Pushing
- [ ] All tests passing (if applicable)
- [ ] No TypeScript errors
- [ ] Code follows style guide
- [ ] Documentation updated if needed

### End of Day
- [ ] Push code to feature branch
- [ ] Create/update Pull Request
- [ ] Summarize today's work
- [ ] Plan next day

---

## 🧪 Running Tests

### Frontend (Next.js)

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test

# Run with coverage
npm run test -- --coverage
```

### Backend (NestJS)

```bash
# NestJS comes with Jest
# Run unit tests
npm run test

# Run with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

---

## 📱 API Testing with Postman [^4]

### Create Postman Collections

1. Download Postman: https://www.postman.com/downloads/
2. Create new collection for your API
3. Add requests for each endpoint
4. Organize in folders

### Example Requests

```
GET http://localhost:3001/api/users
Authorization: Bearer <token>
```

```
POST http://localhost:3001/api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 🐛 Debugging Tips

### Backend Debugging

```bash
# Run with debugging enabled
node --inspect=9229 dist/main.js

# Open Chrome DevTools
chrome://inspect
```

### Frontend Debugging

- Open Chrome DevTools (F12)
- Console tab for errors
- Network tab for API calls
- Application tab for local storage/cookies

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach",
      "port": 9229
    }
  ]
}
```

---

## 📚 Citations

[^1]: Node.js Download - https://nodejs.org/
[^2]: Git Download - https://git-scm.com/
[^3]: MongoDB Atlas - https://www.mongodb.com/cloud/atlas
[^4]: Postman API Platform - https://www.postman.com/

---

## 🆘 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
# macOS/Linux
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**MongoDB connection fails**
- Check IP whitelist in Atlas
- Verify username/password
- Check internet connection
- Ensure `.env` has correct URI

**Node modules issues**
```bash
# Clear node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**TypeScript errors**
```bash
# Check types
npx tsc --noEmit

# Rebuild
npm run build
```

---

## 🎯 Success Tips

1. **Commit often** - Multiple small commits > Few large commits
2. **Test locally first** - Before pushing to GitHub
3. **Read error messages** - They tell you exactly what's wrong
4. **Ask in team chat** - Don't struggle alone
5. **Review others' code** - Learn from teammates
6. **Document as you go** - Don't leave it for the end
