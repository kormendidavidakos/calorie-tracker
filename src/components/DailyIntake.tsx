import { supabase } from "@/lib/supabase/client"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import DailyProgress from "./DailyIntake/DailyProgress"
import AddFood from "./DailyIntake/AddFood"
import DateSelector from "./DailyIntake/DateSelector"
import dateHelpers from "@/helpers/dateHelpers"


export default function DailyIntake() {
    const { session, setRenderedDay, renderedDay, setDailyFoods, dailyFoods } = useAppStore()

    useEffect(() => {
        if (!session || dailyFoods.length) return

        supabase.from('daily_food').select('*').then(({ data, error }) => { // TODO: this will break after user has >1000 intake entries
            if (error) return

            setDailyFoods(data as any)
        })
    }, [session])

    useEffect(() => {
        if (!session) return
        const targetDay = dateHelpers.getDate(renderedDay.length ? renderedDay[0].created_at : undefined)

        let dailyFood = dailyFoods.filter(d => dateHelpers.getDate(d.created_at) === targetDay)

        setRenderedDay(dailyFood)
    }, [dailyFoods, session])


    return <div className="flex flex-col items-center p-2 w-full">
        <div className="flex flex-col items-center p-2 w-full gap-4">
            <DateSelector />
            <DailyProgress />
            <AddFood/>
        </div>
    </div>
}