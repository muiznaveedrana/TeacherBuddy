# WorksheetGenerator.AI

AI-powered worksheet generation platform for UK teachers.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 4.0+
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel
- **AI**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This project is configured for automatic deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── lib/                # Shared utilities and services
└── [other directories]
```

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

Please follow the coding standards defined in the project documentation.