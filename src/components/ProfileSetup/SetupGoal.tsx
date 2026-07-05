import { useState } from "react";
import type { SetupStageProps } from "../UserSetup";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import type { Goal } from "@/lib/supabase/client";

interface FieldValue {
    value: number,
    valid: boolean
}

export default function SetupGoal({ onSuccess }: SetupStageProps) {
    const [weight, setWeight] = useState<FieldValue>({ value: 0, valid: true })
    const [kcal, setKcal] = useState<FieldValue>({ value: 0, valid: true })
    const [fat, setFat] = useState<FieldValue>({ value: 0, valid: true })
    const [carb, setCarb] = useState<FieldValue>({ value: 0, valid: true })
    const [protein, setProtein] = useState<FieldValue>({ value: 0, valid: true })

    const {session, setGoal} = useAppStore()

    async function onSubmit() {
        if (!session) return
        const {data, error} = await supabase.from('goals').insert([
            {user_id: session.user.id, weight: weight.value, kcal: kcal.value, fat: fat.value, carb: carb.value, protein: protein.value}
        ]).select()

        if (error){
            return
        }

        setGoal(data[0] as Goal)
        onSuccess()
    }

    return <>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="weight">Weight</FieldLabel>
                <Input id="weight" type="number" value={weight.value} aria-invalid={!weight.valid} onChange={(ev) => setWeight({ value: Number(ev.target.value), valid: true })} />
            </Field>
            <Field>
                <FieldLabel htmlFor="kcal">Calories</FieldLabel>
                <Input id="kcal" type="number" value={kcal.value} aria-invalid={!kcal.valid} onChange={(ev) => setKcal({ value: Number(ev.target.value), valid: true })} />
            </Field>
            <Field>
                <FieldLabel htmlFor="fat">Fat</FieldLabel>
                <Input id="fat" type="number" value={fat.value} aria-invalid={!fat.valid} onChange={(ev) => setFat({ value: Number(ev.target.value), valid: true })} />
            </Field>
            <Field>
                <FieldLabel htmlFor="carb">Carb</FieldLabel>
                <Input id="carb" type="number" value={carb.value} aria-invalid={!carb.valid} onChange={(ev) => setCarb({ value: Number(ev.target.value), valid: true })} />
            </Field>
            <Field>
                <FieldLabel htmlFor="protein">Protein</FieldLabel>
                <Input id="protein" type="number" value={protein.value} aria-invalid={!protein.valid} onChange={(ev) => setProtein({ value: Number(ev.target.value), valid: true })} />
            </Field>

        </FieldGroup>

        <Button className="cursor-pointer" onClick={onSubmit}>Complete</Button>
    </>
}