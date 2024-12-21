import RepositoryDashboard from "./pages/Dashboard"
import SignIn from "./pages/SignInPage"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<RepositoryDashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App