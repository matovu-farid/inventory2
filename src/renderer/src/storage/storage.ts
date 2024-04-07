import Customer from '@renderer/models/customer'
import InventoryItem from '@renderer/models/inventoryItem'
import Unit from '@renderer/models/unit'

abstract class Storage {
    abstract getCustomer(): Promise<Customer | null>
    abstract getInventoryItem(id: string): Promise<InventoryItem>
    abstract getUnit(id: string): Promise<Unit>
    abstract createCustomer(customer: Customer): Promise<void | string>
    abstract createInventoryItem(item: InventoryItem): Promise<void>
    abstract updateInventoryItem(item: InventoryItem): Promise<void>
    abstract deleteCustomer(): Promise<void>
    abstract deleteInventoryItem(id: string): Promise<void>
    abstract getInventoryItems(uid: string): Promise<InventoryItem[]>
}
export default Storage
