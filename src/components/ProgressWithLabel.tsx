import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"

interface Props {
    title?: string
    goal: number
    actual: number
    displayPercent?: boolean
    displayExact?: boolean
    unit?: string
}

export function ProgressWithLabel({ displayPercent = true, title = '', displayExact = true, goal, actual, unit='' }: Props) {
    const safeGoal = goal === 0 ? 1 : goal
    let percent = Math.round(actual / safeGoal * 100)
    percent = Math.min(Math.max(percent, 0), 100)

    return (
        <Field className="w-full max-w-sm select-none">
            <FieldLabel htmlFor={`progress-${title}`}>
                <span>{title}</span>
                <span className="ml-auto">{displayPercent && percent}%</span>
            </FieldLabel>
            <Progress value={percent} id={`progress-${title}`} />
            {displayExact && <FieldLabel className="flex justify-center">
                {actual} {unit} / {goal} {unit}
            </FieldLabel> }
        </Field>
    )
}
