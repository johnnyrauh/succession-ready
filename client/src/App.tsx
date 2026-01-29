import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<Questionnaire />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
