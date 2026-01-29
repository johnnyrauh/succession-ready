import { NextSteps as NextStepsType } from '../../types'

interface NextStepsProps {
  nextSteps: NextStepsType
}

export default function NextSteps({ nextSteps }: NextStepsProps) {
  if (!nextSteps) return null

  const sections = [
    {
      title: 'Immediate (Next 30 Days)',
      items: nextSteps.immediate,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Short-Term (1-6 Months)',
      items: nextSteps.shortTerm,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Long-Term (6-12 Months)',
      items: nextSteps.longTerm,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ]

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Recommended Next Steps</h2>
      <div className="space-y-6">
        {sections.map((section) => (
          section.items && section.items.length > 0 && (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full ${section.bgColor} flex items-center justify-center ${section.iconColor}`}>
                  {section.icon}
                </div>
                <h3 className="font-medium text-gray-800">{section.title}</h3>
              </div>
              <ul className="ml-10 space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  )
}
