import { AssessmentRequest } from '../types/index.js';

export function buildAssessmentPrompt(data: AssessmentRequest): string {
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

## Scoring Guidelines

Calculate the readiness score based on these factors:
- No formal plan: -25 points from 100
- No business valuation in 3+ years: -15 points
- No buy-sell agreement: -15 points
- No key person insurance: -10 points
- No successor identified: -15 points
- High key person dependency: -10 points
- Basic or no estate planning: -10 points
- Transition timeline under 2 years with low planning: additional -10 points

Be specific and actionable in your recommendations. Consider the industry, business size, and timeline when prioritizing actions.

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;
}
