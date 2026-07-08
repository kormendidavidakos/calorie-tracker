import { useEffect, useState } from "react";
import type { SetupGoalProps } from "./SetupGoal";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import SwitchButton from "../SwitchButton";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { differenceInDays, format, parse } from "date-fns";
import dateHelpers from "@/helpers/dateHelpers";

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy' | 'extreme'
interface InputFields {
    currentWeight: number
    gender: 'male' | 'female'
    activityLevel: ActivityLevel | ''
    height: number
    age: number

    targetWeight: number
    targetBy: string
}

const activityLevels = [
    { label: 'Sedentary lifestyle', value: 'sedentary' },
    { label: 'Light activity', value: 'light' },
    { label: 'Moderate activity', value: 'moderate' },
    { label: 'Heavy activity', value: 'heavy' },
    { label: 'Extreme activity', value: 'extreme' },
] as const

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
  extreme: 1.9,
};

const fieldLabels = {
    currentWeight: 'Current weight',
    height: 'Height',
    age: 'Age',
    targetWeight: 'Target weight',
} as any

export default function SetupGoalAutomatically({ goalSetup, setGoalSetup }: SetupGoalProps) {
    const [goalValues, setGoalValues] = useState<InputFields>({ activityLevel: '', age: 0, currentWeight: 0, gender: 'male', height: 0, targetBy: '', targetWeight: 0 })
    const [popverOpen, setPopoverOpen] = useState(false)

    function numberField(key: keyof InputFields) {
        const val = goalValues[key]
        return <Field>
            <FieldLabel htmlFor={key}>{fieldLabels[key as string] ?? ''}</FieldLabel>
            <Input id={key} type="number" value={val === 0 ? '' : val} onChange={(ev) => setGoalValues(prev => ({ ...prev, [key]: Number(ev.target.value) }))} />
        </Field>
    }

    useEffect(() => {
        const {activityLevel, age, currentWeight, gender, height, targetBy, targetWeight} = goalValues
        if (!activityLevel || !age || !currentWeight || !gender || !height || !targetBy || !targetWeight)
            return

        const now = new Date()
        const targetDate = parse(targetBy, 'yyyy-MM-dd', new Date)
        const days = differenceInDays(targetDate, now)
        if (days <= 0) return

        let bmr = (10 * currentWeight) + (6.25 * height) - (5 * age) + 5
        if (gender === 'female')
            bmr -= 166

        const activityMult = activityMultipliers[activityLevel]

        const tdee = bmr * activityMult
        const neededCaloriesSum = (targetWeight - currentWeight) * 7700
        const calorieDiffPerDay = neededCaloriesSum / days
        const kcalPerDay = Math.round(tdee + calorieDiffPerDay)

        let caloriesToSpred = kcalPerDay
        const carb = Math.round(.45 * caloriesToSpred / 3)
        caloriesToSpred -= carb * 3
        const protein = Math.round(activityMult * currentWeight)
        caloriesToSpred -= 4 * protein
        const fat = Math.round(caloriesToSpred / 9)
        
        setGoalSetup({carb, protein, fat, kcal: kcalPerDay, weight: targetWeight})
    }, [goalValues])

    return <>
        {numberField('currentWeight')}

        <FieldLabel>Gender</FieldLabel>
        <SwitchButton place="start" values={['Male', 'Female']} onChange={(to) => setGoalValues(prev => ({ ...prev, gender: to.toLowerCase() }))} />

        <FieldLabel>Activity level</FieldLabel>
        <Select onValueChange={(to: any) => setGoalValues(prev => ({ ...prev, activityLevel: to }))}>
            <SelectTrigger>
                <SelectValue placeholder="Activity level" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {activityLevels.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

        {numberField('age')}
        {numberField('height')}

        {numberField('targetWeight')}

        <Popover open={popverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" data-empty={!goalValues.targetBy} className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground">
                    <CalendarIcon />
                    {goalValues.targetBy ? goalValues.targetBy : <span>Target date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={parse(goalValues.targetBy, "yyyy-MM-dd", new Date)} 
                        onSelect={to => {
                            setGoalValues(prev => ({...prev, targetBy: to ? format(to, "yyyy-MM-dd") : ''}));
                            setPopoverOpen(false)
                        }} />
            </PopoverContent>
        </Popover>
    </>
}