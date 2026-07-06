import { useAppStore } from "@/store/useAppStore"
import { ProgressWithLabel } from "../ProgressWithLabel"

export default function DailyProgress() {
    const { renderedDay, goal } = useAppStore()

    if (!renderedDay || !goal) return <></>

    const actual = {
        kcal: Math.round(renderedDay.map(d => d.kcal).reduce((p, c) => p + c, 0)),
        fat: Math.round(renderedDay.map(d => d.fat).reduce((p, c) => p + c, 0)),
        carb: Math.round(renderedDay.map(d => d.carb).reduce((p, c) => p + c, 0)),
        protein: Math.round(renderedDay.map(d => d.protein).reduce((p, c) => p + c, 0)),
    }
    
    return <div className="flex flex-col gap-2 w-[90%] mx-auto items-center">
        <ProgressWithLabel title="Calories"          goal={goal.kcal}    actual={actual.kcal}/>
        <ProgressWithLabel title="Fat"      unit='g' goal={goal.fat}     actual={actual.fat}/>
        <ProgressWithLabel title="Carb"     unit='g' goal={goal.carb}    actual={actual.carb}/>
        <ProgressWithLabel title="Protein"  unit='g' goal={goal.protein} actual={actual.protein}/>
    </div>
}