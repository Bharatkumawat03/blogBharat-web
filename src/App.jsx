import { Box, Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './pages/Body'
import Home from './pages/Home'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Blogs from './pages/Blogs'
import WriteBlog from './pages/WriteBlog'
import Profile from './pages/Profile'
import Blog from './pages/Blog'
import About from './pages/About'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <ToastContainer />
        <Box sx={{m: 0, p: 0}}>
          <Routes>
            <Route path="/" element={<Body />} >
              <Route index element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:blogid" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<WriteBlog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </Provider>
  )
}

export default App
