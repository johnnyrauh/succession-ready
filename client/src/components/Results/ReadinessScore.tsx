interface ReadinessScoreProps {
  score: number
}

export default function ReadinessScore({ score }: ReadinessScoreProps) {
  const getScoreColor = () => {
    if (score >= 80) return { color: '#38a169', label: 'Excellent' }
    if (score >= 60) return { color: '#d69e2e', label: 'Good' }
    if (score >= 40) return { color: '#dd6b20', label: 'Needs Work' }
    return { color: '#c53030', label: 'Critical' }
  }

  const { color, label } = getScoreColor()
  const circumference = 2 * Math.PI * 70
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="card text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Succession Readiness Score</h2>

      <div className="relative inline-flex items-center justify-center">
        <svg width="180" height="180" className="transform -rotate-90">
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
          />
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold" style={{ color }}>{score}</span>
          <span className="text-gray-500 text-sm">out of 100</span>
        </div>
      </div>

      <div className="mt-4">
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {label}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="h-2 bg-red-500 rounded-full mb-1" />
          <span className="text-gray-500">0-39</span>
        </div>
        <div className="text-center">
          <div className="h-2 bg-orange-500 rounded-full mb-1" />
          <span className="text-gray-500">40-59</span>
        </div>
        <div className="text-center">
          <div className="h-2 bg-amber-500 rounded-full mb-1" />
          <span className="text-gray-500">60-79</span>
        </div>
        <div className="text-center">
          <div className="h-2 bg-green-500 rounded-full mb-1" />
          <span className="text-gray-500">80-100</span>
        </div>
      </div>
    </div>
  )
}
