import { z } from 'zod'

export interface UnitObject {
    name: string
    unitsPerPack: number
    id: string
}

class Unit {
    name: string
    unitsPerPack: number
    id: string
    constructor({ name, unitsPerPack, id }: UnitObject) {
        this.name = name
        this.unitsPerPack = unitsPerPack
        this.id = id
    }

    toJson(): string {
        return JSON.stringify(this)
    }

    static scheme = z.object({
        name: z.string(),
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
            unitsPerPack: this.unitsPerPack,
            id: this.id
        }
    }

    static fromObject(obj: UnitObject): Unit {
        return new Unit({ name: obj.name, unitsPerPack: obj.unitsPerPack, id: obj.id })
    }
}
export default Unit
