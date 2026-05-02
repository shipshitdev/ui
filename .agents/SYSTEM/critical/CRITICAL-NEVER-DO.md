# CRITICAL: Never Do This

**Purpose:** Quick reference for violations that break builds, lose data, or violate architecture.
**Read this FIRST before making ANY changes.**
**Last Updated:** 2025-12-23

---

## File Management

### Never Delete Required Files

These files MUST exist at project root:

- `AGENTS.md`
- `CLAUDE.md`
- `CODEX.md`
- `README.md`

### Never Create Root-Level .md Files

Only these 4 `.md` files allowed at project root:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `CODEX.md`
4. `README.md`

Everything else goes in `.agents/`.

---

## Session Files

### One File Per Day

**Correct:**

```
.agents/SESSIONS/2025-01-15.md
```

**Wrong:**

```
.agents/SESSIONS/2025-01-15-feature.md  ❌
.agents/SESSIONS/FEATURE-2025-01-15.md  ❌
```

Multiple sessions same day → Same file, Session 1, Session 2, etc.

---

## Git

### Never Commit Without Approval

- Don't run `git commit` unless explicitly asked
- Don't run `git push` unless explicitly asked
- Make changes, show diff, wait for approval

### Never Force Push to Main

- No `git push --force` to main/master
- No `git reset --hard` on shared branches

---

## Coding

### Never Use `any` Type

```typescript
// Wrong
function process(data: any) {}

// Correct
function process(data: UserData) {}
```

### Never Skip Error Handling

```typescript
// Wrong
const result = await operation();

// Correct
try {
  const result = await operation();
} catch (error) {
  logger.error('Operation failed', error);
  throw error;
}
```

### Never Use console.log

Use a logging service instead.

---

## Project-Specific Rules: UI Component Library

### Never Use Inline Styles

```typescript
// WRONG - Never do this
<button style={{ backgroundColor: 'blue' }}>Click</button>

// CORRECT - Use Tailwind classes
<button className="bg-blue-500">Click</button>
```

### Never Export Without Types

```typescript
// WRONG - Missing type export
export { Button } from './Button';

// CORRECT - Export component AND types
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

### Never Skip Accessibility

```typescript
// WRONG - Missing accessibility
<div onClick={handleClick}>Click me</div>

// CORRECT - Proper semantics and a11y
<button onClick={handleClick} aria-label="Perform action">
  Click me
</button>
```

### Never Hardcode Colors

```typescript
// WRONG - Hardcoded colors
className = 'text-#0ea5e9';
className = 'bg-[#f0f9ff]';

// CORRECT - Use design tokens via Tailwind
className = 'text-primary-500';
className = 'bg-primary-50';
```

### Never Create Components Without Stories

Every component MUST have a corresponding `.stories.tsx` file.
No exceptions.

### Never Modify Component Props Without Migration Guide

If changing a component's API:

1. Create an ADR in `SYSTEM/architecture/DECISIONS.md`
2. Document breaking changes
3. Provide migration examples

### Never Use CSS Modules or styled-components

This library uses Tailwind CSS exclusively.
Do not introduce alternative styling solutions.

### Never Skip Keyboard Navigation

All interactive components MUST support:

- Tab navigation
- Enter/Space activation
- Escape to close (for modals/dropdowns)
- Arrow keys (for lists/menus)

---

## Pre-Code Checklist

Before writing ANY code:

- [ ] Read this file
- [ ] Check `../RULES.md` for patterns
- [ ] Search for similar implementations
- [ ] Understand existing code before modifying

---

## If You Violate These Rules

1. **Acknowledge** - Don't hide it
2. **Fix properly** - No workarounds
3. **Document** - Add to session file
4. **Learn** - Update this file if needed

---

**5 minutes reading this = hours saved debugging later.**
