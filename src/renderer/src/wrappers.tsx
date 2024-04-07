import React from 'react'
import { RecoilRoot } from 'recoil'
import ErrorBoundary from './components/ErrorBoundary'

export default function Wrappers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <RecoilRoot>{children}</RecoilRoot>
        </ErrorBoundary>
    )
}
