# Frontend Architecture

## Component Architecture

### Component Organization
```
src/
├── components/
│   ├── ui/                     # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dropdown.tsx
│   │   └── progress.tsx
│   ├── auth/                   # Authentication components
│   │   ├── AuthProvider.tsx
│   │   ├── LoginButton.tsx
│   │   └── ProtectedRoute.tsx
│   ├── worksheet/              # Core generation features
│   │   ├── ConfigurationPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── GenerationProgress.tsx
│   │   └── DownloadButton.tsx
│   ├── subscription/           # Billing and usage
│   │   ├── UsageIndicator.tsx
│   │   ├── UpgradePrompt.tsx
│   │   └── SubscriptionManager.tsx
│   ├── namelists/             # Name management
│   │   ├── NameListSelector.tsx
│   │   ├── CreateNameListModal.tsx
│   │   └── NameListManager.tsx
│   └── layout/                # Layout components
│       ├── Navigation.tsx
│       ├── Sidebar.tsx
│       └── AdContainer.tsx
```

### State Management Architecture

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Combined Store
export const useAppStore = create<AuthState & ConfigState & GenerationState & UsageState>()()
  persist(
    (set, get) => ({
      // State implementation
    }),
    {
      name: 'worksheet-generator-store',
      partialize: (state) => ({ 
        // Only persist certain parts
        topic: state.topic,
        subtopic: state.subtopic,
        difficulty: state.difficulty,
        questionCount: state.questionCount
      })
    }
  )
);
```

## Routing Architecture

### Route Organization
```
app/
├── page.tsx                    # Landing page (public)
├── login/
│   └── page.tsx               # OAuth callback handler
├── dashboard/
│   ├── page.tsx               # Main worksheet generation interface
│   ├── profile/
│   │   └── page.tsx          # User profile management
│   ├── namelists/
│   │   └── page.tsx          # Name list management
│   └── subscription/
│       └── page.tsx          # Billing and usage management
├── api/                       # API routes
│   ├── auth/
│   ├── worksheets/
│   ├── usage/
│   └── webhooks/
└── globals.css                # Tailwind CSS imports
```