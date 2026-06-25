import { useAppStore } from "@/store/useAppStore";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateSelector() {
    const { setRenderedDay, days, renderedDay } = useAppStore()
    const currentDayIndex = days.findIndex(d => d.id === renderedDay?.id)

    const today = formatDate(new Date(), 'yyyy-MM-dd')
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
        <h1 className="text-xl">{renderedDay?.day ?? today}</h1>
        {currentDayIndex < days.length - 1 ?
            <ChevronRight className="cursor-pointer hover:text-primary transition" onClick={() => stepDayBy(1)} />
            : <div className="w-6">&nbsp;</div>
        }
    </div>

}