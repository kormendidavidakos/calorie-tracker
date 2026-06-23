export interface Profile {
    id: string
    created_at: string
    user_id: string

    name: string
}

export interface Day {
    id: string
    created_at: string
    user_id: string

    weight: number
    kcal: number
    fat: number
    carb: number
    protein: number
}

export const BaseUnits = ['g', 'ml'] as const
export type BaseUnit = typeof BaseUnits[number]

export interface Food {
    id: string
    created_at: string
    user_id: string

    name: string
    kcal: number
    fat: number
    carb: number
    protein: number

    unit: BaseUnit
    base_amount: number
}

export interface Goal {
    id: string
    created_at: string
    user_id: string

    weight: number
    kcal: number
    fat: number
    carb: number
    protein: number
}

export interface Intake {
    id: string
    created_at: string
    user_id: string
    food_id: string

    amount: number
}