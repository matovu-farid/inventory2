import './assets/main.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './screens/home'
import Wrappers from './wrappers'
import { isSignedIn } from './signals/signedIn'
import Signin from './screens/signin'

const router = createBrowserRouter([
    {
        path: '/',
        element: isSignedIn.value ? <Home /> : <Signin />
    },
    {
        path: '/signin',
        element: <div>Sign In</div>
    },
    {
        path: '/home',
        element: <Home />
    }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Wrappers>
            <RouterProvider router={router} />
        </Wrappers>
    </React.StrictMode>
)
