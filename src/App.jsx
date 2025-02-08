import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './pages/Body'
import Home from './pages/Home'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Container>
          <Routes>
            <Route path="/" element={<Body />} >
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App
