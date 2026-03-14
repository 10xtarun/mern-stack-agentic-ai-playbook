# Weeks 3-4: JavaScript Fundamentals & TypeScript Basics (Enhanced)

## 📌 Overview

**Weeks 3-4 Bridge**: From "building websites" to "programming logic"

In Weeks 1-2, you learned to **structure and style**. Now learn the **behavior and logic** that makes web applications work. You'll master JavaScript, then add TypeScript for safety.

**Learning Arc**:
- Week 3 Day 1-2: Variables & basic thinking
- Week 3 Day 3: Functions (reusable logic)
- Week 3 Day 4-5: Data structures (organizing information)
- Week 3 Day 6: Decision-making (control flow)
- Week 3 Day 7: Async patterns (real-world waiting)
- Week 4 Days 1-2: Type system (preventing bugs)
- Week 4 Days 3-4: Interfaces (contracts)
- Week 4 Days 5-7: Advanced patterns (professional code)

---

# 🔥 WEEK 3: JAVASCRIPT FUNDAMENTALS

## Day 1-2: Variables, Data Types, Operators

### The Foundation: What is a Variable?

Think of variables like **labeled boxes in a warehouse**. Instead of saying "the number 25", you label it `age`, and whenever you need it, you say "give me what's in the `age` box."

```
┌─────────────────────┐
│   age: 25           │  ← Variable
├─────────────────────┤
│   Stack of numbers  │
│   in memory         │
└─────────────────────┘
```

### Three Types of Variable Declarations

```javascript
// ✅ CONST (Recommended - 95% of time)
const name = "John";
name = "Jane";  // ❌ ERROR: Can't reassign
// Use when: Value doesn't change (functions, objects, arrays)

// ✅ LET (Use when value WILL change)
let age = 25;
age = 26;  // ✅ OK: Can reassign
// Use when: Loop counters, temporary values

// ❌ VAR (Avoid - legacy, confusing scope)
var old = 10;  // Don't use in modern JavaScript
// Why avoid: Function-scoped (confusing), can be redeclared
```

**Why This Matters for Internships**: Interviewers ask "Why const over let?" Answer: "Const prevents accidental reassignment, making code more predictable."

### Understanding JavaScript Data Types

```javascript
// 6 Primitive Types (immutable - can't change in place)
const string = "Hello";           // Text
const number = 42;                // Integer or decimal (no separate types)
const boolean = true;             // true or false only
const nothing = null;              // "intentionally empty" (programmer set)
const uninitialized = undefined;   // "forgot to set" (JavaScript set)
const symbol = Symbol('unique');   // Unique identifier

// Object (mutable - can change properties)
const object = { name: "John", age: 25 };
const array = [1, 2, 3];
const function_obj = function() {};

// Type checking
typeof "text"              // "string"
typeof 42                  // "number"
typeof true                // "boolean"
typeof undefined           // "undefined" (not "null"!)
typeof null                // "object" (famous JavaScript quirk!)
typeof {}                  // "object"
typeof []                  // "object" (arrays are objects!)

Array.isArray([1, 2])      // true - better way to check arrays
Array.isArray({})          // false
```

**Visualization: Primitive vs Object**

```
Primitive Types (Immutable)          Object Types (Mutable)
┌──────────────────────┐            ┌──────────────────────┐
│ const x = 5          │            │ const user = {       │
│ const x = 10         │            │   name: "John"       │
│ (Creates new value)  │            │ }                    │
│                      │            │ user.name = "Jane"   │
│ x is now 10          │            │ (Modifies existing)  │
│ Original 5 still in  │            │                      │
│ memory (garbage      │            │ user is still same   │
│ collected later)     │            │ object, properties   │
│                      │            │ changed              │
└──────────────────────┘            └──────────────────────┘
```

### Operators: The Actions You Perform

```javascript
// Arithmetic Operators
10 + 5;    // 15 (addition)
10 - 5;    // 5 (subtraction)
10 * 5;    // 50 (multiplication)
10 / 5;    // 2 (division)
10 % 3;    // 1 (modulo - remainder)
2 ** 3;    // 8 (exponentiation)

// Comparison Operators
5 == "5";      // true (loose equality - type coercion)
5 === "5";     // false (strict equality - ALWAYS USE THIS)
5 !== 5;       // false (not equal)
5 > 3;         // true
5 >= 5;        // true

// Logical Operators
true && true;   // true (AND - both must be true)
true || false;  // true (OR - at least one true)
!true;          // false (NOT - inverts)

// Assignment Operators
let x = 5;
x += 10;  // x = x + 10 (x is now 15)
x -= 5;   // x = x - 5
x *= 2;   // x = x * 2
x /= 2;   // x = x / 2

// Nullish Coalescing (modern, very useful!)
const user = null;
const name = user ?? "Guest";  // "Guest" (because user is null)

const count = 0;
const display = count ?? "No count";  // 0 (because 0 is valid!)
// ⚠️ Note: ?? ignores 0, false, "" (falsy) - unlike ||

// Template Literals (interpolation)
const firstName = "John";
const lastName = "Doe";
const greeting = `Hello, ${firstName} ${lastName}!`;
// Result: "Hello, John Doe!"

// Multiline strings
const poem = `
  Roses are red,
  Violets are blue,
  JavaScript is fun,
  And TypeScript too!
`;
```

**Decision Tree: Equality**

```
When comparing values:

Is type the same?
├─ YES → Use ==
├─ NO → 5 == "5" is true (coercion)
│       5 === "5" is false (strict)
│
└─ BEST PRACTICE: Always use === (strict)
   - Prevents bugs
   - More predictable
   - Faster (no conversion)
```

### Exercise 1: Calculator with Variables

```javascript
// Task: Build a simple interest calculator

const principal = 1000;      // Initial amount
const rate = 5;              // Interest rate (5%)
const years = 2;             // Time period

// Calculate simple interest
const interest = (principal * rate * years) / 100;
const totalAmount = principal + interest;

console.log(`Principal: $${principal}`);
console.log(`Interest Rate: ${rate}%`);
console.log(`Time: ${years} years`);
console.log(`Interest Earned: $${interest}`);
console.log(`Total Amount: $${totalAmount}`);

// Output:
// Principal: $1000
// Interest Rate: 5%
// Time: 2 years
// Interest Earned: $100
// Total Amount: $1100
```

### Common Mistakes to Avoid

```javascript
// ❌ MISTAKE 1: Using == instead of ===
if (userInput == 5) {  // Risky!
    // "5" (string) would pass
}

// ✅ CORRECT:
if (userInput === 5) {
    // Only number 5 passes
}

// ❌ MISTAKE 2: Reassigning constants
const x = 5;
x = 10;  // ERROR! Don't do this

// ✅ CORRECT:
let x = 5;
x = 10;  // Fine, x changes

// ❌ MISTAKE 3: Confusing null vs undefined
const empty = null;      // I left it empty on purpose
const forgot = undefined; // JavaScript set this (uninitialized)

// ✅ CHECK: Use strict equality
empty === undefined;     // false
forgot === undefined;    // true
```

### Mini-Project: Temperature Converter

```javascript
// Convert Celsius to Fahrenheit and Kelvin

const celsius = 25;

const fahrenheit = (celsius * 9/5) + 32;
const kelvin = celsius + 273.15;

console.log(`${celsius}°C = ${fahrenheit}°F = ${kelvin}K`);

// Test multiple temperatures
const temperatures = [0, 25, 100];
temperatures.forEach(temp => {
    const f = (temp * 9/5) + 32;
    const k = temp + 273.15;
    console.log(`${temp}°C → ${f}°F → ${k}K`);
});
```

---

## Day 3: Functions & Scope

### What Are Functions?

Functions are **reusable blocks of code** that:
1. Take **inputs** (parameters)
2. Do **something** with them
3. Return **outputs** (results)

**Real-world analogy**: A function is like a machine. You feed it raw materials (inputs), it processes them, and outputs the result.

```
Input (Parameters) → [FUNCTION LOGIC] → Output (Return)
    age: 25             calculateYear()      born: 1999
    name: "John"        createUser()         { id: 1, name: "John" }
    items: [1,2,3]      sum()                6
```

### Function Declarations vs Arrow Functions

```javascript
// ❌ OLD: Function Declaration
function add(a, b) {
    return a + b;
}
add(5, 3);  // 8

// ✅ MODERN: Arrow Function (Preferred)
const add = (a, b) => {
    return a + b;
};
add(5, 3);  // 8

// ✅ EVEN CLEANER: Concise arrow function
const add = (a, b) => a + b;
add(5, 3);  // 8

// ✅ SINGLE PARAMETER: No parentheses needed
const square = x => x * x;
square(5);  // 25

// ✅ NO PARAMETERS:
const getToday = () => new Date();
getToday();  // Date object

// ✅ RETURNING OBJECT: Parentheses required
const createUser = (name) => ({ id: 1, name: name });
createUser("John");  // { id: 1, name: "John" }
```

**Why Arrow Functions?**
- Shorter syntax
- Cleaner code
- Work better with modern patterns
- Better `this` binding (we'll discuss later)

### Understanding Scope: "Can I see this variable?"

```
┌─ GLOBAL SCOPE
│  const global = "visible everywhere";
│
│  ┌─ FUNCTION SCOPE
│  │  const inFunction = "only here";
│  │
│  │  ┌─ BLOCK SCOPE (if, for, etc.)
│  │  │  const inBlock = "only in block";
│  │  │  console.log(global);      // ✅ YES
│  │  │  console.log(inFunction);  // ✅ YES
│  │  │  console.log(inBlock);     // ✅ YES
│  │  └─
│  │
│  │  console.log(inBlock);  // ❌ NO
│  └─
│
│  console.log(inFunction);  // ❌ NO
└─
```

```javascript
// Global scope
const api = "https://api.example.com";

function fetchUser(userId) {
    // Function scope
    const endpoint = `${api}/users/${userId}`;
    
    if (userId > 0) {
        // Block scope
        const user = { id: userId };
        console.log(user);        // ✅ Works
    }
    
    console.log(user);  // ❌ ERROR: user not defined
    console.log(api);   // ✅ Works (global)
}
```

### Closures: Functions "Remembering" Their Scope

A **closure** is when a function remembers variables from its parent scope even after the parent function finishes.

```javascript
// Example: Counter
function createCounter() {
    let count = 0;  // This variable "lives" in memory
    
    return () => {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// The inner function "closed over" the count variable
// That's why it's called a CLOSURE!
```

**Visualization of Closures**:

```
createCounter() called:
┌─────────────────────────┐
│ let count = 0           │← Lives in memory
└─────────────────────────┘
        ↓
    Returns: () => { count++; return count; }
        ↓
    This function REMEMBERS count!
        ↓
    Each time called:
    counter() → count becomes 1
    counter() → count becomes 2
    counter() → count becomes 3
```

**Real-world use: Private data**

```javascript
// Bank account with private balance
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // Private! Can't access directly
    
    return {
        deposit: (amount) => {
            balance += amount;
            return balance;
        },
        withdraw: (amount) => {
            if (amount > balance) return "Insufficient funds";
            balance -= amount;
            return balance;
        },
        getBalance: () => balance
    };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);    // 1500
myAccount.withdraw(200);   // 1300
console.log(myAccount.getBalance());  // 1300

// User can't do: myAccount.balance = 0
// It's private! Only functions can access it
```

### Default Parameters

```javascript
// Old way: Check inside function
const greet = (name) => {
    name = name || "Guest";
    return `Hello, ${name}!`;
};

// Modern way: Default parameter
const greet = (name = "Guest") => `Hello, ${name}!`;

greet();           // "Hello, Guest!"
greet("John");     // "Hello, John!"

// Can use expressions as defaults
const createUser = (
    name = "Unknown",
    role = "User",
    createdAt = new Date()
) => ({
    name,
    role,
    createdAt
});
```

### Exercise 2: Build a Reusable Greet Function

```javascript
// Task: Create greeting function that handles different cases

const greet = (name = "Friend", greeting = "Hello") => {
    return `${greeting}, ${name}!`;
};

// Usage
console.log(greet());                    // "Hello, Friend!"
console.log(greet("Alice"));             // "Hello, Alice!"
console.log(greet("Bob", "Hi"));         // "Hi, Bob!"
console.log(greet("Charlie", "Hey"));    // "Hey, Charlie!"

// Bonus: Password validator with closure
function createPasswordValidator(minLength = 8) {
    return (password) => {
        return password.length >= minLength;
    };
}

const isStrongPassword = createPasswordValidator(12);
console.log(isStrongPassword("abc"));        // false
console.log(isStrongPassword("abcdefghijkl")); // true
```

---

## Day 4-5: Arrays & Objects (Data Structures)

### Arrays: Lists of Values

Think of arrays as **ordered lists**. Each item has a position (index starting from 0).

```
        Index:  0       1       2       3
        Value: "John"  "Jane"  "Bob"  "Alice"
               ↓
        numbers[0]  = "John"
        numbers[2]  = "Bob"
```

```javascript
// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "text", true, { name: "John" }];
const empty = [];

// Accessing elements
numbers[0];        // 1 (first)
numbers[4];        // 5 (last)
numbers.length;    // 5 (how many items)

// Modifying arrays
numbers[0] = 10;           // Change first element
numbers.push(6);           // Add to end: [1,2,3,4,5,6]
numbers.pop();             // Remove from end: [1,2,3,4,5]
numbers.unshift(0);        // Add to start: [0,1,2,3,4,5]
numbers.shift();           // Remove from start: [1,2,3,4,5]
```

### Array Methods: Transforming Data

**These are CRITICAL for modern JavaScript.**

```javascript
const numbers = [1, 2, 3, 4, 5];

// MAP: Transform each element
const doubled = numbers.map(n => n * 2);
// Result: [2, 4, 6, 8, 10]

// FILTER: Keep only elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
// Result: [2, 4]

// REDUCE: Combine all elements into one value
const sum = numbers.reduce((total, n) => total + n, 0);
// Result: 15
// How it works:
//   total=0 + n=1 = 1
//   total=1 + n=2 = 3
//   total=3 + n=3 = 6
//   total=6 + n=4 = 10
//   total=10 + n=5 = 15

// FIND: Get first element that matches
const firstEven = numbers.find(n => n % 2 === 0);
// Result: 2

// SOME: Does ANY element match?
const hasEven = numbers.some(n => n % 2 === 0);
// Result: true

// EVERY: Do ALL elements match?
const allPositive = numbers.every(n => n > 0);
// Result: true

// INCLUDES: Is value in array?
numbers.includes(3);  // true
numbers.includes(10); // false
```

**Map vs Filter vs Reduce - Visual**:

```
Original: [1, 2, 3, 4, 5]

MAP: Transform each
  1 → 2
  2 → 4
  3 → 6
  4 → 8
  5 → 10
Result: [2, 4, 6, 8, 10]

FILTER: Keep if true
  1 % 2 === 0? NO
  2 % 2 === 0? YES ✓
  3 % 2 === 0? NO
  4 % 2 === 0? YES ✓
  5 % 2 === 0? NO
Result: [2, 4]

REDUCE: Combine
  0 + 1 = 1
  1 + 2 = 3
  3 + 3 = 6
  6 + 4 = 10
  10 + 5 = 15
Result: 15
```

### Destructuring: Unpack Arrays

```javascript
const colors = ["red", "green", "blue"];

// Old way
const first = colors[0];
const second = colors[1];

// Modern way - Destructuring
const [first, second] = colors;
console.log(first);   // "red"
console.log(second);  // "green"

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// Rest operator (...) - get remaining
const [mainColor, ...others] = colors;
console.log(mainColor);  // "red"
console.log(others);     // ["green", "blue"]
```

### Objects: Key-Value Pairs

If arrays are **lists**, objects are **labeled containers**. Each property has a name (key) and value.

```
┌─────────────────────────────────────┐
│ Object: User                        │
├──────────────┬──────────────────────┤
│ Key          │ Value                │
├──────────────┼──────────────────────┤
│ id           │ 1                    │
│ name         │ "John Doe"           │
│ email        │ "john@example.com"   │
│ isActive     │ true                 │
│ age          │ 25                   │
└──────────────┴──────────────────────┘
```

```javascript
// Creating objects
const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    isActive: true,
    age: 25,
    address: {
        street: "123 Main St",
        city: "New York",
        zip: "10001"
    }
};

// Accessing properties
user.name;              // "John Doe" (dot notation)
user["email"];          // "john@example.com" (bracket notation)
user.address.city;      // "New York" (nested)

// Modifying properties
user.age = 26;
user.role = "Admin";    // Add new property
delete user.isActive;   // Remove property

// Object methods
Object.keys(user);      // ["id", "name", "email", "isActive", "age", "address"]
Object.values(user);    // [1, "John Doe", "john@example.com", true, 25, {...}]
Object.entries(user);   // [["id", 1], ["name", "John Doe"], ...]
```

### Destructuring Objects

```javascript
const user = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 25
};

// Extract specific properties
const { name, email } = user;
console.log(name);   // "John"
console.log(email);  // "john@example.com"

// Rename during destructuring
const { name: fullName, age: userAge } = user;
console.log(fullName);  // "John"
console.log(userAge);   // 25

// Default values
const { role = "User" } = user;
console.log(role);  // "User" (not in object, so default)

// Nested destructuring
const { address: { city } } = user;  // Won't work (no address)

const { address: { city } } = {
    address: { city: "New York", zip: "10001" }
};
console.log(city);  // "New York"

// Rest operator in objects
const { id, ...rest } = user;
console.log(id);    // 1
console.log(rest);  // { name: "John", email: "john@example.com", age: 25 }
```

### Spread Operator: Copy & Combine

```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const combined = [...arr1, ...arr2];
// Result: [1, 2, 3, 4, 5, 6]

const withExtra = [0, ...arr1, 3.5, ...arr2, 7];
// Result: [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Objects
const user = { id: 1, name: "John" };
const updatedUser = { ...user, role: "Admin" };
// Result: { id: 1, name: "John", role: "Admin" }

const withDefaults = { ...user, id: 2 };
// Result: { id: 2, name: "John" } (id overwritten)

// Shallow copy (good for preventing mutations)
const original = { id: 1, info: { name: "John" } };
const copy = { ...original };

copy.id = 2;                // ✅ original.id still 1
copy.info.name = "Jane";    // ❌ original.info.name also changed!
// ⚠️ Nested objects aren't deep-copied
```

### Exercise 3: Work with Real API Data

```javascript
// Simulating data from an API
const apiResponse = {
    status: "success",
    data: [
        { id: 1, name: "Alice", email: "alice@example.com", score: 85 },
        { id: 2, name: "Bob", email: "bob@example.com", score: 92 },
        { id: 3, name: "Charlie", email: "charlie@example.com", score: 78 },
        { id: 4, name: "Diana", email: "diana@example.com", score: 95 }
    ]
};

// Extract users
const users = apiResponse.data;

// Get names only
const names = users.map(user => user.name);
console.log(names);  // ["Alice", "Bob", "Charlie", "Diana"]

// Filter high scorers (80+)
const highScorers = users.filter(user => user.score >= 80);
console.log(highScorers);  // Alice, Bob, Diana

// Calculate average score
const averageScore = users.reduce((sum, user) => sum + user.score, 0) / users.length;
console.log(averageScore);  // 87.5

// Find top scorer
const topScorer = users.reduce((max, user) => 
    user.score > max.score ? user : max
);
console.log(topScorer);  // { id: 4, name: "Diana", ... }

// Create user display objects
const displayUsers = users.map(({ name, email, score }) => ({
    displayName: name.toUpperCase(),
    contact: email,
    percentage: `${score}%`
}));
console.log(displayUsers);
```

---

## Day 6: Control Flow & Decision Making

### If/Else: Making Decisions

```javascript
const age = 25;

// Basic if/else
if (age >= 18) {
    console.log("You can vote");
} else {
    console.log("You're too young");
}

// Multiple conditions with else if
if (age < 13) {
    console.log("You're a child");
} else if (age < 18) {
    console.log("You're a teenager");
} else if (age < 65) {
    console.log("You're an adult");
} else {
    console.log("You're a senior");
}

// Nested conditions
if (age >= 18) {
    if (age >= 65) {
        console.log("Senior citizen");
    } else {
        console.log("Working adult");
    }
} else {
    console.log("Minor");
}

// Combining conditions
if (age >= 18 && age < 65) {
    console.log("Working age");
}

if (role === "admin" || role === "moderator") {
    console.log("Has special permissions");
}
```

### Switch: When You Have Many Options

```javascript
const role = "user";

// Switch is cleaner than many if/else
switch (role) {
    case "admin":
        console.log("Full access to all features");
        break;  // Important! Don't forget
    case "moderator":
        console.log("Can manage content");
        break;
    case "user":
        console.log("Can view and comment");
        break;
    case "guest":
        console.log("Read-only access");
        break;
    default:
        console.log("Unknown role");
}

// Switch with multiple cases (same action)
const status = "pending";

switch (status) {
    case "pending":
    case "processing":
        console.log("Please wait...");
        break;
    case "complete":
        console.log("Done!");
        break;
    case "error":
        console.log("Something went wrong");
        break;
}
```

### Loops: Repeating Actions

```javascript
// FOR LOOP: Repeat for a count
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// WHILE LOOP: Repeat while condition is true
let count = 0;
while (count < 3) {
    console.log(count);
    count++;  // Must increase, or infinite loop!
}

// DO...WHILE: Run once, then check condition
let x = 0;
do {
    console.log(x);
    x++;
} while (x < 3);
// Runs even if condition is false initially

// FOREACH: Iterate through array
const colors = ["red", "green", "blue"];
colors.forEach((color, index) => {
    console.log(`${index}: ${color}`);
});
// Output:
// 0: red
// 1: green
// 2: blue

// FOR...OF: Iterate through array values
for (const color of colors) {
    console.log(color);
}

// FOR...IN: Iterate through object keys
const user = { name: "John", age: 25, city: "NYC" };
for (const key in user) {
    console.log(`${key}: ${user[key]}`);
}
```

**Loop Control**:

```javascript
// BREAK: Exit loop immediately
for (let i = 0; i < 10; i++) {
    if (i === 5) break;  // Stop at 5
    console.log(i);      // 0, 1, 2, 3, 4
}

// CONTINUE: Skip to next iteration
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;  // Skip 2
    console.log(i);         // 0, 1, 3, 4
}

// Find first even number
const numbers = [1, 3, 5, 4, 7, 2];
for (const num of numbers) {
    if (num % 2 === 0) {
        console.log(`Found: ${num}`);
        break;  // Stop after finding
    }
}
// Output: Found: 4
```

### Error Handling: Dealing with Mistakes

```javascript
// TRY...CATCH: Handle errors gracefully
try {
    // Code that might fail
    const result = riskyFunction();
    console.log(result);
} catch (error) {
    // Code runs if try block fails
    console.error("Error occurred:", error.message);
} finally {
    // Always runs, whether try succeeds or not
    cleanup();
}

// THROWING ERRORS: Create your own errors
function validateAge(age) {
    if (age < 0) {
        throw new Error("Age cannot be negative");
    }
    if (age > 150) {
        throw new Error("Age seems invalid");
    }
    return true;
}

try {
    validateAge(-5);  // Will throw error
} catch (error) {
    console.error(error.message);  // "Age cannot be negative"
}

// Custom Error Classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.field = field;
        this.name = "ValidationError";
    }
}

try {
    throw new ValidationError("Email is required", "email");
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(`${error.field}: ${error.message}`);
    }
}
```

### Ternary Operator: One-Line If/Else

```javascript
// Traditional if/else
let message;
if (age >= 18) {
    message = "Adult";
} else {
    message = "Minor";
}

// Ternary operator
const message = age >= 18 ? "Adult" : "Minor";

// Can nest (but be careful - gets unreadable)
const category = age < 13 ? "Child" : age < 18 ? "Teen" : "Adult";

// Using in function returns
const getDiscount = (age) => age >= 65 ? 0.2 : age >= 13 ? 0.1 : 0;
```

### Exercise 4: Form Validator with Error Handling

```javascript
function validateUser(userData) {
    try {
        const { name, email, age } = userData;
        
        // Validation rules
        if (!name || name.trim() === "") {
            throw new Error("Name is required");
        }
        
        if (name.length < 2) {
            throw new Error("Name must be at least 2 characters");
        }
        
        if (!email || !email.includes("@")) {
            throw new Error("Valid email required");
        }
        
        if (typeof age !== "number" || age < 0 || age > 150) {
            throw new Error("Age must be a valid number between 0-150");
        }
        
        return { success: true, data: userData };
        
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Test
console.log(validateUser({ name: "Alice", email: "alice@example.com", age: 25 }));
// { success: true, data: {...} }

console.log(validateUser({ name: "A", email: "invalid", age: -5 }));
// { success: false, error: "Name must be at least 2 characters" }
```

---

## Day 7: Promises & Async/Await (Real-World Code)

### The Problem: Waiting for Data

In the real world, you often wait:
- For a server response
- For a file to load
- For a database query to complete

```
Traditional way:
Do Task 1 → Wait... → Task 1 done → Do Task 2 → Wait... → Done

Better way:
Start Task 1 → Do Task 2 → Do Task 3 → Task 1 done → Process result
(All happening while Task 1 waits)
```

### Promises: The Old Way (Still Important)

A Promise is an **object** that represents a future value that might not exist yet.

```javascript
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    // resolve: Called when successful
    // reject: Called when error

    setTimeout(() => {
        resolve("Data received!");
    }, 2000);
});

// Using a Promise
myPromise
    .then(result => {
        // Runs when resolved
        console.log(result);  // "Data received!"
    })
    .catch(error => {
        // Runs when rejected
        console.error(error);
    })
    .finally(() => {
        // Always runs
        console.log("Done!");
    });
```

**Promise States**:

```
           ┌─ Pending (waiting)
           │
Promise ───┼─ Fulfilled (done, success)
           │
           └─ Rejected (error)

           Once settled (fulfilled or rejected),
           it can't change state
```

```javascript
// Simulating API call
const fetchUser = (userId) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "John Doe",
                    email: "john@example.com"
                });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
};

// Using the Promise
fetchUser(1)
    .then(user => {
        console.log("User found:", user);
        return user.id;  // Can chain promises
    })
    .then(userId => {
        console.log("User ID:", userId);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
```

### Async/Await: The Modern Way (Much Better!)

```javascript
// Instead of .then().catch()...

// OLD (Promise chains)
fetchUser(1)
    .then(user => user.id)
    .then(userId => fetchPosts(userId))
    .catch(error => console.error(error));

// NEW (Async/await - reads like normal code!)
const getUser = async (userId) => {
    try {
        const user = await fetchUser(userId);  // Wait for result
        console.log(user);
        return user;
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Call async function
getUser(1);
```

**Why Async/Await is Better**:
1. Reads like synchronous code (easier to understand)
2. Don't need nested `.then()` chains
3. Error handling with familiar `try/catch`

```javascript
// Real example: Fetch from API
const fetchUserData = async (userId) => {
    try {
        // Wait for the fetch
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        // Check if successful
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        // Parse JSON
        const user = await response.json();
        
        // Return the user
        return user;
        
    } catch (error) {
        console.error("Failed to fetch user:", error.message);
        return null;
    }
};

// Using it
const user = await fetchUserData(1);
console.log(user);
```

### Parallel Operations: Multiple Waits

```javascript
// Bad: Sequential (waits for each one)
const user = await fetchUser(1);      // Wait 1 sec
const posts = await fetchPosts(1);    // Wait 1 sec
const comments = await fetchComments(1); // Wait 1 sec
// Total: 3 seconds

// Good: Parallel (all at once)
const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
]);
// Total: 1 second (same as slowest request)

// If one fails, all fail:
Promise.all([...])
    .catch(error => {
        console.error("One failed:", error);
    });

// Alternative: Promise.allSettled (get all results, even if some fail)
const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(999),  // This might fail
    fetchUser(3)
]);

// Some succeeded, some failed - you handle each
results.forEach((result, index) => {
    if (result.status === "fulfilled") {
        console.log(`User ${index}:`, result.value);
    } else {
        console.log(`User ${index} failed:`, result.reason);
    }
});
```

### Exercise 5: Fetch Data from Public API

```javascript
// Using JSONPlaceholder (free fake API)
const getPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const post = await response.json();
        
        console.log("Post:", post);
        console.log("Title:", post.title);
        console.log("Body:", post.body);
        
        return post;
    } catch (error) {
        console.error("Failed to fetch post:", error);
    }
};

// Call it
await getPosts();

// More complex: Get user and their posts
const getUserWithPosts = async (userId) => {
    try {
        // Fetch both in parallel
        const [user, posts] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json()),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json())
        ]);
        
        return {
            user,
            posts: posts.slice(0, 3)  // First 3 posts
        };
    } catch (error) {
        console.error("Error:", error);
    }
};

const data = await getUserWithPosts(1);
console.log(data);
```

### Common Mistakes

```javascript
// ❌ MISTAKE 1: Forgetting await
const user = fetchUser(1);  // Returns Promise, not user!
console.log(user.name);     // ERROR: Promise has no name property

// ✅ CORRECT:
const user = await fetchUser(1);
console.log(user.name);

// ❌ MISTAKE 2: Async functions without try/catch
const getData = async () => {
    const data = await fetch('/api/data');  // If this fails, crashes
};

// ✅ CORRECT:
const getData = async () => {
    try {
        const data = await fetch('/api/data');
        return data;
    } catch (error) {
        console.error(error);
    }
};

// ❌ MISTAKE 3: Sequential when parallel is better
const user = await fetchUser(1);
const posts = await fetchPosts(user.id);
const comments = await fetchComments(posts[0].id);

// ✅ BETTER (if independent):
const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
]);
```

### Mini-Project: Weather App

```javascript
// Fetch weather data for a city
const getWeather = async (city) => {
    try {
        // Using Open-Meteo API (free, no key needed)
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await response.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }
        
        const { latitude, longitude, name } = geoData.results[0];
        
        // Get weather for that location
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
        );
        const weatherData = await weatherResponse.json();
        
        return {
            city: name,
            temperature: weatherData.current.temperature_2m,
            condition: weatherData.current.weather_code
        };
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
};

// Use it
const weather = await getWeather("New York");
console.log(weather);
// { city: "New York", temperature: 22.5, condition: 0 }
```

---

# 🔷 WEEK 4: TYPESCRIPT FUNDAMENTALS

## Day 1-2: Basic Types

### What is TypeScript?

TypeScript = **JavaScript + Types**

Types answer: "What **kind** of value is this?"

```javascript
// JavaScript (no types)
const add = (a, b) => a + b;
add(5, 3);              // ✅ Works: 8
add("5", "3");          // ✅ Works: "53" (concatenation!)
add(true, false);       // ✅ Works: 1 (weird!)

// TypeScript (with types)
const add = (a: number, b: number): number => a + b;
add(5, 3);              // ✅ Works: 8
add("5", "3");          // ❌ ERROR: strings not allowed!
add(true, false);       // ❌ ERROR: booleans not allowed!
```

**Benefits**:
- Catch bugs **before** running code
- Code becomes self-documenting
- Better IDE autocomplete

### Primitive Types

```typescript
// String
const name: string = "John";
name = "Jane";  // ✅
name = 123;     // ❌ ERROR

// Number (includes integers and decimals)
const age: number = 25;
const pi: number = 3.14;
const negative: number = -10;

// Boolean
const isActive: boolean = true;
const isVisible: boolean = false;

// Null & Undefined
const empty: null = null;
const notSet: undefined = undefined;

// Any (escape hatch - avoid!)
let anything: any = "could be anything";
anything = 123;      // OK
anything = true;     // OK
anything.foo();      // No error even if foo doesn't exist!
// ⚠️ Using any defeats purpose of TypeScript
```

### Union Types: "This OR That"

```typescript
// Function that accepts string OR number
const getId = (id: string | number): void => {
    console.log(`ID: ${id}`);
};

getId("ABC123");    // ✅ String
getId(456);         // ✅ Number
getId(true);        // ❌ ERROR: boolean not in union

// Variable with union type
let value: string | number;
value = "text";     // ✅
value = 42;         // ✅
value = true;       // ❌ ERROR

// More complex union
type Status = "pending" | "success" | "error";
let status: Status = "pending";
status = "success";     // ✅
status = "failed";      // ❌ ERROR: not in list
```

### Arrays with Types

```typescript
// Array of strings
const colors: string[] = ["red", "green", "blue"];
colors.push("yellow");  // ✅
colors.push(123);       // ❌ ERROR

// Alternative syntax
const numbers: Array<number> = [1, 2, 3];

// Array of union type
const mixed: (string | number)[] = ["text", 1, "more", 2];

// Array of objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
];

// Read-only array
const fixed: readonly string[] = ["a", "b"];
fixed.push("c");  // ❌ ERROR: can't modify
```

### Tuples: Fixed-Length Arrays

```typescript
// Tuple: specific length and types
type Point = [number, number];
const coordinate: Point = [10, 20];

const [x, y] = coordinate;
console.log(x);  // 10 (number)
console.log(y);  // 20 (number)

// Tuple with names
type Response = [status: number, message: string];
const response: Response = [200, "Success"];

// Optional elements in tuple
type FlexibleTuple = [string, number?];
const t1: FlexibleTuple = ["hello"];       // ✅ number optional
const t2: FlexibleTuple = ["hello", 42];   // ✅

// Rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
const tuple: StringNumberBooleans = ["a", 1, true, false, true];
```

### Type Aliases vs Interfaces

```typescript
// Type Alias (more flexible)
type User = {
    id: number;
    name: string;
    email: string;
};

// Interface (for objects, more object-oriented)
interface User {
    id: number;
    name: string;
    email: string;
}

// Both work the same for simple objects
const user: User = {
    id: 1,
    name: "John",
    email: "john@example.com"
};

// Key difference: Interfaces can extend/merge
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

const dog: Dog = {
    name: "Buddy",
    breed: "Golden Retriever"
};

// Type uses &
type Animal = { name: string };
type Dog = Animal & { breed: string };
```

### Exercise 6: Convert JS Calculator to TypeScript

```typescript
// Function with types
const calculateInterest = (
    principal: number,
    rate: number,
    years: number
): number => {
    return (principal * rate * years) / 100;
};

const interest = calculateInterest(1000, 5, 2);
console.log(interest);  // 100

// Wrong usage caught by TypeScript
calculateInterest("1000", 5, 2);  // ❌ ERROR: string not allowed
calculateInterest(1000, "5", 2);  // ❌ ERROR

// Array of transactions
interface Transaction {
    id: number;
    amount: number;
    type: "deposit" | "withdrawal";
}

const transactions: Transaction[] = [
    { id: 1, amount: 100, type: "deposit" },
    { id: 2, amount: 50, type: "withdrawal" },
    { id: 3, amount: 200, type: "deposit" }
];

// Total using reduce
const total = transactions.reduce((sum, trans) => {
    const change = trans.type === "deposit" ? trans.amount : -trans.amount;
    return sum + change;
}, 0);

console.log(total);  // 250
```

---

## Day 3-4: Objects & Interfaces

### Interfaces: Contracts for Objects

An interface is a **blueprint** that defines what properties and methods an object must have.

```typescript
// Define what a User looks like
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;           // Optional (? means maybe)
    readonly createdAt: Date; // Read-only
}

// Any object matching this interface works
const user1: User = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 25,
    createdAt: new Date()
};

// Missing age is OK (it's optional)
const user2: User = {
    id: 2,
    name: "Jane",
    email: "jane@example.com",
    createdAt: new Date()
};

// Missing required field = ERROR
const user3: User = {
    id: 3,
    name: "Bob"
    // ❌ ERROR: missing email and createdAt
};

// Modifying readonly field = ERROR
user1.createdAt = new Date();  // ❌ Can't reassign
user1.createdAt.setFullYear(2020);  // ⚠️ Can modify the object itself
```

### Extending Interfaces

```typescript
// Base interface
interface User {
    id: number;
    name: string;
    email: string;
}

// Extend to create new interface
interface Admin extends User {
    permissions: string[];
    role: "admin";
}

// Admin must have all User properties + new ones
const admin: Admin = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    permissions: ["read", "write", "delete"],
    role: "admin"
};

// Multiple inheritance
interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

interface UserWithTime extends User, Timestamped {
    // Combines both interfaces
}

const fullUser: UserWithTime = {
    id: 1,
    name: "John",
    email: "john@example.com",
    createdAt: new Date(),
    updatedAt: new Date()
};
```

### Function Interfaces

```typescript
// Define what a function looks like
interface Greeter {
    (name: string): string;  // Takes string, returns string
}

const greet: Greeter = (name) => `Hello, ${name}!`;
console.log(greet("Alice"));  // "Hello, Alice!"

// More complex
interface Validator {
    (value: any): boolean;
}

const isEmail: Validator = (value) => {
    return typeof value === "string" && value.includes("@");
};

console.log(isEmail("john@example.com"));  // true
console.log(isEmail("invalid"));           // false
```

### Exercise 7: Build User Management System

```typescript
// Define User interface
interface User {
    id: number;
    username: string;
    email: string;
    role: "user" | "admin" | "moderator";
    isActive: boolean;
}

// Define Admin extending User
interface AdminUser extends User {
    permissions: string[];
    lastLogin: Date;
}

// Function to validate user
interface UserValidator {
    (user: Partial<User>): boolean;
}

const validateUser: UserValidator = (user) => {
    if (!user.username || user.username.length < 3) return false;
    if (!user.email || !user.email.includes("@")) return false;
    return true;
};

// User repository
interface UserRepository {
    users: User[];
    addUser(user: User): void;
    getUser(id: number): User | undefined;
    getAllUsers(): User[];
    deleteUser(id: number): boolean;
}

// Create sample users
const users: User[] = [
    {
        id: 1,
        username: "john_doe",
        email: "john@example.com",
        role: "user",
        isActive: true
    },
    {
        id: 2,
        username: "admin_alice",
        email: "alice@example.com",
        role: "admin",
        isActive: true
    }
];

// Helper functions
const getActiveUsers = (users: User[]): User[] => {
    return users.filter(u => u.isActive);
};

const getUsersByRole = (users: User[], role: User["role"]): User[] => {
    return users.filter(u => u.role === role);
};

console.log(getActiveUsers(users));      // All active users
console.log(getUsersByRole(users, "admin"));  // Admin users
```

---

## Day 5: Generics & Advanced Types

### Generics: Reusable Components

Generics are like **function parameters, but for types**. They let you write code once and use it with many types.

```typescript
// Without generics (bad - too specific)
function getFirstString(array: string[]): string {
    return array[0];
}

function getFirstNumber(array: number[]): number {
    return array[0];
}

function getFirstBoolean(array: boolean[]): boolean {
    return array[0];
}

// With generics (good - one function for all types)
function getFirst<T>(array: T[]): T {
    return array[0];
}

// TypeScript infers the type
const firstColor = getFirst(["red", "green"]);        // string
const firstNumber = getFirst([1, 2, 3]);              // number
const firstBool = getFirst([true, false]);            // boolean

// Or explicitly specify
const firstColor2 = getFirst<string>(["red", "green"]);
```

**Real-world example: API response wrapper**

```typescript
// Generic Response wrapper
interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
    timestamp: Date;
}

// Use with different types
interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
}

// Same interface, different data types
const userResponse: ApiResponse<User> = {
    status: 200,
    message: "Success",
    data: { id: 1, name: "John" },
    timestamp: new Date()
};

const postResponse: ApiResponse<Post> = {
    status: 200,
    message: "Success",
    data: { id: 1, title: "TypeScript", content: "..." },
    timestamp: new Date()
};

// Generic function to handle responses
const handleResponse = <T>(response: ApiResponse<T>): T => {
    if (response.status !== 200) {
        throw new Error(response.message);
    }
    return response.data;
};

const user = handleResponse(userResponse);   // Returns User
const post = handleResponse(postResponse);   // Returns Post
```

### Constraints: "T must be..."

```typescript
// Generic with constraint
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

getLength("hello");        // ✅ string has length
getLength([1, 2, 3]);      // ✅ array has length
getLength(123);            // ❌ ERROR: number has no length

// Constraint to interface
interface HasId {
    id: number;
}

function printId<T extends HasId>(item: T): void {
    console.log(item.id);
}

printId({ id: 1, name: "John" });      // ✅ has id
printId({ name: "John" });             // ❌ ERROR: no id

// Generic with multiple types
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge(
    { name: "John" },
    { age: 25 }
);
// Result: { name: "John", age: 25 }
```

### Utility Types: Pre-Built Generics

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

// Readonly<T>: Make all properties readonly
type ReadonlyUser = Readonly<User>;
const user: ReadonlyUser = { id: 1, name: "John", email: "john@example.com", age: 25 };
user.name = "Jane";  // ❌ ERROR: readonly

// Partial<T>: All properties optional
type UpdateUser = Partial<User>;
const update: UpdateUser = { name: "Jane" };  // ✅ OK, only name

// Required<T>: All properties mandatory
type FullUser = Required<User>;
// No optional properties allowed

// Pick<T, K>: Select specific properties
type UserPreview = Pick<User, "name" | "email">;
const preview: UserPreview = {
    name: "John",
    email: "john@example.com"
    // Missing id and age - that's OK!
};

// Omit<T, K>: Exclude specific properties
type UserWithoutAge = Omit<User, "age">;
const userNoAge: UserWithoutAge = {
    id: 1,
    name: "John",
    email: "john@example.com"
    // age not allowed
};

// Record<K, T>: Object with specific keys
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;
const perms: Permissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

// Exclude<T, U>: Exclude types from union
type AllTypes = string | number | boolean;
type WithoutString = Exclude<AllTypes, string>;  // number | boolean

// keyof: Get all keys as union
type UserKeys = keyof User;  // "id" | "name" | "email" | "age"
```

### Generic Arrays & Collections

```typescript
// Generic Repository pattern
interface Repository<T> {
    items: T[];
    add(item: T): void;
    getById(id: number): T | undefined;
    getAll(): T[];
    delete(id: number): boolean;
}

interface Post {
    id: number;
    title: string;
}

// Implementation
class PostRepository implements Repository<Post> {
    items: Post[] = [];

    add(item: Post): void {
        this.items.push(item);
    }

    getById(id: number): Post | undefined {
        return this.items.find(item => item.id === id);
    }

    getAll(): Post[] {
        return [...this.items];
    }

    delete(id: number): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) return false;
        this.items.splice(index, 1);
        return true;
    }
}

// Use it
const postRepo = new PostRepository();
postRepo.add({ id: 1, title: "TypeScript" });
postRepo.add({ id: 2, title: "Generics" });

console.log(postRepo.getAll());
console.log(postRepo.getById(1));
```

---

## Day 6-7: Async TypeScript & Advanced Patterns

### Typing Async Functions

```typescript
// Function that returns Promise
async function fetchUser(userId: number): Promise<User> {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("User not found");
    return response.json() as Promise<User>;
}

// Calling it
const user: User = await fetchUser(1);

// Function returning Promise (without async)
function fetchPost(id: number): Promise<Post> {
    return fetch(`/api/posts/${id}`).then(r => r.json());
}

// Error handling with types
interface ApiError {
    message: string;
    code: string;
}

async function safePost(id: number): Promise<Post | ApiError> {
    try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
            return {
                message: "Not found",
                code: "NOT_FOUND"
            };
        }
        return response.json();
    } catch (error) {
        return {
            message: error instanceof Error ? error.message : "Unknown error",
            code: "ERROR"
        };
    }
}

// Using discriminated unions
type Result<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

async function getUser(id: number): Promise<Result<User>> {
    try {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();
        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: "Failed to fetch user" };
    }
}

// Using it
const result = await getUser(1);
if (result.success) {
    console.log(result.data.name);  // TypeScript knows it's User
} else {
    console.log(result.error);      // TypeScript knows it's string
}
```

### Advanced Type Patterns

```typescript
// Type Guards: Narrow type in conditionals
function isUser(obj: any): obj is User {
    return (
        typeof obj === "object" &&
        typeof obj.id === "number" &&
        typeof obj.name === "string"
    );
}

const data: any = { id: 1, name: "John" };
if (isUser(data)) {
    console.log(data.name);  // TypeScript knows it's User
}

// Conditional types
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">;   // true
type B = IsString<number>;    // false

// Mapped types: Transform object properties
type Getters<T> = {
    [K in keyof T]: () => T[K]
};

type UserGetters = Getters<User>;
// Result:
// {
//     id: () => number;
//     name: () => string;
//     email: () => string;
// }

// Self-documenting types
type Timestamp = string & { readonly __brand: "Timestamp" };
type UserId = number & { readonly __brand: "UserId" };

function getUserById(id: UserId): User | null {
    // Only accepts UserId, not just any number
    return null;
}
```

### Classes in TypeScript

```typescript
// Class with type annotations
class UserService {
    private users: User[] = [];
    private nextId: number = 1;

    // Constructor
    constructor(initialUsers: User[] = []) {
        this.users = initialUsers;
    }

    // Public method
    addUser(name: string, email: string): User {
        const user: User = {
            id: this.nextId++,
            username: name,
            email,
            role: "user",
            isActive: true
        };
        this.users.push(user);
        return user;
    }

    // Private method
    private findUserById(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }

    // Get user
    getUser(id: number): User | undefined {
        return this.findUserById(id);
    }

    // Get all
    getAllUsers(): readonly User[] {
        return this.users;
    }
}

// Using class
const service = new UserService();
service.addUser("John", "john@example.com");
console.log(service.getAllUsers());

// service.findUserById(1);  // ❌ ERROR: private method
```

### Exercise 8: Complete TypeScript Project

```typescript
// Define all types
interface Todo {
    id: number;
    title: string;
    completed: boolean;
    dueDate?: Date;
    priority: "low" | "medium" | "high";
}

interface TodoFilter {
    completed?: boolean;
    priority?: Todo["priority"];
}

// Service class
class TodoService {
    private todos: Todo[] = [];
    private nextId = 1;

    addTodo(title: string, priority: Todo["priority"] = "medium"): Todo {
        const todo: Todo = {
            id: this.nextId++,
            title,
            completed: false,
            priority
        };
        this.todos.push(todo);
        return todo;
    }

    completeTodo(id: number): boolean {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return false;
        todo.completed = true;
        return true;
    }

    getTodos(filter?: TodoFilter): Todo[] {
        return this.todos.filter(todo => {
            if (filter?.completed !== undefined && todo.completed !== filter.completed) {
                return false;
            }
            if (filter?.priority && todo.priority !== filter.priority) {
                return false;
            }
            return true;
        });
    }

    getStats(): { total: number; completed: number; percentage: number } {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        return {
            total,
            completed,
            percentage: total === 0 ? 0 : Math.round((completed / total) * 100)
        };
    }
}

// Using the service
const todos = new TodoService();
todos.addTodo("Learn TypeScript", "high");
todos.addTodo("Build project", "high");
todos.addTodo("Write tests", "medium");

console.log(todos.getTodos());  // All todos
console.log(todos.getTodos({ priority: "high" }));  // High priority
console.log(todos.getStats());  // { total: 3, completed: 0, percentage: 0 }

todos.completeTodo(1);
console.log(todos.getStats());  // { total: 3, completed: 1, percentage: 33 }
```

---

## 📚 Week 3-4 Checklist

### Week 3: JavaScript Fundamentals
- [ ] Day 1-2: Variables, data types, operators work correctly
- [ ] Day 3: Created multiple functions with closures
- [ ] Day 4-5: Manipulated arrays and objects with confidence
- [ ] Day 6: Built form validator with error handling
- [ ] Day 7: Fetched data from real API and handled promises
- [ ] Mini-projects: Calculator, Temperature converter, Weather app working

### Week 4: TypeScript Basics
- [ ] Day 1-2: Understand all primitive types and unions
- [ ] Day 3-4: Created interfaces and extended them properly
- [ ] Day 5: Used generics effectively in functions and classes
- [ ] Day 6-7: Async functions typed correctly, advanced patterns understood
- [ ] All exercises converted to TypeScript successfully
- [ ] Can explain "Why TypeScript?" in interview

---

## 🎯 Key Takeaways

**Week 3**: JavaScript gives you power. Master **functions**, **arrays**, and **async patterns** - these are 80% of real JavaScript.

**Week 4**: TypeScript gives you safety. It catches bugs **before** they happen and makes your code self-documenting.

---

**Next**: [WEEK-05-06-REACT-NEXTJS.md](./WEEK-05-06-REACT-NEXTJS.md) - Building UIs with React