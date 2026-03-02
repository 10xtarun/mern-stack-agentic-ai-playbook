# Weeks 5-6: React Fundamentals & Next.js

## Week 5: React Fundamentals

### Day 1-2: Components & JSX

```typescript
// Functional Component
interface GreetProps {
  name: string;
  age?: number;
}

const Greet: React.FC<GreetProps> = ({ name, age }) => {
  return <div>Hello, {name}! {age && `You are ${age} years old`}</div>;
};

// Component composition
const App = () => (
  <div>
    <Greet name="John" age={25} />
    <Greet name="Jane" />
  </div>
);
```

### Day 3-4: Hooks (useState, useEffect)

```typescript
interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Day 5: Props & State Management Patterns

```typescript
// Custom Hook [^1]
const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);

  return { count, increment, decrement, reset };
};

// Context API for global state
interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    // API call
    setUser({ id: 1, email, name: "John" });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Using context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
```

### Day 6-7: Forms & Events

```typescript
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: Partial<FormData> = {};
    if (!form.email) newErrors.email = 'Email required';
    if (!form.password) newErrors.password = 'Password required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      if (res.ok) {
        // Handle success
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <span>{errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
};
```

**Exercise**: Build a complete todo application with React

---

## Week 6: Next.js & Advanced Patterns

### Day 1-2: Next.js App Router [^2]

```typescript
// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx - Home page
export default function Home() {
  return <h1>Welcome</h1>;
}

// app/projects/[id]/page.tsx - Dynamic route
interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <h1>Project {params.id}</h1>;
}

// Server Component (default)
export default async function ProjectDetail() {
  const project = await fetch(`/api/projects/${id}`).then(r => r.json());
  return <div>{project.name}</div>;
}

// Client Component
'use client';

import { useState } from 'react';

export default function InteractiveProject() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Day 3-4: Data Fetching & Optimization [^3]

```typescript
// Server-side fetching
export async function generateMetadata(
  { params }: ProjectPageProps
): Promise<Metadata> {
  const project = await fetch(
    `${process.env.API_URL}/projects/${params.id}`
  ).then(r => r.json());

  return {
    title: project.name,
    description: project.description,
  };
}

// Revalidation
const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await fetch(
    `${process.env.API_URL}/projects/${params.id}`,
    { next: { revalidate } }
  ).then(r => r.json());

  return <div>{project.name}</div>;
}

// Image Optimization
import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <Image
      src={project.image}
      alt={project.name}
      width={300}
      height={200}
      priority={false}
      quality={75}
    />
  );
}
```

### Day 5: Authentication with NextAuth [^4]

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // Call your API
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

// Usage in components
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.email}
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Sign In</button>;
}
```

### Day 6-7: Routing & API Routes

```typescript
// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get('skip') || '0');
  const limit = parseInt(searchParams.get('limit') || '10');

  try {
    const projects = await fetchProjects(skip, limit);
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newProject = await createProject(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 400 }
    );
  }
}

// app/api/projects/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project = await fetchProject(params.id);
  if (!project) {
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }
  return NextResponse.json(project);
}
```

**Exercise**: Build portfolio website with Next.js, deploy demo of a project showcase

---

## 📚 Citations

[^1]: React Hooks - https://react.dev/reference/react
[^2]: Next.js App Router - https://nextjs.org/docs/app
[^3]: Next.js Data Fetching - https://nextjs.org/docs/app/building-your-application/data-fetching
[^4]: NextAuth.js - https://next-auth.js.org

**Next**: [WEEK-07-08-NODE-BACKEND.md](./WEEK-07-08-NODE-BACKEND.md)
