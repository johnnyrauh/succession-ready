import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import ReadinessScore from './ReadinessScore'
import ActionChecklist from './ActionChecklist'
import RisksSection from './RisksSection'
import NextSteps from './NextSteps'
import Button from '../shared/Button'
import { AssessmentResult } from '../../types'

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const printRef = useRef<HTMLDivElement>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [email, setEmail] = useState('')

  const result = location.state?.result as AssessmentResult | undefined

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'SuccessionReady Assessment Results',
  })

  const generateEmailBody = () => {
    if (!result) return ''

    let body = `SUCCESSIONREADY ASSESSMENT RESULTS\n`
    body += `Generated on ${new Date().toLocaleDateString()}\n\n`
    body += `================================\n`
    body += `READINESS SCORE: ${result.readinessScore}/100\n`
    body += `================================\n\n`
    body += `SUMMARY:\n${result.summary}\n\n`

    if (result.criticalGaps?.length > 0) {
      body += `CRITICAL GAPS:\n`
      result.criticalGaps.forEach((gap, i) => {
        body += `${i + 1}. ${gap}\n`
      })
      body += `\n`
    }

    if (result.nextSteps?.immediate?.length > 0) {
      body += `IMMEDIATE NEXT STEPS (Next 30 Days):\n`
      result.nextSteps.immediate.forEach((step, i) => {
        body += `${i + 1}. ${step}\n`
      })
      body += `\n`
    }

    body += `---\n`
    body += `This assessment provides general guidance and does not constitute legal, financial, or tax advice.\n`

    return body
  }

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Your SuccessionReady Assessment Results - Score: ${result?.readinessScore}/100`)
    const body = encodeURIComponent(generateEmailBody())
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setShowEmailModal(false)
    setEmail('')
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h2>
          <p className="text-gray-600 mb-6">Please complete the assessment first.</p>
          <Button onClick={() => navigate('/assessment')}>
            Start Assessment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-primary-500">SuccessionReady</span>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => handlePrint()}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Download PDF
              </Button>
              <Button onClick={() => navigate('/assessment')}>
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={printRef} className="space-y-6">
          {/* Print Header */}
          <div className="hidden print:block mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-primary-500">SuccessionReady</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Your Succession Readiness Assessment</h1>
            <p className="text-gray-500 text-sm">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {/* Summary Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <ReadinessScore score={result.readinessScore} />
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
              <p className="text-gray-600 mb-4">{result.summary}</p>
              {result.criticalGaps && result.criticalGaps.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Critical Gaps Identified:</h3>
                  <ul className="space-y-2">
                    {result.criticalGaps.map((gap, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-gray-600">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action Checklist */}
          <div className="print-break">
            <ActionChecklist actionItems={result.actionItems} />
          </div>

          {/* Risks */}
          <RisksSection risks={result.risks} />

          {/* Next Steps */}
          <div className="print-break">
            <NextSteps nextSteps={result.nextSteps} />
          </div>

          {/* Disclaimer */}
          <div className="card bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Disclaimer:</strong> This assessment provides general guidance based on the information you provided.
              It does not constitute legal, financial, or tax advice. We recommend consulting with qualified professionals
              (attorney, CPA, financial advisor) to develop a comprehensive succession plan tailored to your specific situation.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 card bg-primary-500 text-white no-print">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Ready to Take Action?</h2>
            <p className="text-primary-100 mb-6">
              Download your results and schedule a consultation with a succession planning professional.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                variant="white"
                onClick={() => handlePrint()}
              >
                Download PDF
              </Button>
              <Button
                variant="white"
                onClick={() => setShowEmailModal(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Results
              </Button>
              <Button
                onClick={() => navigate('/')}
                className="bg-primary-600 hover:bg-primary-700 border-2 border-primary-400"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        {/* Email Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Email Your Results</h3>
              <p className="text-gray-600 mb-4">
                Enter your email address to receive a summary of your assessment results.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-field mb-4"
                autoFocus
              />
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEmailModal(false)
                    setEmail('')
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEmailSend}
                  disabled={!email || !email.includes('@')}
                >
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} SuccessionReady. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
