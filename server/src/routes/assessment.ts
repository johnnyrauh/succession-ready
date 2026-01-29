import { Router, Request, Response } from 'express';
import { generateAssessment } from '../services/claude.js';
import { assessmentRateLimiter } from '../middleware/rateLimit.js';
import { AssessmentRequest } from '../types/index.js';

const router = Router();

// Validation helper
function validateAssessmentRequest(body: unknown): body is AssessmentRequest {
  if (!body || typeof body !== 'object') return false;

  const data = body as Record<string, unknown>;

  // Check businessFundamentals
  if (!data.businessFundamentals || typeof data.businessFundamentals !== 'object') return false;
  const bf = data.businessFundamentals as Record<string, unknown>;
  if (!bf.businessType || !bf.industry || !bf.revenueRange || !bf.employeeCount) return false;
  if (typeof bf.yearsInBusiness !== 'number') return false;

  // Check ownershipLeadership
  if (!data.ownershipLeadership || typeof data.ownershipLeadership !== 'object') return false;
  const ol = data.ownershipLeadership as Record<string, unknown>;
  if (!ol.ownershipStructure || !ol.intendedSuccessor || !ol.transitionTimeline) return false;
  if (typeof ol.currentAge !== 'number') return false;
  if (typeof ol.successorIdentified !== 'boolean') return false;

  // Check planningStatus
  if (!data.planningStatus || typeof data.planningStatus !== 'object') return false;
  const ps = data.planningStatus as Record<string, unknown>;
  if (!ps.formalPlan || !ps.businessValuation || !ps.estatePlanning) return false;
  if (typeof ps.buySellAgreement !== 'boolean') return false;
  if (typeof ps.keyPersonInsurance !== 'boolean') return false;

  return true;
}

router.post('/assess', assessmentRateLimiter, async (req: Request, res: Response) => {
  try {
    // Validate request body
    if (!validateAssessmentRequest(req.body)) {
      res.status(400).json({
        error: 'Invalid request. Please ensure all required fields are provided.',
      });
      return;
    }

    // Check for API key
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

export default router;
