import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"
import WritePage from "./pages/WritePage"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<HomePage />} />

        <Route path='/blog' element={<BlogPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/write' element={<WritePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App