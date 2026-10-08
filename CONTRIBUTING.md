# Contributing to Humanitarian HRMS

Thank you for your interest in contributing to Humanitarian HRMS! This document provides guidelines and instructions for contributing.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Code Standards](#code-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and constructive in all interactions.

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9 or later
- Git
- A Supabase account (for database-related contributions)

### Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/your-username/ngo-hrms.git
cd ngo-hrms
git remote add upstream https://github.com/original-org/ngo-hrms.git
```

---

## Development Setup

### Install Dependencies

```bash
npm install
```

### Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# (Not required for frontend-only contributions)
```

### Start Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Verify Setup

1. Open the app in your browser
2. Navigate through all pages (Dashboard, Staff, Training, Reports)
3. Verify search and filters work
4. Check that the sidebar navigation is functional

---

## Making Changes

### Branch Naming

Use descriptive branch names:

```
feature/add-leave-management
fix/staff-search-bug
docs/update-api-reference
refactor/simplify-enrollment-logic
```

### Types of Contributions

| Type | Description | Examples |
|---|---|---|
| **Bug Fix** | Fix broken functionality | Search not filtering correctly |
| **Feature** | Add new functionality | Leave management, notifications |
| **Documentation** | Improve or add docs | API reference, setup guide |
| **Refactor** | Improve code quality | Simplify components, improve types |
| **Style** | UI/UX improvements | Better mobile layout, accessibility |
| **Test** | Add or improve tests | Unit tests, integration tests |

---

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Avoid `any` types — use `unknown` and type guards instead
- Use strict mode

```typescript
// Good
interface StaffMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: StaffStatus;
}

// Avoid
const staff: any = { ... }
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use `'use client'` directive only when needed

```typescript
// Good — focused component
function StatusBadge({ status }: { status: string }) {
  const colors = useStatusColor(status);
  return (
    <span className={`px-2 py-1 rounded-full text-xs ${colors}`}>
      {status}
    </span>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system (colors, spacing, typography)
- Avoid custom CSS unless absolutely necessary
- Use the established color palette:
  - Blue (`blue-600`) — Primary actions
  - Emerald (`emerald-600`) — Success states
  - Amber (`amber-600`) — Warnings
  - Red (`red-600`) — Errors and alerts
  - Purple (`purple-600`) — Secondary highlights

### File Naming

- Components: `PascalCase.tsx` (e.g., `StatusBadge.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Pages: `page.tsx` (Next.js convention)
- Layouts: `layout.tsx` (Next.js convention)

### Imports

```typescript
// External libraries first
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Internal components
import { StatusBadge } from '@/components/StatusBadge';
import { StaffTable } from '@/components/StaffTable';

// Utilities and data
import { supabase } from '@/lib/supabase';
import { staff, getDepartmentName } from '@/lib/mockData';

// Types
import type { StaffMember, StaffStatus } from '@/lib/mockData';
```

---

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `chore` | Build process or tooling changes |

### Examples

```
feat(staff): add bulk import functionality
fix(search): correct filter not clearing on department change
docs(readme): update deployment instructions
refactor(dashboard): extract chart components
style(tables): improve mobile responsive layout
```

---

## Pull Request Process

### Before Submitting

1. **Sync with upstream** — Rebase your branch on the latest `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes** — Verify everything works:
   ```bash
   npm run build
   npm run lint
   ```

3. **Check responsiveness** — Test on different screen sizes

4. **Review your code** — Self-review for:
   - Console.log statements removed
   - No hardcoded credentials
   - Proper error handling
   - Consistent styling

### PR Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Style/UI improvement

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] All existing pages still work
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots of visual changes.

## Related Issues
Closes #123
```

### Review Process

1. A maintainer will review your PR within 48 hours
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the release notes

---

## Reporting Issues

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear description of what's wrong.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Node.js version: [e.g., 18.17]
- Screen size: [e.g., 1920x1080]

## Screenshots
If applicable, add screenshots.
```

### Security Issues

For security vulnerabilities, please email security@ngo-hrms.org directly instead of opening a public issue.

---

## Feature Requests

We welcome feature ideas! Use the feature request template:

```markdown
## Feature Description
Clear description of the feature.

## Problem It Solves
What problem does this solve for NGO users?

## Proposed Solution
How should this work?

## Alternatives Considered
Other approaches you've thought about.

## Additional Context
Mockups, references, or examples.
```

---

## Development Tips

### Working with Mock Data

The app uses mock data from `src/lib/mockData.ts` for demo mode. When adding features:

1. Add any new data structures to the mock data
2. Include enough entries to demonstrate the feature
3. Keep data realistic and representative of NGO operations

### Testing with Supabase

For Supabase-related changes:

1. Create a test project on Supabase
2. Run the schema SQL
3. Run the seed SQL
4. Test all CRUD operations
5. Verify RLS policies work correctly

### Performance Considerations

- Use `useMemo` for expensive computations
- Implement proper loading states
- Add error boundaries for fault tolerance
- Optimize images and static assets

---

## Thank You!

Your contributions help humanitarian organizations operate more effectively. Every improvement, no matter how small, makes a difference.

---

**Questions?** Open a discussion on GitHub or reach out to the maintainers.