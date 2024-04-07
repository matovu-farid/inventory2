import './assets/main.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './screens/home'
import Wrappers from './wrappers'
import { isSignedIn } from './signals/signedIn'
import Signin from './screens/signin'
import Signup from './screens/signup'
import ErrorPage from './screens/error-page'

const router = createBrowserRouter([
    {
        path: '/',
        element: isSignedIn.value ? <Home /> : <Signin />,
        errorElement: <ErrorPage />
    },
    {
        path: '/signin',
        element: <Signin />,
        errorElement: <ErrorPage />
    },
    {
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />
    },
    {
        path: '/home',
        element: <Home />,
        errorElement: <ErrorPage />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Wrappers>
            <RouterProvider router={router} />
        </Wrappers>
    </React.StrictMode>
)
