import { useAppStore } from "@/store/useAppStore"
import { ProgressWithLabel } from "../ProgressWithLabel"

export default function DailyProgress() {
    const { renderedDay, goal } = useAppStore()

    if (!renderedDay || !goal) return <></>
    
    return <div className="flex flex-col gap-2 w-[90%] mx-auto items-center">
        <ProgressWithLabel title="Calories"          goal={goal.kcal}    actual={renderedDay.kcal}/>
        <ProgressWithLabel title="Fat"      unit='g' goal={goal.fat}     actual={renderedDay.fat}/>
        <ProgressWithLabel title="Carb"     unit='g' goal={goal.carb}    actual={renderedDay.carb}/>
        <ProgressWithLabel title="Protein"  unit='g' goal={goal.protein} actual={renderedDay.protein}/>
    </div>
}