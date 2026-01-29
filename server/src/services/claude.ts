import Anthropic from '@anthropic-ai/sdk';
import { AssessmentRequest, AssessmentResponse } from '../types/index.js';
import { buildAssessmentPrompt } from '../prompts/assessment.js';

const anthropic = new Anthropic();

export async function generateAssessment(data: AssessmentRequest): Promise<AssessmentResponse> {
  const prompt = buildAssessmentPrompt(data);

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  try {
    // Extract JSON from the response (in case there's any extra text)
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }

    const result = JSON.parse(jsonMatch[0]) as AssessmentResponse;

    // Validate required fields
    if (typeof result.readinessScore !== 'number' ||
        result.readinessScore < 0 ||
        result.readinessScore > 100) {
      throw new Error('Invalid readiness score');
    }

    if (!result.summary || !result.actionItems || !result.risks || !result.nextSteps) {
      throw new Error('Missing required fields in response');
    }

    return result;
  } catch (error) {
    console.error('Failed to parse Claude response:', content.text);
    throw new Error('Failed to parse assessment response');
  }
}
