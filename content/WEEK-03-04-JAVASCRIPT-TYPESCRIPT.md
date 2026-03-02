# Weeks 3-4: JavaScript Fundamentals & TypeScript Basics

## 📌 Overview

Master core JavaScript concepts and transition to TypeScript for type safety.

---

## Week 3: JavaScript Fundamentals

### Day 1-2: Variables, Data Types, Operators

```javascript
// Variables [^1]
let age = 25;              // block-scoped, reassignable
const name = "John";       // block-scoped, immutable (preferred)
var old = 10;              // function-scoped (avoid)

// Data Types
const string = "text";
const number = 42;
const boolean = true;
const array = [1, 2, 3];
const object = { name: "John", age: 25 };
const nothing = null;      // intentional absence
const undefined = undefined; // uninitialized

// Type checking
typeof string;             // "string"
typeof number;             // "number"
Array.isArray(array);      // true

// Operators
const sum = 10 + 5;        // arithmetic
const equal = a === b;     // strict equality (prefer)
const logical = a && b;    // logical AND
const nullish = a ?? b;    // nullish coalescing

// Template literals
const greeting = `Hello, ${name}!`;
const multiline = `Line 1
Line 2`;
```

**Exercise**: Create calculator script with variables and operators

### Day 3: Functions & Scope

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow function (modern, preferred) [^2]
const add = (a, b) => a + b;
const square = x => x * x;
const getUser = () => ({ id: 1, name: "John" });

// Default parameters
const createUser = (name = "Guest", role = "User") => ({
    name,
    role,
    createdAt: new Date()
});

// Scope
const global = "I'm global";

function myFunction() {
    const local = "I'm local";
    console.log(global);   // accessible
    console.log(local);    // accessible
}

console.log(local);        // ERROR: not accessible outside

// Closure: function remembers outer scope
function counter() {
    let count = 0;
    return () => {
        count++;
        return count;
    };
}

const increment = counter();
increment();  // 1
increment();  // 2
```

**Exercise**: Build a counter function with closure

### Day 4-5: Arrays & Objects

```javascript
// Arrays
const numbers = [1, 2, 3, 4, 5];

// Array methods [^3]
numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
numbers.filter(n => n > 2);        // [3, 4, 5]
numbers.reduce((sum, n) => sum + n, 0);  // 15
numbers.find(n => n > 3);          // 4
numbers.some(n => n > 4);          // true
numbers.every(n => n > 0);         // true

// Array destructuring
const [first, second, ...rest] = numbers;

// Objects
const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    address: {
        city: "New York",
        zip: "10001"
    }
};

// Object methods
Object.keys(user);                 // ["id", "name", "email", "address"]
Object.values(user);               // [1, "John", "john@example.com", {...}]
Object.entries(user);              // [["id", 1], ["name", "John"], ...]

// Object destructuring
const { name, email } = user;
const { address: { city } } = user;  // nested destructuring
const { role = "User" } = user;      // default value

// Spread operator
const newUser = { ...user, role: "Admin" };
const combined = [...array1, ...array2];
```

**Exercise**: Work with real API data (dummy JSON)

### Day 6: Control Flow & Error Handling

```javascript
// If/else
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teen");
} else {
    console.log("Child");
}

// Switch
switch (role) {
    case "admin":
        console.log("Full access");
        break;
    case "user":
        console.log("Limited access");
        break;
    default:
        console.log("No access");
}

// Loops
for (let i = 0; i < 10; i++) {
    console.log(i);
}

numbers.forEach((n, index) => {
    console.log(`${index}: ${n}`);
});

while (condition) {
    // code
}

// Error handling [^4]
try {
    riskyFunction();
} catch (error) {
    console.error("Error:", error.message);
} finally {
    cleanup();
}

// Throwing errors
if (!user) {
    throw new Error("User not found");
}
```

**Exercise**: Build a form validator with error handling

### Day 7: Promises & Async/Await

```javascript
// Promise [^5]
const fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
};

// Promise chain
fetchUser(1)
    .then(user => console.log(user))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));

// Async/Await (modern, cleaner) [^6]
const getUserData = async (userId) => {
    try {
        const user = await fetchUser(userId);
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
};

// Calling async function
await getUserData(1);

// Parallel operations
const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
]);
```

**Exercise**: Fetch data from public API (JSONPlaceholder)

---

## Week 4: TypeScript Fundamentals

### Day 1-2: Basic Types

```typescript
// Primitive types
const name: string = "John";
const age: number = 25;
const isActive: boolean = true;
const nothing: null = null;
const empty: undefined = undefined;

// Any type (avoid - defeats purpose of TypeScript)
let anything: any = "could be anything";

// Union types (multiple possible types)
let id: string | number;
id = "ID001";
id = 123;

// Type aliases
type ID = string | number;
let userId: ID = "user123";

// Arrays
const names: string[] = ["John", "Jane"];
const numbers: Array<number> = [1, 2, 3];
const mixed: (string | number)[] = ["text", 1];

// Tuples (fixed-length arrays)
type Point = [number, number];
const coordinates: Point = [10, 20];

// Literal types (specific values only)
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
let method: HttpMethod = "GET";

// Enum
enum Role {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

const userRole: Role = Role.Admin;
```

**Exercise**: Rewrite Week 3 calculator with TypeScript types

### Day 3-4: Objects & Interfaces

```typescript
// Interface - contract for object shape [^7]
interface User {
    id: number;
    name: string;
    email: string;
    role?: string;              // optional
    createdAt: Date;
    readonly isActive: boolean; // read-only
}

// Implementing interface
const user: User = {
    id: 1,
    name: "John",
    email: "john@example.com",
    createdAt: new Date(),
    isActive: true
};

// Function with interface
const greetUser = (user: User): string => {
    return `Hello, ${user.name}!`;
};

// Extending interfaces
interface Admin extends User {
    permissions: string[];
}

// Intersection types
type UserWithTimestamp = User & { updatedAt: Date };

// Type vs Interface comparison
type UserType = { id: number; name: string };
interface UserInterface { id: number; name: string }
// Both work similarly; use Interface for objects, Type for other uses
```

**Exercise**: Create interfaces for project data

### Day 5: Generics & Advanced Types

```typescript
// Generics - reusable components with type safety [^8]
function getFirstElement<T>(array: T[]): T {
    return array[0];
}

getFirstElement<string>(["a", "b"]);  // returns string
getFirstElement<number>([1, 2]);      // returns number

// Generic interface
interface Repository<T> {
    items: T[];
    add(item: T): void;
    getById(id: number): T | undefined;
}

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

// Utility types [^9]
interface User {
    id: number;
    name: string;
    email: string;
}

type ReadonlyUser = Readonly<User>;       // all properties readonly
type UserPreview = Pick<User, "name" | "email">;  // subset of properties
type UserUpdate = Partial<User>;          // all properties optional
type UserRequired = Required<User>;       // all properties required
type UserKeys = keyof User;               // "id" | "name" | "email"
```

**Exercise**: Create reusable generic repository pattern

### Day 6-7: Async TypeScript & Advanced Patterns

```typescript
// Async function typing
async function fetchUser(userId: number): Promise<User> {
    try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        return response.json() as Promise<User>;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error}`);
    }
}

// Error typing
class ValidationError extends Error {
    constructor(
        public field: string,
        message: string
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

// Type guards
function isUser(obj: any): obj is User {
    return (
        typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.name === "string"
    );
}

// Class with types
class UserService {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
    }

    getUser(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }

    getAllUsers(): User[] {
        return [...this.users];
    }
}
```

**Exercise**: Convert portfolio project to TypeScript

---

## 📚 Citations

[^1]: MDN Variables - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables
[^2]: MDN Arrow Functions - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[^3]: MDN Array Methods - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[^4]: MDN Error Handling - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong
[^5]: MDN Promises - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
[^6]: MDN Async/Await - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
[^7]: TypeScript Handbook Interfaces - https://www.typescriptlang.org/docs/handbook/2/objects.html
[^8]: TypeScript Generics - https://www.typescriptlang.org/docs/handbook/2/generics.html
[^9]: TypeScript Utility Types - https://www.typescriptlang.org/docs/handbook/utility-types.html

**Next**: [WEEK-05-06-REACT-NEXTJS.md](./WEEK-05-06-REACT-NEXTJS.md)
