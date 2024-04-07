import Unit, { UnitObject } from './unit'
import { z } from 'zod'

interface InventoryItemObject {
    name: string
    createdAt: Date
    unit: UnitObject
    id: string
}

export default class InventoryItem {
    name: string
    createdAt: Date
    unit: Unit
    id: string
    constructor(name: string, createdAt: Date, unit: Unit, id: string) {
        this.name = name
        this.createdAt = createdAt
        this.unit = unit
        this.id = id
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
            id: this.id
        }
    }
    static scheme = z.object({
        name: z.string(),
        createdAt: z.date(),
        unit: Unit.scheme,
        id: z.string()
    })

    static fromObject(obj: InventoryItemObject): InventoryItem {
        InventoryItem.scheme.parse(obj)

        return new InventoryItem(obj.name, obj.createdAt, Unit.fromObject(obj.unit), obj.id)
    }
    static fromJson(json: string): InventoryItem {
        const obj = JSON.parse(json)
        return new InventoryItem(obj.name, obj.createdAt, Unit.fromJson(obj.unit), obj.id)
    }
}
