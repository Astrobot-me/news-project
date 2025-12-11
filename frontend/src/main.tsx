import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthenticationPage from './pages/AuthenticationPage.tsx'
import ArticlePage from './pages/ArticlePage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

    ]
  },
  {
    path: "/article/id/:id",
    element: <ArticlePage />
  }
  ,
  {
    path: '/auth',
    children: [
      {
        path: "sign-in",
        element: <AuthenticationPage />
      },
      {
        path: "sign-up",
        element: <AuthenticationPage />
      },
    ],
  },


])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
