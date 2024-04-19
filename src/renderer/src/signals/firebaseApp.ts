import { signal } from '@preact/signals-react'
import Customer, { CustomerProps } from '@renderer/models/customer'
import FirebaseStorage from '@renderer/storage/firebase'

export const firebaseApp = new FirebaseStorage()

export const user = signal(await firebaseApp.getCustomer())

export async function signIn({ email, password }: CustomerProps) {
    const customer = new Customer({ email, password })
    
    const uid = await firebaseApp.createCustomer(customer)
    customer.uid = uid
    user.value = customer
    
}

export async function signUp({ email, password }: CustomerProps) {
    const customer = new Customer({ email, password })
    const uid = await firebaseApp.registerCustomer(customer)
    customer.uid = uid
    user.value = customer
    
    return customer
}
