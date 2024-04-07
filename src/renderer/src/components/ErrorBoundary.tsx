/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode // Accepts React children, which is any valid React content
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    // This lifecycle method is invoked after an error has been thrown by a descendant component.
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null }
    }

    // This lifecycle method is invoked after an error has been thrown by a descendant component.
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log the error to an error reporting service here
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI with error information
            return (
                <div
                    style={{
                        background: '#3c0f4f',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '20px'
                    }}
                >
                    <h1>Something went wrong.</h1>
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </div>
                </div>
            )
        }

        // Normally, just render children
        return this.props.children
    }
}

export default ErrorBoundary
