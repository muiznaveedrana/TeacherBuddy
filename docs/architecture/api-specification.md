# API Specification

Based on the REST API style from the Tech Stack, here's the comprehensive API specification for WorksheetGenerator.AI:

```yaml
openapi: 3.0.0
info:
  title: WorksheetGenerator.AI API
  version: 1.0.0
  description: REST API for AI-powered UK curriculum worksheet generation platform
servers:
  - url: https://worksheetgenerator.vercel.app/api
    description: Production API server

paths:
  /auth/callback:
    get:
      summary: Google OAuth callback handler
      description: Handles Google OAuth redirect and creates user session
      parameters:
        - name: code
          in: query
          required: true
          schema:
            type: string
          description: OAuth authorization code
      responses:
        '302':
          description: Redirect to dashboard or profile setup
        '400':
          description: OAuth error

  /profile:
    get:
      summary: Get user profile
      security:
        - bearerAuth: []
      responses:
        '200':
          description: User profile data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
    
    post:
      summary: Create or update user profile
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserProfileInput'
      responses:
        '200':
          description: Profile updated successfully
        '201':
          description: Profile created successfully

  /worksheets/generate:
    post:
      summary: Generate new worksheet
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/WorksheetGenerationRequest'
      responses:
        '200':
          description: Worksheet generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WorksheetGenerationResponse'
        '429':
          description: Usage limit exceeded
        '500':
          description: Generation failed

  /worksheets/{id}/download:
    get:
      summary: Download worksheet PDF
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
          description: Worksheet generation ID
      responses:
        '200':
          description: PDF file
          content:
            application/pdf:
              schema:
                type: string
                format: binary

  /usage:
    get:
      summary: Get current usage statistics
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Usage counter data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UsageStats'

# [Additional endpoints and schemas follow similar pattern...]
```

*[This file contains the truncated API specification. Full OpenAPI specification would include all endpoints, schemas, and error responses as defined in the original architecture document.]*