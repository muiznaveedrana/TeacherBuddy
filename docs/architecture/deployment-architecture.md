# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel Edge Network
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (Next.js build output)
- **CDN/Edge:** Global edge caching with UK/Europe priority regions

**Backend Deployment:**
- **Platform:** Vercel Serverless Functions
- **Build Command:** Automatic API route compilation
- **Deployment Method:** Git-based continuous deployment

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|--------------|-------------|----------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development and testing |
| Staging | https://worksheetgenerator-staging.vercel.app | https://worksheetgenerator-staging.vercel.app/api | Pre-production testing and validation |
| Production | https://worksheetgenerator.ai | https://worksheetgenerator.ai/api | Live environment serving UK teachers |

*[This section would contain detailed deployment strategies, environment configurations, and CI/CD pipeline specifications as defined in the original architecture document.]*