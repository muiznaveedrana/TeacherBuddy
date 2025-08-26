# Data Models

## User

**Purpose:** Represents UK primary school teachers using the platform for worksheet generation

**Key Attributes:**
- id: UUID - Unique identifier from Supabase Auth
- email: string - Gmail address from Google OAuth
- created_at: timestamp - Account creation date
- updated_at: timestamp - Last profile update

### TypeScript Interface
```typescript
interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}
```

### Relationships
- Has one UserProfile
- Has many WorksheetGenerations
- Has many NameLists
- Has one Subscription

## UserProfile

**Purpose:** Stores curriculum-specific information and preferences for generating appropriate worksheets

**Key Attributes:**
- user_id: UUID - Foreign key to User
- country: string - Default "England" 
- curriculum: string - "UK National Curriculum"
- year_group: string - Reception through Year 6
- last_topic: string - Persisted configuration
- last_subtopic: string - Persisted configuration
- last_difficulty: string - Easy/Average/Hard
- last_question_count: number - 5-30 questions
- last_name_list_id: UUID - Reference to selected name list

### TypeScript Interface
```typescript
interface UserProfile {
  user_id: string;
  country: string;
  curriculum: string;
  year_group: string;
  last_topic?: string;
  last_subtopic?: string;
  last_difficulty?: 'Easy' | 'Average' | 'Hard';
  last_question_count?: number;
  last_name_list_id?: string;
  created_at: string;
  updated_at: string;
}
```

### Relationships
- Belongs to User
- References NameList for last_name_list_id

## WorksheetGeneration

**Purpose:** Tracks each worksheet creation for usage limits, analytics, and user history

**Key Attributes:**
- id: UUID - Unique generation identifier
- user_id: UUID - Foreign key to User
- topic: string - Math curriculum topic
- subtopic: string - Specific learning objective
- difficulty: string - Easy/Average/Hard
- question_count: number - Number of questions generated
- name_list_id: UUID - Names used in worksheet
- pdf_url: string - Supabase Storage URL
- generated_at: timestamp - Creation time
- processing_time_ms: number - Performance tracking

### TypeScript Interface
```typescript
interface WorksheetGeneration {
  id: string;
  user_id: string;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Average' | 'Hard';
  question_count: number;
  name_list_id?: string;
  pdf_url?: string;
  generated_at: string;
  processing_time_ms?: number;
}
```

### Relationships
- Belongs to User
- References NameList
- Tracked by UsageCounter

## NameList

**Purpose:** Stores student name collections for personalized worksheet question generation

**Key Attributes:**
- id: UUID - Unique list identifier
- user_id: UUID - Foreign key to User
- name: string - List display name (e.g., "Year 3 Class")
- names: string[] - Array of student names
- is_default: boolean - System-provided default list
- created_at: timestamp - List creation date

### TypeScript Interface
```typescript
interface NameList {
  id: string;
  user_id: string;
  name: string;
  names: string[];
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
```

### Relationships
- Belongs to User
- Used by WorksheetGenerations
- Referenced by UserProfile for persistence

## Subscription

**Purpose:** Manages Free/Pro/Pro Plus tier status and Stripe integration for payment processing

**Key Attributes:**
- id: UUID - Unique subscription identifier
- user_id: UUID - Foreign key to User
- tier: string - Free/Pro/Pro Plus
- stripe_customer_id: string - Stripe customer reference
- stripe_subscription_id: string - Active subscription reference
- status: string - Active/Canceled/Past Due
- current_period_start: timestamp - Billing period start
- current_period_end: timestamp - Billing period end
- monthly_limit: number - Worksheet generation limit

### TypeScript Interface
```typescript
interface Subscription {
  id: string;
  user_id: string;
  tier: 'Free' | 'Pro' | 'Pro Plus';
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  status: 'Active' | 'Canceled' | 'Past Due' | 'Incomplete';
  current_period_start: string;
  current_period_end: string;
  monthly_limit: number;
  created_at: string;
  updated_at: string;
}
```

### Relationships
- Belongs to User
- Determines UsageCounter limits

## UsageCounter

**Purpose:** Tracks monthly and daily worksheet generation counts for tier limit enforcement

**Key Attributes:**
- id: UUID - Unique counter identifier
- user_id: UUID - Foreign key to User
- month_year: string - "2024-01" format for partitioning
- monthly_count: number - Current month generations
- daily_count: number - Current day generations
- last_generation_date: date - For daily counter reset
- last_reset_date: date - Monthly counter tracking

### TypeScript Interface
```typescript
interface UsageCounter {
  id: string;
  user_id: string;
  month_year: string;
  monthly_count: number;
  daily_count: number;
  last_generation_date: string;
  last_reset_date: string;
  updated_at: string;
}
```

### Relationships
- Belongs to User
- Incremented by WorksheetGeneration
- Checked against Subscription limits