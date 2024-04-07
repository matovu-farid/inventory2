import Customer from '@renderer/models/customer'
import { atom } from 'recoil'

const customerState = atom({
    key: 'customerState',
    default: null as Customer | null
})

export default customerState
