import { ActionItem } from '../../types'

interface ActionChecklistProps {
  actionItems: {
    critical: ActionItem[]
    highPriority: ActionItem[]
    important: ActionItem[]
    foundational: ActionItem[]
  }
}

const priorityConfig = {
  critical: {
    label: 'Critical',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
  },
  highPriority: {
    label: 'High Priority',
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
  },
  important: {
    label: 'Important',
    color: 'bg-amber-500',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  foundational: {
    label: 'Foundational',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
}

export default function ActionChecklist({ actionItems }: ActionChecklistProps) {
  const renderSection = (
    items: ActionItem[],
    priority: keyof typeof priorityConfig
  ) => {
    if (!items || items.length === 0) return null

    const config = priorityConfig[priority]

    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${config.color}`} />
          <h3 className={`font-semibold ${config.textColor}`}>{config.label}</h3>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${config.borderColor} ${config.bgColor}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 border-2 border-gray-300 rounded mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  {item.timeframe && (
                    <span className="inline-block mt-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {item.timeframe}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Action Checklist</h2>
      {renderSection(actionItems.critical, 'critical')}
      {renderSection(actionItems.highPriority, 'highPriority')}
      {renderSection(actionItems.important, 'important')}
      {renderSection(actionItems.foundational, 'foundational')}
    </div>
  )
}
