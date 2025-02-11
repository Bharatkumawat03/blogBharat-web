import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Box } from '@mui/material'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  
  <Box sx={{m: 0, p: 0}}>
    <App />
  </Box>
  // </StrictMode>,
)
