import { z } from 'zod'

export interface UnitObject {
    name: string
    numberOfPacks: number
    price: number
    unitsPerPack: number
    id: string
}

class Unit {
    name: string
    numberOfPacks: number
    price: number
    unitsPerPack: number
    id: string
    constructor(
        name: string,
        numberOfPacks: number,
        price: number,
        unitsPerPack: number,
        id: string
    ) {
        this.name = name
        this.numberOfPacks = numberOfPacks
        this.price = price
        this.unitsPerPack = unitsPerPack
        this.id = id
    }

    get pricePerPack(): number {
        return this.price * this.unitsPerPack
    }
    get totalPrice(): number {
        return this.pricePerPack * this.numberOfPacks
    }
    toJson(): string {
        return JSON.stringify(this)
    }

    static scheme = z.object({
        name: z.string(),
        numberOfPacks: z.number(),
        price: z.number(),
        unitsPerPack: z.number(),
        id: z.string()
    })

    static fromJson(json: string): Unit {
        const obj = JSON.parse(json)
        return Unit.fromObject(obj)
    }
    toObject(): UnitObject {
        return {
            name: this.name,
            numberOfPacks: this.numberOfPacks,
            price: this.price,
            unitsPerPack: this.unitsPerPack,
            id: this.id
        }
    }

    static fromObject(obj: UnitObject): Unit {
        return new Unit(obj.name, obj.numberOfPacks, obj.price, obj.unitsPerPack, obj.id)
    }
}
export default Unit
