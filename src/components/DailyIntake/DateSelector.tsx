import dateHelpers from "@/helpers/dateHelpers";
import type { DailyFood } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateSelector() {
    const { setRenderedDay, renderedDay, dailyFoods } = useAppStore()

    const differentDays = [...new Set(dailyFoods.map(f => dateHelpers.getDate(f?.created_at)))].toSorted()
    const today = dateHelpers.getDate()
    if (differentDays.at(-1) !== today)
        differentDays.push(today)

    const days = differentDays.map(day => dailyFoods.filter(f => dateHelpers.getDate(f?.created_at) === day)) as DailyFood[][] ?? []


    const renderedDate = renderedDay.length > 0 ? dateHelpers.getDate(renderedDay[0].created_at) : today
    const currentDayIndex = days.findIndex(d => dateHelpers.getDate(d[0]?.created_at) === renderedDate)
    
    function stepDayBy(offset: number) {
        const stepTo = currentDayIndex + offset
        if (currentDayIndex === -1 || stepTo < 0 || stepTo >= days.length) return

        setRenderedDay(days[stepTo])
    }
    
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