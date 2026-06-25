import { supabase } from "@/lib/supabase/client"
import type { Day } from "@/lib/supabase/types"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { formatDate, isToday, parseISO } from 'date-fns'
import DailyProgress from "./DailyIntake/DailyProgress"
import AddFood from "./DailyIntake/AddFood"
import DateSelector from "./DailyIntake/DateSelector"


export default function DailyIntake() {
    const { setDays, session, setRenderedDay, days, renderedDay } = useAppStore()

    const today = formatDate(new Date(), 'yyyy-MM-dd')

    useEffect(() => {
        if (!session) return

        supabase.from('days').select('*').then(async ({ data, error }) => {
            if (error) return

            let days = data as Day[]
            const todaySaved = days.find(day => isToday(parseISO(day.created_at)))

            if (todaySaved === undefined) {
                const { data, error } = await supabase.from('days').insert({
                    user_id: session.user.id,
                    kcal: 0,
                    fat: 0,
                    carb: 0,
                    protein: 0,
                    weight: 0,
                    day: today
                } as Day).select()

                if (error) return
                days = [...days, data[0] as Day]
            }


            setDays(days)
        })
    }, [setDays, session])

    useEffect(() => {
        if (renderedDay !== null && renderedDay.day !== today) return

        const day = days.find(d => d.day === today)
        if (day === undefined) return

        setRenderedDay(day)
    }, [days, setRenderedDay])


    return <div className="flex flex-col items-center p-2 w-full">
        <div className="flex flex-col items-center p-2 w-full gap-4">
            <DateSelector />
            <DailyProgress />
            <AddFood/>
        </div>
    </div>
}