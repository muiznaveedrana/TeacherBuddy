'use client'

interface ScoreTrackerProps {
  current: number  // Number of questions answered
  total: number    // Total questions
  showPercentage?: boolean
}

export function ScoreTracker({ current, total, showPercentage = true }: ScoreTrackerProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold">
            Progress: {current} / {total} answered
          </span>
          {showPercentage && (
            <span className="text-lg font-semibold bg-white text-blue-600 px-3 py-1 rounded-full">
              {percentage}%
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-blue-300 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className="bg-white h-4 transition-all duration-500 ease-out flex items-center justify-end pr-2"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs font-bold text-blue-600">
                {percentage}%
              </span>
            )}
          </div>
        </div>

        {/* Encouragement Message */}
        {current === 0 && (
          <p className="text-sm mt-2 text-blue-100 text-center">
            Fill in all answers, then submit to see your score! 📝
          </p>
        )}
        {current > 0 && current < total && (
          <p className="text-sm mt-2 text-blue-100 text-center">
            Keep going! Submit when done to check your answers. 💪
          </p>
        )}
        {current === total && (
          <p className="text-sm mt-2 text-white font-semibold text-center animate-bounce">
            All done! Click Submit to see your score! 🎉
          </p>
        )}
      </div>
    </div>
  )
}
