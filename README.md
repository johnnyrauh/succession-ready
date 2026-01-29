# SuccessionReady

A full-stack web application that helps business owners assess their succession planning readiness through a smart questionnaire, then generates personalized action plans powered by Claude AI.

## What It Does

**SuccessionReady** helps business owners figure out if they're prepared to eventually hand off or sell their business.

**How it works:**

1. **Answer questions** - You fill out a short questionnaire about your business (size, industry, how long you've been running it) and your current planning situation (do you have a successor picked? do you have legal documents in place?)

2. **AI analyzes your situation** - Claude AI reviews your answers and calculates a "readiness score" from 0-100

3. **Get a personalized report** - You receive:
   - Your score with an explanation
   - Critical gaps (what's missing)
   - A prioritized action checklist (what to do first)
   - Key risks to watch out for
   - Recommended next steps by timeframe

4. **Save your results** - Download as PDF or email to yourself

**Why it matters:** Most business owners don't plan for succession until it's too late. This tool gives them a quick reality check and a clear roadmap to get prepared—whether they're passing the business to family, selling to employees, or finding an outside buyer.

## Features

- **Smart Questionnaire**: Multi-section assessment covering business fundamentals, ownership structure, and planning status
- **AI-Powered Analysis**: Claude API generates personalized readiness scores and recommendations
- **Action Checklist**: Prioritized action items categorized by urgency (Critical, High Priority, Important, Foundational)
- **Risk Assessment**: Identifies key risks with severity levels and mitigation strategies
- **PDF Export**: Download results for offline review or sharing with advisors
- **Demo Mode**: Pre-fill questionnaire with sample data for testing

## Tech Stack

### Frontend (what you see in the browser)
- **React** - A popular toolkit for building interactive web pages. It's like LEGO blocks for websites—you build small pieces (buttons, forms, cards) and snap them together.
- **TypeScript** - JavaScript with training wheels. It catches mistakes before they become problems.
- **Tailwind CSS** - A shortcut system for styling. Instead of writing custom design code, you use pre-made classes like "make this blue" or "add padding."
- **Vite** - A tool that bundles all your code and makes the site load fast.

### Backend (the server that does the thinking)
- **Node.js + Express** - The engine that runs behind the scenes. When you submit the questionnaire, Express receives it, processes it, and sends back results.
- **Anthropic SDK** - The connection to Claude AI. It sends your answers to Claude and gets back the personalized analysis.

### How they talk to each other
1. You fill out the form (React)
2. The form sends your answers to the server (Express)
3. The server asks Claude AI to analyze them (Anthropic SDK)
4. Claude sends back your score and recommendations
5. The server passes that to the frontend
6. React displays your results

### Hosting
- **Vercel** - A service that puts your website on the internet. It handles all the server stuff so you don't have to.

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
