import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { assessmentRateLimiter } from '../src/middleware/rateLimit.js';
import { generateAssessment } from '../src/services/claude.js';
import { AssessmentRequest } from '../src/types/index.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Validation helper
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

// Assessment endpoint
app.post('/api/assess', assessmentRateLimiter, async (req, res) => {
  try {
    if (!validateAssessmentRequest(req.body)) {
      res.status(400).json({
        error: 'Invalid request. Please ensure all required fields are provided.',
      });
      return;
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured');
      res.status(500).json({
        error: 'Service configuration error. Please contact support.',
      });
      return;
    }

    const result = await generateAssessment(req.body);
    res.json(result);
  } catch (error) {
    console.error('Assessment error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        res.status(500).json({
          error: 'Service configuration error. Please contact support.',
        });
        return;
      }

      if (error.message.includes('rate limit')) {
        res.status(429).json({
          error: 'Service is busy. Please try again in a moment.',
        });
        return;
      }
    }

    res.status(500).json({
      error: 'Failed to generate assessment. Please try again.',
    });
  }
});

export default app;
