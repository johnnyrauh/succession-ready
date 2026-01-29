import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sections, demoData } from './questions'
import ProgressBar from './ProgressBar'
import Section from './Section'
import Button from '../shared/Button'
import Loading from '../shared/Loading'
import { submitAssessment } from '../../lib/api'
import { AssessmentData } from '../../types'

type FormData = {
  [sectionId: string]: {
    [questionId: string]: unknown
  }
}

export default function Questionnaire() {
  const navigate = useNavigate()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    businessFundamentals: {},
    ownershipLeadership: {},
    planningStatus: {},
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const section = sections[currentSection]
  const sectionTitles = sections.map((s) => s.title)

  const handleChange = (questionId: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [section.id]: {
        ...prev[section.id],
        [questionId]: value,
      },
    }))
    setErrors((prev) => ({ ...prev, [questionId]: '' }))
  }

  const validateSection = (): boolean => {
    const newErrors: Record<string, string> = {}
    const sectionData = formData[section.id] || {}

    for (const question of section.questions) {
      const value = sectionData[question.id]
      if (value === undefined || value === '' || value === null) {
        newErrors[question.id] = 'This field is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateSection()) return

    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleDemoFill = () => {
    setFormData(demoData as FormData)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const result = await submitAssessment(formData as unknown as AssessmentData)
      navigate('/results', { state: { result, formData } })
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit assessment. Please try again.'
      )
      setIsSubmitting(false)
    }
  }

  if (isSubmitting) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-primary-500">SuccessionReady</span>
            </div>
            <button
              onClick={handleDemoFill}
              className="text-sm text-primary-500 hover:text-primary-600 underline"
            >
              Fill Demo Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar
          currentSection={currentSection}
          totalSections={sections.length}
          sectionTitles={sectionTitles}
        />

        <div className="card">
          <Section
            section={section}
            values={formData[section.id] || {}}
            onChange={handleChange}
            errors={errors}
          />

          {submitError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {submitError}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentSection === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentSection === sections.length - 1 ? 'Get My Results' : 'Continue'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
