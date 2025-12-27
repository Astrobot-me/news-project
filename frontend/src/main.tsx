import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthenticationPage from './pages/AuthenticationPage.tsx'
import ArticlePage from './pages/ArticlePage.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import AuthChecker from './components/ProtectedRoute.tsx'
import NewsRoomPage from './pages/NewsRoomPage.tsx'
import LandingPage from './pages/LandingPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    children: [

    ]
  },
  {
    path: "app/",
    element: <App />,
    children: [
      {
        path: "news",
        element: <AuthChecker authentication={true}>
          <NewsRoomPage />
        </AuthChecker>
      },
      {
        path: "article/id/:id",
        element: <AuthChecker authentication={true}>
          <ArticlePage />
        </AuthChecker>
      },
    ]
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
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
