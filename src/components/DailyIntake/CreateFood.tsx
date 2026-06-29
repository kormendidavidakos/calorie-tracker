import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { supabase } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";


interface Props {
    defaultName: string
}

export default function CreateFood({ defaultName }: Props) {
    const [name, setName] = useState("")
    const [calories, setCalories] = useState(0)
    const [fat, setFat] = useState(0)
    const [carbs, setCarbs] = useState(0)
    const [protein, setProtein] = useState(0)
    const [open, setOpen] = useState(false)

    const {session} = useAppStore()

    useEffect(() => {
        setName(defaultName)
    }, [defaultName])

    function renderValue(value: number, unit: 'kcal'|'g'){
        if (value === 0) return ''
        return `${value}`
    }

    async function saveFood(){
        if (!name.trim() || !calories  || !session)
            return

        const {data, error} = await supabase.from('foods').insert({
            name: name.trim(), kcal: calories, fat, carb: carbs, protein, unit: 'g', base_amount: 100,
            user_id: session.user.id
        }).select('*')

        if (error) return
        setOpen(false)
    }

    useEffect(() => {
        if (open) return
        setName('')
        setCalories(0)
        setFat(0)
        setCarbs(0)
        setProtein(0)
    }, [open])


    return <Dialog modal open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild >
            <Button variant={"outline"} className="px-6 py-4 w-fit">
                <PlusIcon />
                Create
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Create Food
                </DialogTitle>
            </DialogHeader>

            <Field>
                <Label htmlFor="newFoodName">
                    Name
                </Label>
                <Input id="newFoodName" value={name} onChange={ev => setName(ev.target.value)}/>
                <Label htmlFor="newFoodCalories">
                    Calories
                </Label>
                <Input id="newFoodCalories" type="number" value={renderValue(calories, 'kcal')} onChange={ev => setCalories(+ev.target.value)}/>
                <Label htmlFor="newFoodFat">
                    Fat
                </Label>
                <Input id="newFoodFat" type="number" value={renderValue(fat, 'g')} onChange={ev => setFat(+ev.target.value)}/>
                <Label htmlFor="newFoodCarbs">
                    Carbs
                </Label>
                <Input id="newFoodCalories" type="number" value={renderValue(carbs, 'g')} onChange={ev => setCarbs(+ev.target.value)}/>
                <Label htmlFor="newFoodProtein">
                    Protein
                </Label>
                <Input id="newFoodProtein" type="number" value={renderValue(protein, 'g')} onChange={ev => setProtein(+ev.target.value)}/>
            </Field>
            <Button variant={"outline"} onClick={saveFood}>Create</Button>
        </DialogContent>


    </Dialog>
}