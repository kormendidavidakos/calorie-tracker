import dateHelpers from "@/helpers/dateHelpers";
import type { DailyFood } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateSelector() {
    const { setRenderedDay, renderedDay, dailyFoods } = useAppStore()
    const differentDays = [...new Set(dailyFoods.map(f => dateHelpers.getDate(f.created_at)))].toSorted()

    const days = differentDays.map(day => dailyFoods.filter(f => dateHelpers.getDate(f.created_at) === day)) as DailyFood[][]

    if (!renderedDay.length) return <></>

    const currentDayIndex = days.findIndex(d => dateHelpers.getDate(d[0].created_at) === dateHelpers.getDate(renderedDay[0].created_at))

    const today = dateHelpers.getDate()
    function stepDayBy(offset: number) {
        const stepTo = currentDayIndex + offset
        if (currentDayIndex === -1 || stepTo < 0 || stepTo >= days.length) return

        setRenderedDay(days[stepTo])
    }
    
    const renderedDate = dateHelpers.getDate(renderedDay[0].created_at) ?? today
    return <div className="flex justify-center items-center w-full gap-2 cursor-default select-none">
        {currentDayIndex > 0 ?
            <ChevronLeft className="cursor-pointer hover:text-primary transition" onClick={() => stepDayBy(-1)} />
            : <div className="w-6">&nbsp;</div>
        }
        <h1 className="text-xl w-30">{renderedDate.replaceAll('-', '. ')}</h1>
        {currentDayIndex < days.length - 1 ?
            <ChevronRight className="cursor-pointer hover:text-primary transition" onClick={() => stepDayBy(1)} />
            : <div className="w-6">&nbsp;</div>
        }
    </div>

}