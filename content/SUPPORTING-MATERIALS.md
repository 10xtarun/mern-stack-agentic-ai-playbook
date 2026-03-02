# Supporting Materials & Best Practices

## 📝 Daily Internship Diary (CRITICAL!)

**Every day, complete an internship diary entry** at 5:00 PM before leaving.

This is your portfolio evidence of what you learned and built.

→ **See**: [DAILY-INTERNSHIP-DIARY-GUIDE.md](./DAILY-INTERNSHIP-DIARY-GUIDE.md)

### Quick Daily Checklist (5:00 PM)
- [ ] All code committed & pushed
- [ ] Pull request created/updated
- [ ] **Internship diary entry completed** ⭐
- [ ] Hours logged accurately
- [ ] Blockers documented
- [ ] Links to code/demos added

### Why Diary Matters
- ✅ Proves work completion
- ✅ Shows learning progression
- ✅ Portfolio evidence for interviews
- ✅ Supervisor evaluation
- ✅ Reference letters
- ✅ Track achievements

---

## 📁 Git Workflow & Commits

### Daily Workflow [^1]

```bash
# Start of day: update from main
git checkout main && git pull origin main

# Create feature branch
git checkout -b feature/add-authentication

# Regular commits (multiple times per day)
git add src/components/LoginForm.tsx
git commit -m "feat(auth): create login form with validation"

# Push regularly
git push origin feature/add-authentication

# Create Pull Request → Code Review → Merge
```

### Commit Message Format [^2]

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope: component or module name
Description: what changed (imperative mood)

Examples:
✅ feat(auth): implement JWT authentication
✅ fix(dashboard): resolve layout issue on mobile
✅ docs(readme): add setup instructions
✅ refactor(api): extract validation logic to service
```

### Code Review Checklist [^3]

Reviewer should verify:
- [ ] Code follows TypeScript best practices
- [ ] All error cases handled
- [ ] Tests included (if applicable)
- [ ] No console.log statements left
- [ ] No hardcoded values
- [ ] Follows project conventions
- [ ] Performance considerations
- [ ] Security concerns addressed

---

## 🔒 TypeScript Best Practices

### Type Safety Patterns

```typescript
// ❌ Avoid any type
let data: any;

// ✅ Use specific types
let data: User[];
let count: number;

// ❌ Loose equality
if (value == null) { }

// ✅ Strict equality
if (value === null || value === undefined) { }

// ❌ Throwing strings
throw "Error occurred";

// ✅ Throw Error objects
throw new Error("Validation failed: email is required");

// ✅ Use type guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// ✅ Use exhaustiveness checking
type Status = 'active' | 'inactive' | 'pending';

function handleStatus(status: Status): string {
  switch (status) {
    case 'active':
      return 'User is active';
    case 'inactive':
      return 'User is inactive';
    case 'pending':
      return 'User pending approval';
    // TypeScript error if case missing!
  }
}
```

---

## 🏗️ NestJS Architecture Patterns

### Module Organization [^4]

```
src/
├── app.module.ts
├── main.ts
└── modules/
    ├── users/
    │   ├── users.module.ts
    │   ├── users.controller.ts
    │   ├── users.service.ts
    │   ├── schemas/
    │   │   └── user.schema.ts
    │   ├── dto/
    │   │   ├── create-user.dto.ts
    │   │   └── update-user.dto.ts
    │   └── decorators/
    │       └── current-user.decorator.ts
    │
    ├── auth/
    │   ├── auth.module.ts
    │   ├── auth.controller.ts
    │   ├── auth.service.ts
    │   └── strategies/
    │       └── jwt.strategy.ts
    │
    └── common/
        ├── filters/
        ├── guards/
        ├── middleware/
        └── decorators/
```

### DTOs (Data Transfer Objects) [^5]

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

// Usage in controller
@Post()
async create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
// NestJS automatically validates!
```

### Custom Decorators [^6]

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

// Usage
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: User) {
  return user;
}
```

---

## ⚡ Next.js Advanced Patterns

### Server vs Client Components [^7]

```typescript
// Server Component (default) - runs on server, no interactivity
export default async function UserList() {
  const users = await fetch('/api/users').then(r => r.json());
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Client Component - adds interactivity
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}

// Best practice: Server for data, Client for interaction
export default async function Page() {
  const data = await fetchData();
  return (
    <>
      <ServerComponent data={data} />
      <ClientComponent />
    </>
  );
}
```

### Middleware for Authentication [^8]

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

---

## 🔄 API Response Format [^9]

### Standard Response Structure

```typescript
// Success Response
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation completed successfully",
  "statusCode": 200
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is already in use",
    "details": {
      "email": "Email must be unique"
    }
  },
  "statusCode": 400
}

// Paginated Response
{
  "success": true,
  "data": [ /* items */ ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  },
  "statusCode": 200
}
```

---

## 🧪 Testing Strategy [^10]

### Unit Tests Example

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create user', async () => {
    const user = await service.create({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  it('should throw on duplicate email', async () => {
    await expect(
      service.create({ email: 'existing@example.com', password: 'pass' })
    ).rejects.toThrow('Email already exists');
  });
});
```

---

## 📋 Environment Variables Template

```bash
# .env.local (Frontend - Next.js)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

```bash
# .env (Backend - NestJS)
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
```

---

## 🚀 Deployment Checklist

- [ ] All environment variables configured
- [ ] Database backups in place
- [ ] Error monitoring setup (Sentry)
- [ ] Logging configured
- [ ] CORS settings finalized
- [ ] Rate limiting implemented
- [ ] API documentation complete
- [ ] Security headers configured
- [ ] Load testing completed
- [ ] Rollback strategy documented

---

## 📚 Additional Resources

### Official Documentation
- [React Docs](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org)
- [egghead.io](https://egghead.io) - Short focused lessons
- [Frontend Masters](https://frontendmasters.com) - In-depth courses

### Tools
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database
- [GitHub](https://github.com) - Code hosting

---

## 📞 Getting Help

1. **Search documentation first** - 90% of questions are answered there
2. **Check existing GitHub issues** - Others might have faced same problem
3. **Google error messages** - Usually leads to solutions
4. **Ask on community forums** - Stack Overflow, Reddit r/learnprogramming
5. **During live sessions** - Ask instructor directly

---

## 📚 Citations

[^1]: Git Documentation - https://git-scm.com/docs
[^2]: Conventional Commits - https://www.conventionalcommits.org
[^3]: Code Review Best Practices - https://google.github.io/eng-practices/review/
[^4]: NestJS Modules - https://docs.nestjs.com/modules
[^5]: Class Validator - https://github.com/typestack/class-validator
[^6]: Custom Decorators - https://docs.nestjs.com/custom-decorators
[^7]: Server & Client Components - https://nextjs.org/docs/app/building-your-application/rendering
[^8]: Next.js Middleware - https://nextjs.org/docs/app/building-your-application/routing/middleware
[^9]: RESTful API Design - https://restfulapi.net
[^10]: Testing - https://docs.nestjs.com/fundamentals/testing
