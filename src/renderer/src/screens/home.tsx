import { HashLoader } from 'react-spinners'
import { isSignedIn } from '../signals/signedIn'
import { user } from '@renderer/signals/firebaseApp'
import { useNavigate } from 'react-router-dom'
import { effect } from '@preact/signals-react'
import InventoryTable from '@renderer/components/inventory_table'

function Home() {
    const navigate = useNavigate()
    effect(() => {
        if (!isSignedIn.value) {
            navigate('/signin')
        }
    })
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
            <InventoryTable />
        </div>
    )
}
export default Home
