import { FirebaseApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    Firestore,
    getDoc,
    doc,
    deleteDoc,
    setDoc
} from 'firebase/firestore/lite'
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import Storage from './storage'
import { Collections } from './collections'
import Customer from '@renderer/models/customer'
import InventoryItem from '@renderer/models/inventoryItem'
import Unit from '@renderer/models/unit'
import { initializedFirebaseApp } from '@renderer/exclude/firebase_init'

export default class FirebaseStorage extends Storage {
    app: FirebaseApp
    db: Firestore
    auth: Auth
    constructor() {
        super()
        // Initialize Firebase
        this.app = initializedFirebaseApp
        this.db = getFirestore(this.app)
        this.auth = getAuth(this.app)
    }
    async getCustomer(): Promise<Customer | null> {
        const user = this.auth.currentUser
        if (!user || !user.email || !user.uid) {
            return null
        }
        const customer = new Customer({ email: user.email, uid: user.uid })
        return customer
    }

    getUid(): string {
        const user = this.auth.currentUser
        if (!user) {
            throw new Error('User not found')
        }
        return user.uid
    }

    async getInventoryItem(id: string): Promise<InventoryItem> {
        const uid = this.getUid()
        const docRef = doc(this.db, uid, Collections.INVETORY, id)
        const docSnapshot = await getDoc(docRef)
        if (!docSnapshot.exists) {
            throw new Error('Inventory Item not found')
        }
        const data = { ...docSnapshot.data() }
        const unit = await this.getUnit(data.unit)
        data.unit = unit
        const parsedData = InventoryItem.scheme.parse(data)

        const item = InventoryItem.fromObject(parsedData)
        return item
    }

    async getUnit(id: string): Promise<Unit> {
        const docRef = doc(this.db, Collections.UNIT, id)
        const docSnapshot = await getDoc(docRef)
        if (!docSnapshot.exists) {
            throw new Error('Unit not found')
        }
        const data = docSnapshot.data()
        const parsedData = Unit.scheme.parse(data)
        return Unit.fromObject(parsedData)
    }
    async createCustomer(customer: Customer): Promise<string> {
        if (!customer.password) throw new Error('Password is required')
        const credentials = await signInWithEmailAndPassword(
            this.auth,
            customer.email,
            customer.password
        )
        const uid = credentials.user.uid
        return uid
    }
    async createInventoryItem(item: InventoryItem): Promise<void> {
        const uid = this.getUid()

        const data = { ...item, unit: item.unit.id }
        await setDoc(doc(this.db, uid, Collections.INVETORY), data)
    }

    async updateInventoryItem(item: InventoryItem): Promise<void> {
        const uid = this.getUid()
        await setDoc(doc(this.db, uid, Collections.INVETORY, item.id), item.toObject(), {
            merge: true
        })
    }

    async deleteCustomer(): Promise<void> {
        await this.auth.currentUser?.delete()
    }

    async deleteInventoryItem(id: string): Promise<void> {
        const uid = this.getUid()
        const docRef = doc(this.db, uid, Collections.INVETORY, id)
        await deleteDoc(docRef)
    }

    async getInventoryItems(uid: string): Promise<InventoryItem[]> {
        const collectionRef = collection(this.db, uid, Collections.INVETORY)
        const querySnapshot = await getDocs(collectionRef)
        const items: InventoryItem[] = []
        for (const doc of querySnapshot.docs) {
            const data = doc.data()
            const unit = await this.getUnit(data.unit)
            data.unit = unit
            const parsedData = InventoryItem.scheme.parse(data)
            items.push(InventoryItem.fromObject(parsedData))
        }
        return items
    }
}
