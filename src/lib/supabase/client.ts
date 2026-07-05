import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { type Database } from './supabase'

export const supabase = createSupabaseClient<Database>(
	import.meta.env.VITE_SUPABASE_URL!,
	import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
)

export type NotNull<T> = { [P in keyof T]-?: NotNull<NonNullable<T[P]>> };

type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
type Enum<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
type View<T extends keyof Database['public']['Views']> = NotNull<Database['public']['Views'][T]['Row']>

export type BaseUnit = Enum<'base_unit'>
export const BASE_UNIT = ['g', 'ml'] as const

export type Profile = Row<'profiles'>
export type Day = Row<'days'>
export type Food = Row<'foods'>
export type Goal = Row<'goals'>
export type Intake = Row<'intake'>
export type DailyFood = View<'daily_food'>

