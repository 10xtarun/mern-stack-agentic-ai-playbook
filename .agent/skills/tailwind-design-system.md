---
name: tailwind-design-system
description: "Build scalable design systems with Tailwind CSS, design tokens, component libraries, and responsive patterns."
risk: unknown
source: community
date_added: "2026-03-02"
---

# Tailwind Design System Implementation Playbook

Build production-ready design systems with Tailwind CSS, including design tokens, component variants, responsive patterns, and accessibility.

## IMPORTANT REVISION FOR THIS PROJECT (MERN Course Static)
You **MUST** strictly adhere to the project's `palette.css` definitions rather than generating arbitrary hex values. The CSS rules provided must be used to define custom properties inside `globals.css` and subsequently inside `tailwind.config.ts`.
- `primary`: uses `--steelblue-100` (`#2b93bf`), `--skyblue-100` (`#80dbff`)
- `destructive`: uses `--firebrick-100` (`#c53637`)
- `secondary / background / borders`: strictly use defined variants spanning `--white-100`, `--whitesmoke-*`, `--gainsboro-*`, `--black-100`, and `--darkslategray-*`.

## When to Use This Skill

- Creating a component library with Tailwind
- Implementing design tokens and theming
- Building responsive and accessible components
- Standardizing UI patterns across a codebase
- Migrating to or extending Tailwind CSS
- Setting up dark mode and color schemes

## Core Concepts

### 1. Design Token Hierarchy

```
Brand Tokens (abstract)
    └── Semantic Tokens (purpose)
        └── Component Tokens (specific)

Example:
    --steelblue-100 → primary → button-bg
```

### 2. Component Architecture

```
Base styles → Variants → Sizes → States → Overrides
```

## Patterns

### Pattern 1: CVA (Class Variance Authority) Components

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

### Pattern 2: Compound Components
Rely on `cn` and standard composition. E.g., `Card`, `CardHeader`, `CardTitle`.

### Pattern 3: Form Components
Always manage interactive states (`aria-invalid`) effectively when configuring inputs and labels.

### Pattern 4: Responsive Grid System
Configure grids using predefined step utilities (`sm:grid-cols-2`, `lg:grid-cols-3`). Use layout boundaries.

## Utility Functions

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Focus ring utility
export const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-ring focus-visible:ring-offset-2'
)

// Disabled utility
export const disabled = 'disabled:pointer-events-none disabled:opacity-50'
```

## Best Practices

### Do's
- **Use CSS variables** - Enable runtime theming
- **Compose with CVA** - Type-safe variants
- **Use semantic colors** - `primary` not randomly injected magic numbers. Ensure alignment with `palette.css`.
- **Forward refs** - Enable composition
- **Add accessibility** - ARIA attributes, focus states

### Don'ts
- **Don't use arbitrary values** - Extend theme instead
- **Don't nest @apply** - Hurts readability
- **Don't skip focus states** - Keyboard users need them
- **Don't hardcode colors** - Use semantic tokens defined at root
- **Don't forget dark mode** - Test both themes

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [CVA Documentation](https://cva.style/docs)
