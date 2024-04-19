import Unit, { UnitObject } from './unit'
import { z } from 'zod'

interface InventoryItemObject {
    name: string
    createdAt: Date
    unit: UnitObject
    id: string
    price: number
    amount: number
}

type InventoryProp = Omit<InventoryItemObject, 'unit'> & { unit: Unit }

export default class InventoryItem {
    name: string
    createdAt: Date
    unit: Unit
    id: string
    price: number
    amount: number
    constructor({ name, createdAt, unit, id, price, amount }: InventoryProp) {
        this.name = name
        this.createdAt = createdAt
        this.unit = unit
        this.id = id
        this.price = price
        this.amount = amount
    }

    toJson(): string {
        return JSON.stringify({
            name: this.name,
            createdAt: this.createdAt,
            unit: this.unit.toJson()
        })
    }

    toObject(): InventoryItemObject {
        return {
            name: this.name,
            createdAt: this.createdAt,
            unit: this.unit.toObject(),
            id: this.id,
            price: this.price,
            amount: this.amount
        }
    }
    static scheme = z.object({
        name: z.string(),
        createdAt: z.date(),
        unit: Unit.scheme,
        id: z.string(),
        price: z.number(),
        amount: z.number()
    })

    static fromObject(obj: InventoryItemObject): InventoryItem {
        InventoryItem.scheme.parse(obj)

        return new InventoryItem({
            name: obj.name,
            createdAt: obj.createdAt,
            unit: Unit.fromObject(obj.unit),
            id: obj.id,
            price: obj.price,
            amount: obj.amount
        })
    }
}
