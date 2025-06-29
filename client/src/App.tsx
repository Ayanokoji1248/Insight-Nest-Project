import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"
import WritePage from "./pages/WritePage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/write' element={<WritePage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App