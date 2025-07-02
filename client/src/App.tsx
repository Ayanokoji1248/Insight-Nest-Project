import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import BlogPage from "./pages/BlogPage"
import WritePage from "./pages/WritePage"
import ProtectedRoute from "./components/ProtectedRoute"
import ParticularBlog from "./pages/ParticularBlog"
// import { useEffect } from "react"
// import userStore from "./store/userStore"
// import axios from "axios"

const App = () => {

  // const { setUser } = userStore();
  // useEffect(() => {
  //   const userDetail = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/me`, {
  //         withCredentials: true
  //       });
  //       console.log(response.data)
  //       setUser(response.data.user)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   userDetail()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={<HomePage />} />

        <Route path='/blog' element={<BlogPage />} />
        <Route path="/blog/:id" element={<ParticularBlog />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/write' element={<WritePage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App