interface ProgressBarProps {
  currentSection: number
  totalSections: number
  sectionTitles: string[]
}

export default function ProgressBar({ currentSection, totalSections, sectionTitles }: ProgressBarProps) {
  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Section {currentSection + 1} of {totalSections}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-3">
        {sectionTitles.map((title, index) => (
          <div
            key={title}
            className={`flex items-center gap-2 text-sm ${
              index <= currentSection ? 'text-primary-600' : 'text-gray-400'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index < currentSection
                  ? 'bg-primary-500 text-white'
                  : index === currentSection
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-500'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index < currentSection ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="hidden md:inline">{title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
