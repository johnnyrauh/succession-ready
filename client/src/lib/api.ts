import { AssessmentData, AssessmentResult } from '../types'

const API_URL = import.meta.env.VITE_API_URL || ''

export async function submitAssessment(data: AssessmentData): Promise<AssessmentResult> {
  const response = await fetch(`${API_URL}/api/assess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }

  return response.json()
}
