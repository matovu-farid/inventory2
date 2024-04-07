import { useRouteError } from 'react-router-dom'

interface Error {
    statusText?: string
    message?: string
    error?: {
        message?: string
        stack?: string
    }
}
export default function ErrorPage() {
    const error = useRouteError() as Error

    console.error(error)

    return (
        <div className="min-h-screen w-full grid place-items-center">
            <div
                id="error-page"
                className="bg-[#3c0f4f] grid gap-2 text-white rounded-3xl m-5  p-5 "
            >
                <h1 className="text-lg font-bold underline ">{error.statusText}</h1>
                <p>{error.message}</p>
                <p>{error?.error?.message}</p>
                <p className="text-sm py-2">{error?.error?.stack}</p>
            </div>
        </div>
    )
}
