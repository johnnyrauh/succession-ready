import { Section as SectionType } from './questions'
import Select from '../shared/Select'

interface SectionProps {
  section: SectionType
  values: Record<string, unknown>
  onChange: (questionId: string, value: unknown) => void
  errors: Record<string, string>
}

export default function Section({ section, values, onChange, errors }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
        <p className="text-gray-600 mt-1">{section.description}</p>
      </div>

      {section.questions.map((question) => {
        if (question.type === 'select' && question.options) {
          return (
            <Select
              key={question.id}
              label={question.label}
              options={question.options}
              value={values[question.id] as string || ''}
              onChange={(e) => onChange(question.id, e.target.value)}
              error={errors[question.id]}
            />
          )
        }

        if (question.type === 'number') {
          return (
            <div key={question.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.label}
              </label>
              <input
                type="number"
                className={`input-field ${errors[question.id] ? 'border-red-500' : ''}`}
                value={values[question.id] as number || ''}
                onChange={(e) => onChange(question.id, parseInt(e.target.value) || '')}
                min={question.min}
                max={question.max}
              />
              {errors[question.id] && (
                <p className="mt-1 text-sm text-red-600">{errors[question.id]}</p>
              )}
            </div>
          )
        }

        if (question.type === 'boolean') {
          return (
            <div key={question.id}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.label}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    values[question.id] === true
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => onChange(question.id, true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    values[question.id] === false
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => onChange(question.id, false)}
                >
                  No
                </button>
              </div>
              {errors[question.id] && (
                <p className="mt-1 text-sm text-red-600">{errors[question.id]}</p>
              )}
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
