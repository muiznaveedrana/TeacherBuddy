# Unified Project Structure

```plaintext
worksheetgenerator-ai/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml            # Test and lint on PR
│       └── deploy.yaml        # Deploy to Vercel on merge
├── app/                       # Next.js App Router
│   ├── (auth)/               # Auth route group
│   │   └── login/
│   │       └── page.tsx      # OAuth callback handler
│   ├── (dashboard)/          # Protected route group
│   │   ├── layout.tsx        # Dashboard layout with nav
│   │   ├── page.tsx          # Main worksheet generation interface
│   │   ├── profile/
│   │   │   └── page.tsx      # User profile management
│   │   ├── namelists/
│   │   │   └── page.tsx      # Name list management
│   │   └── subscription/
│   │       └── page.tsx      # Billing and usage management
│   ├── api/                  # Serverless API endpoints
│   │   ├── auth/
│   │   ├── worksheets/
│   │   ├── profile/
│   │   ├── usage/
│   │   ├── namelists/
│   │   ├── subscription/
│   │   └── webhooks/
│   ├── globals.css           # Tailwind CSS imports
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── not-found.tsx         # 404 page
├── components/               # Reusable UI components
│   ├── ui/                   # shadcn/ui base components
│   ├── auth/                 # Authentication components
│   ├── worksheet/            # Core generation features
│   ├── subscription/         # Billing and usage
│   ├── namelists/           # Name management
│   ├── ads/                 # Advertisement components
│   └── layout/              # Layout components
├── lib/                     # Shared utilities
│   ├── supabase/           # Supabase configuration
│   ├── services/           # Business logic services
│   ├── repositories/       # Data access layer
│   ├── stores/             # State management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── curriculum/         # Curriculum data
├── public/                 # Static assets
├── supabase/               # Database schema and migrations
├── tests/                  # Test files
├── .env.example            # Environment variables template
├── .env.local              # Local development environment
├── components.json         # shadcn/ui configuration
├── middleware.ts           # Next.js middleware for auth
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vercel.json             # Vercel deployment settings
└── README.md               # Project documentation
```