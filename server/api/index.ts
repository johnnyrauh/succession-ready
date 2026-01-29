import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

interface AssessmentRequest {
  businessFundamentals: {
    businessType: string;
    industry: string;
    revenueRange: string;
    employeeCount: string;
    yearsInBusiness: number;
    keyPersonDependency: string;
  };
  ownershipLeadership: {
    ownershipStructure: string;
    intendedSuccessor: string;
    currentAge: number;
    transitionTimeline: string;
    successorIdentified: boolean;
  };
  planningStatus: {
    formalPlan: string;
    businessValuation: string;
    estatePlanning: string;
    buySellAgreement: boolean;
    keyPersonInsurance: boolean;
  };
}

function buildAssessmentPrompt(data: AssessmentRequest): string {
  return `You are an expert business succession planning advisor. Analyze the following business owner's situation and provide a comprehensive succession readiness assessment.

## Business Information

### Business Fundamentals
- Entity Type: ${data.businessFundamentals.businessType}
- Industry: ${data.businessFundamentals.industry}
- Annual Revenue: ${data.businessFundamentals.revenueRange}
- Number of Employees: ${data.businessFundamentals.employeeCount}
- Years in Business: ${data.businessFundamentals.yearsInBusiness}
- Key Person Dependency: ${data.businessFundamentals.keyPersonDependency}

### Ownership & Leadership
- Ownership Structure: ${data.ownershipLeadership.ownershipStructure}
- Intended Successor: ${data.ownershipLeadership.intendedSuccessor}
- Owner's Current Age: ${data.ownershipLeadership.currentAge}
- Transition Timeline: ${data.ownershipLeadership.transitionTimeline}
- Successor Identified: ${data.ownershipLeadership.successorIdentified ? 'Yes' : 'No'}

### Current Planning Status
- Formal Succession Plan: ${data.planningStatus.formalPlan}
- Last Business Valuation: ${data.planningStatus.businessValuation}
- Estate Planning: ${data.planningStatus.estatePlanning}
- Buy-Sell Agreement: ${data.planningStatus.buySellAgreement ? 'Yes' : 'No'}
- Key Person Insurance: ${data.planningStatus.keyPersonInsurance ? 'Yes' : 'No'}

## Instructions

Based on this information, provide a detailed succession readiness assessment. Your response must be a valid JSON object with the following structure:

{
  "readinessScore": <number 0-100>,
  "summary": "<2-3 sentence summary of their overall readiness>",
  "criticalGaps": ["<gap 1>", "<gap 2>", ...],
  "actionItems": {
    "critical": [
      {"title": "<action>", "description": "<details>", "timeframe": "<suggested timeframe>"}
    ],
    "highPriority": [
      {"title": "<action>", "description": "<details>", "timeframe": "<suggested timeframe>"}
    ],
    "important": [
      {"title": "<action>", "description": "<details>", "timeframe": "<suggested timeframe>"}
    ],
    "foundational": [
      {"title": "<action>", "description": "<details>", "timeframe": "<suggested timeframe>"}
    ]
  },
  "risks": [
    {
      "title": "<risk name>",
      "severity": "<high|medium|low>",
      "description": "<what could happen>",
      "mitigation": "<how to address it>"
    }
  ],
  "nextSteps": {
    "immediate": ["<step 1>", "<step 2>"],
    "shortTerm": ["<step 1>", "<step 2>"],
    "longTerm": ["<step 1>", "<step 2>"]
  }
}

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;
}

function validateAssessmentRequest(body: unknown): body is AssessmentRequest {
  if (!body || typeof body !== 'object') return false;
  const data = body as Record<string, unknown>;

  if (!data.businessFundamentals || typeof data.businessFundamentals !== 'object') return false;
  const bf = data.businessFundamentals as Record<string, unknown>;
  if (!bf.businessType || !bf.industry || !bf.revenueRange || !bf.employeeCount) return false;
  if (typeof bf.yearsInBusiness !== 'number') return false;

  if (!data.ownershipLeadership || typeof data.ownershipLeadership !== 'object') return false;
  const ol = data.ownershipLeadership as Record<string, unknown>;
  if (!ol.ownershipStructure || !ol.intendedSuccessor || !ol.transitionTimeline) return false;
  if (typeof ol.currentAge !== 'number') return false;
  if (typeof ol.successorIdentified !== 'boolean') return false;

  if (!data.planningStatus || typeof data.planningStatus !== 'object') return false;
  const ps = data.planningStatus as Record<string, unknown>;
  if (!ps.formalPlan || !ps.businessValuation || !ps.estatePlanning) return false;
  if (typeof ps.buySellAgreement !== 'boolean') return false;
  if (typeof ps.keyPersonInsurance !== 'boolean') return false;

  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url?.replace(/\?.*$/, '') || '';

  // Health check
  if (path === '/api/health' && req.method === 'GET') {
    return res.json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  // Assessment endpoint
  if (path === '/api/assess' && req.method === 'POST') {
    try {
      if (!validateAssessmentRequest(req.body)) {
        return res.status(400).json({
          error: 'Invalid request. Please ensure all required fields are provided.',
        });
      }

      if (!process.env.ANTHROPIC_API_KEY) {
        console.error('ANTHROPIC_API_KEY is not configured');
        return res.status(500).json({
          error: 'Service configuration error. Please contact support.',
        });
      }

      const prompt = buildAssessmentPrompt(req.body);

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = message.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON object found in response');
      }

      const result = JSON.parse(jsonMatch[0]);
      return res.json(result);

    } catch (error) {
      console.error('Assessment error:', error);
      return res.status(500).json({
        error: 'Failed to generate assessment. Please try again.',
      });
    }
  }

  return res.status(404).json({ error: 'Not found' });
}
