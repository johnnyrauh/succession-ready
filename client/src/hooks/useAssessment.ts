import { useState, useCallback } from 'react'
import { submitAssessment } from '../lib/api'
import { AssessmentData, AssessmentResult } from '../types'

interface UseAssessmentReturn {
  submit: (data: AssessmentData) => Promise<AssessmentResult>
  isLoading: boolean
  error: string | null
  result: AssessmentResult | null
  reset: () => void
}

export function useAssessment(): UseAssessmentReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const submit = useCallback(async (data: AssessmentData): Promise<AssessmentResult> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await submitAssessment(data)
      setResult(response)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    submit,
    isLoading,
    error,
    result,
    reset,
  }
}
