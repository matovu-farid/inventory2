import React from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

export default function Wrappers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <>
                    <ToastContainer />
                    {children}
                </>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}
