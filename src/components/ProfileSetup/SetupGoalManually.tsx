import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import type { SetupGoalProps } from "./SetupGoal";


export default function SetupGoalManually({ goalSetup, setGoalSetup }: SetupGoalProps) {
    const [weightValid, setWeightValid] = useState(true)
    const [kcalValid, setKcalValid] = useState(true)
    const [fatValid, setFatValid] = useState(true)
    const [carbValid, setCarbValid] = useState(true)
    const [proteinValid, setProteinValid] = useState(true)

    const { carb, fat, kcal, protein, weight } = goalSetup

    function set(key: string, to: string) {
        setGoalSetup(prev => ({ ...prev, [key]: Number(to) }))
    }

    return <>
        <FieldGroup>
            <Field>
                <FieldLabel htmlFor="weight">Weight</FieldLabel>
                <Input id="weight" type="number" value={weight} aria-invalid={!weightValid} onChange={(ev) => set("weight", ev.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="kcal">Calories</FieldLabel>
                <Input id="kcal" type="number" value={kcal} aria-invalid={!kcalValid} onChange={(ev) => set("kcal", ev.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="fat">Fat</FieldLabel>
                <Input id="fat" type="number" value={fat} aria-invalid={!fatValid} onChange={(ev) => set("fat", ev.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="carb">Carb</FieldLabel>
                <Input id="carb" type="number" value={carb} aria-invalid={!carbValid} onChange={(ev) => set("carb", ev.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="protein">Protein</FieldLabel>
                <Input id="protein" type="number" value={protein} aria-invalid={!proteinValid} onChange={(ev) => set("protein", ev.target.value)} />
            </Field>

        </FieldGroup>

    </>
}