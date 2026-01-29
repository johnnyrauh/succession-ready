import { Risk } from '../../types'

interface RisksSectionProps {
  risks: Risk[]
}

const severityConfig = {
  high: {
    label: 'High Risk',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  medium: {
    label: 'Medium Risk',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  low: {
    label: 'Low Risk',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
}

export default function RisksSection({ risks }: RisksSectionProps) {
  if (!risks || risks.length === 0) return null

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Key Risks Identified</h2>
      <div className="space-y-4">
        {risks.map((risk, index) => {
          const config = severityConfig[risk.severity]
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <svg
                    className={`w-5 h-5 ${config.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{risk.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.iconBg} ${config.iconColor}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{risk.description}</p>
                  <div className="bg-white/70 rounded p-2 mt-2">
                    <span className="text-xs font-medium text-gray-500">Mitigation Strategy:</span>
                    <p className="text-sm text-gray-700 mt-1">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
