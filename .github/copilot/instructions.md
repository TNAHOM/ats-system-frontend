## 1. Architecture Overview

This project uses:

- Next.js 16+
- TypeScript
- App Router
- React Query (no SWR)
- Axios wrapper (`lib/api.ts`)
- Centralized endpoint registry (`lib/endpoints.ts`)
- Global Auth system with AuthGuard
- Tailwind CSS
- Zod for validation (recommended)
- ESLint + Prettier
- GitHub Actions CI/CD

All AI-generated code must comply fully with this architecture.

---

## 2. Required Folder Structure

```
app/
components/
    ui/
    shared/
hooks/
lib/
    api.ts
    endpoints.ts
    auth.ts
types/
utils/
styles/
```

Rules:

- Never generate `pages/api` — no backend logic exists here.
- All data fetching must go through React Query + `api.ts`.
- All API route strings must come from `endpoints.ts`.
- Components must be modular and reusable.

---

## 3. API Rules

### 3.1. All Network Requests Must Use `api.ts`

Never use `fetch()` directly.

Correct pattern:

```ts
import { api } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

const res = await api.get(ENDPOINTS.user.profile);
```

### 3.2. Never Hardcode URLs

Only use endpoint keys from `endpoints.ts`.

Example structure:

```ts
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },
  user: {
    profile: "/user/profile",
  },
} as const;
```

### 3.3. Axios Responsibilities

`api.ts` must:

- Attach auth tokens
- Handle refresh logic (if implemented)
- Redirect on unauthorized
- Return typed responses
- Encapsulate all error handling

AI must interact with API only through this wrapper.

---

## 4. React Query Rules

- React Query is the only allowed data-fetch library.
- Always use stable `queryKey` arrays.
- Never manually fetch in components using raw `fetch`.
- Mutations must always invalidate relevant query keys.

Example:

```ts
useQuery({
  queryKey: ["user", "profile"],
  queryFn: () => api.get(ENDPOINTS.user.profile).then((r) => r.data),
});
```

Mutation example:

```ts
useMutation({
  mutationFn: (data) => api.post(ENDPOINTS.user.update, data),
  onSuccess: () => queryClient.invalidateQueries(["user", "profile"]),
});
```

---

## 5. Auth & Protected Routes

- Auth state must be stored only in global context.
- No direct token manipulation inside components.
- Protected pages must wrap content in `<AuthGuard>`.

Correct usage:

```tsx
<AuthGuard>
  <DashboardPage />
</AuthGuard>
```

AI must never bypass this pattern.

---

## 6. Styling & Theming Rules

### 6.1. Global Theme & Colors

- **Strictly** use the CSS variables defined in `app/globals.css`.
- **Never** hardcode hex values (e.g., `#ffffff`, `#000000`).
- Use the `@theme inline` definitions from `globals.css`.

**Required Variables:**

- `var(--background)` / `var(--foreground)`
- `var(--primary)` / `var(--primary-foreground)`
- `var(--secondary)` / `var(--secondary-foreground)`
- `var(--accent)` / `var(--accent-foreground)`
- `var(--muted)` / `var(--muted-foreground)`
- `var(--card)` / `var(--card-foreground)`
- `var(--border)`
- `var(--destructive)`

### 6.2. Component Styling

- **Strictly** use Tailwind CSS utility classes for all styling.
- Do not create separate `.css` or `.module.css` files for components.
- Use the semantic colors defined in `globals.css` via Tailwind classes (e.g., `bg-sidebar`, `text-sidebar-foreground`).
- Avoid using `style={{ ... }}` props unless absolutely necessary for dynamic values.

**Example:**

```tsx
<div className="bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen w-[250px]">
  {/* content */}
</div>
```

### 6.3. Tailwind Usage

- All styling must use Tailwind CSS utility classes where possible.
- Use semantic names mapped in `globals.css` (e.g., `bg-background`, `text-primary`).
- No inline styles except for dynamic values.
- Shared components belong in `components/ui/`.

Example:

```tsx
<button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-accent">
  Save
</button>
```

AI must generate optimized, utility-first Tailwind classes using the global theme.

---

## 7. Component Standards & Server/Client Usage

### 7.1. Server Components (Default)

- All components in `app/` are Server Components by default.
- **Do NOT** add `'use server'` to the top of component files.
- Use Server Components for:
  - Fetching data (via React Query prefetching or direct DB calls if applicable, though this project prefers API).
  - Accessing backend resources directly.
  - Keeping sensitive information on the server.
  - Reducing client-side JavaScript bundle size.

### 7.2. Client Components (`'use client'`)

- Add `'use client'` at the very top of the file.
- Use Client Components **only** when:
  - Using event listeners (`onClick`, `onChange`, etc.).
  - Using React Hooks (`useState`, `useEffect`, `useReducer`).
  - Using browser-only APIs (`window`, `document`, `localStorage`).
  - Using custom hooks that depend on state or effects.
  - Using React Class components.
- **Optimization:** Move the "Client" part to the leaves of the component tree. Pass Server Components as `children` to Client Components to avoid de-optimizing the tree.

### 7.3. Server Actions (`'use server'`)

- Use `'use server'` **only** for Server Actions (async functions called from Client Components).
- Define Server Actions in separate files (e.g., `lib/actions.ts`) or inside Server Components.
- Do not use `'use server'` for data fetching components.

### 7.4. General Standards

- TypeScript only.
- Functional components only.
- Break large components into small reusable ones.
- File names must be kebab-case.

---

## 8. ESLint & Prettier Compliance

AI-generated code must comply with:

- No unused imports
- No implicit `any`
- Consistent return types
- Prettier formatting
- Next.js linting rules

If code violates linting conventions, AI must rewrite it.

---

## 9. Zod Validation Rules

Use Zod schemas for:

- API responses
- Forms
- Query params

Example:

```ts
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});
```

AI must prefer generating strongly typed validated structures.

---

## 10. Security Rules

- No sensitive data in source files
- No storing tokens outside authorized mechanisms
- No exposing backend URLs directly
- No server-only logic in client components
- No unsafe eval or dynamic code generation

---

## 11. GitHub Actions Rules

Workflows must include:

- Install dependencies
- Type-check
- ESLint
- Prettier check
- Build

No deployment steps unless explicitly requested.

---

## 12. AI Behavior Expectations

AI must:

- Suggest modular, maintainable code
- Use existing helpers before creating new ones
- Follow folder structure strictly
- Use React Query for all async state
- Use `api.ts` and `endpoints.ts` properly
- Use Tailwind CSS consistently
- Use TypeScript best practices
- Prefer composition over duplication

AI must not:

- Suggest new libraries unless allowed
- Deviate from existing architecture
- Create logic in random folders
- Mix server-side and client-side state incorrectly
- Generate code that conflicts with React Query rules

---

## 13. Naming Conventions

- Components → `PascalCase`
- Hooks → `useName`
- Files → `kebab-case.ts`
- Zod schemas → `PascalCaseSchema`
- Types → `PascalCase`
- Query keys → array of literals

---

## 14. Documentation Requirements

- Must include examples when generating new utilities
- Comments should be short and descriptive
- AI should explain _why_ recommendations follow best practices

---

## 15. Summary (AI Must Enforce)

- Use React Query only
- Use Axios wrapper only
- Use endpoint registry for all URLs
- Use Tailwind
- Use Zod
- Use AuthGuard for protected routes
- Follow folder structure
- Follow ESLint + Prettier
- Use Server/Client components correctly
- Strongly typed architecture
- No backend logic
- No direct token manipulation

All AI-generated code must obey these rules without exception.

```

---

If you want, I can also generate:

✅ A shorter version optimized for `.editor/copilot.json`
or
✅ A version optimized for GitHub Copilot Chat prompts
or
✅ A version with YAML-style configuration rules

Just tell me: **“generate the other formats too.”**
```
