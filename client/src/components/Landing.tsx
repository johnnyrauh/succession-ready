import { useNavigate } from 'react-router-dom'
import Button from './shared/Button'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-primary-500">SuccessionReady</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Is Your Business Ready for Succession?
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Take our comprehensive assessment to understand your succession planning readiness
                and receive a personalized action plan tailored to your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="white"
                  onClick={() => navigate('/assessment')}
                >
                  Start Free Assessment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-500">70%</div>
                <p className="text-gray-600 mt-2">of businesses fail to successfully transition to the next generation</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-500">$10T</div>
                <p className="text-gray-600 mt-2">in business assets expected to transfer over the next decade</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-500">5-10 yrs</div>
                <p className="text-gray-600 mt-2">recommended timeframe for comprehensive succession planning</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Answer Questions</h3>
                <p className="text-gray-600">
                  Complete a brief questionnaire about your business, ownership structure, and current planning status.
                </p>
              </div>
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Your Score</h3>
                <p className="text-gray-600">
                  Receive a comprehensive readiness score based on key succession planning factors.
                </p>
              </div>
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Take Action</h3>
                <p className="text-gray-600">
                  Get a personalized action plan with prioritized steps to improve your succession readiness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                'Your overall succession readiness score',
                'Critical gaps in your current planning',
                'Key risks to your business continuity',
                'Prioritized action items by urgency',
                'Recommended professional resources',
                'Comparison to industry benchmarks',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              The assessment takes about 5 minutes and you'll receive your personalized results immediately.
            </p>
            <Button
              variant="white"
              onClick={() => navigate('/assessment')}
            >
              Start Free Assessment
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} SuccessionReady. All rights reserved.</p>
          <p className="mt-2 text-sm">
            This assessment provides general guidance and does not constitute legal, financial, or tax advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
