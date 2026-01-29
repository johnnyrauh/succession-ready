# SuccessionReady

A full-stack web application that helps business owners assess their succession planning readiness through a smart questionnaire, then generates personalized action plans powered by Claude AI.

## Features

- **Smart Questionnaire**: Multi-section assessment covering business fundamentals, ownership structure, and planning status
- **AI-Powered Analysis**: Claude API generates personalized readiness scores and recommendations
- **Action Checklist**: Prioritized action items categorized by urgency (Critical, High Priority, Important, Foundational)
- **Risk Assessment**: Identifies key risks with severity levels and mitigation strategies
- **PDF Export**: Download results for offline review or sharing with advisors
- **Demo Mode**: Pre-fill questionnaire with sample data for testing

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- React Router for navigation
- react-to-print for PDF export

### Backend
- Node.js with Express
- TypeScript
- Anthropic SDK (Claude claude-sonnet-4-20250514)
- express-rate-limit for abuse prevention

## Project Structure

```
succession-ready/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # API utilities
│   │   └── types/          # TypeScript types
│   └── ...config files
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Claude integration
│   │   ├── middleware/     # Rate limiting
│   │   ├── prompts/        # AI prompts
│   │   └── types/          # TypeScript types
│   └── ...config files
└── package.json            # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd succession-ready
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file in the server directory
cp .env.example server/.env

# Edit server/.env and add your Anthropic API key
ANTHROPIC_API_KEY=your_api_key_here
```

### Development

Run both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend at http://localhost:5173
- Backend at http://localhost:3001

### Individual Services

```bash
# Run only frontend
npm run dev:client

# Run only backend
npm run dev:server
```

### Building for Production

```bash
npm run build
```

## API Endpoints

### POST /api/assess

Submits assessment data and returns AI-generated results.

**Request Body:**
```json
{
  "businessFundamentals": {
    "businessType": "llc",
    "industry": "manufacturing",
    "revenueRange": "$5-10M",
    "employeeCount": "51-200",
    "yearsInBusiness": 15,
    "keyPersonDependency": "somewhat"
  },
  "ownershipLeadership": {
    "ownershipStructure": "100-owner",
    "intendedSuccessor": "family-member",
    "currentAge": 58,
    "transitionTimeline": "5-10-years",
    "successorIdentified": true
  },
  "planningStatus": {
    "formalPlan": "informal",
    "businessValuation": "older",
    "estatePlanning": "basic-will",
    "buySellAgreement": false,
    "keyPersonInsurance": false
  }
}
```

**Response:**
```json
{
  "readinessScore": 62,
  "summary": "Your business shows moderate succession readiness...",
  "criticalGaps": ["No formal succession plan", "..."],
  "actionItems": {
    "critical": [...],
    "highPriority": [...],
    "important": [...],
    "foundational": [...]
  },
  "risks": [...],
  "nextSteps": {
    "immediate": [...],
    "shortTerm": [...],
    "longTerm": [...]
  }
}
```

## Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel
2. Set root directory to `client`
3. Add environment variable: `VITE_API_URL=<your-backend-url>`

### Backend (Railway)

1. Connect your repository to Railway
2. Set root directory to `server`
3. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `FRONTEND_URL` (for CORS)
   - `NODE_ENV=production`

## Rate Limiting

The API is rate-limited to 10 requests per minute per IP address to prevent abuse.

## Disclaimer

This assessment provides general guidance based on the information provided. It does not constitute legal, financial, or tax advice. Users should consult with qualified professionals to develop a comprehensive succession plan.

## License

MIT
