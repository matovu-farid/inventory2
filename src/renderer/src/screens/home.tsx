import { HashLoader } from 'react-spinners'
import { isSignedIn } from '../signals/signedIn'

function Home() {
    if (!isSignedIn.value) {
        return (
            <div className="h-screen w-full grid place-items-center">
                <HashLoader
                    color={'#123abc'}
                    loading={true}
                    size={75}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    }

    return (
        <div>
            <h1>React + Typescript</h1>
            <p className="bg-red-500">This is insane</p>
        </div>
    )
}
export default Home
