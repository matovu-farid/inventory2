import { HashLoader } from 'react-spinners'
import { isSignedIn } from '../signals/signedIn'
import { firebaseApp, user } from '@renderer/signals/firebaseApp'
import { useNavigate } from 'react-router-dom'
import { effect } from '@preact/signals-react'
import InventoryTable from '@renderer/components/InventoryTable'
import { Button } from '@mui/material'
import { useEffect } from 'react'

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        if (firebaseApp.auth.currentUser === null) {
            navigate('/signin')
        }
    }, [])
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
        <div className="p-5">
            <div className="flex justify-end">
                <Button
                    onClick={() => {
                        firebaseApp.signOut().then(() => {
                            navigate('/signin')
                        })
                    }}
                    variant="contained"
                    color="error"
                >
                    {' '}
                    Signout{' '}
                </Button>
            </div>
            <InventoryTable />
        </div>
    )
}
export default Home
