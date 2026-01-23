import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import './index.css'
import AuthProvider from './contexts/mainContext'
import { ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position='top-center' autoClose={5000}></ToastContainer>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
