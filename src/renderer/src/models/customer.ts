export interface CustomerProps {
    email: string
    uid?: string
    password?: string
}
export default class Customer {
    password?: string
    email: string
    uid?: string

    constructor({ email, uid, password }: CustomerProps) {
        this.email = email
        if (uid) this.uid = uid
        if (password) this.password = password
    }
}
