import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Routes */}
        <Route path='/blog' element={<BlogPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App