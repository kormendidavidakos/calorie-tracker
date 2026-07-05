import { supabase, type Food } from "@/lib/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAppStore } from "@/store/useAppStore";

interface Props {
    food: Food | null
    onClose: (pt: boolean) => void
}

export default function AddFoodAmount({ food, onClose }: Props) {
    const {session, setDailyFoods, dailyFoods} = useAppStore()
    const [amount, setAmount] = useState(0)
    
    useEffect(() => {
        setAmount(food?.base_amount ?? 0)
    }, [food])
    
    if (!food) return <></>

    function close(open: boolean, pt: boolean) {
        if (open) return
        onClose(pt)
    }

    async function save() {
        if (!session || !amount || !food) return
        const { data, error } = await supabase.from('intake').insert({
            amount, food_id: food.id, user_id: session.user.id
        }).select('*')

        if (error || !data.length) return

        const newEntry = data[0]
        setDailyFoods([...dailyFoods, {
            amount: newEntry.amount,
            kcal: food.kcal * amount / 100,
            carb: food.carb * amount / 100,
            fat:  food.fat  * amount / 100,
            protein: food.protein * amount / 100,
            name: food.name,
            created_at: newEntry.created_at,
            user_id: newEntry.user_id
        }])

        close(false, true)
    }


    return <Dialog open modal onOpenChange={(closed) => close(closed, false)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {food.name}
                </DialogTitle>
            </DialogHeader>

            <h1 className="text-lg">Per {food.base_amount}{food.unit}:</h1>
            <div className="grid grid-cols-2 gap-1 w-[50%]">
                <p>Calories:</p> <p>{food.kcal} kcal</p>
                <p>Fat:</p> <p>{food.fat} g</p>
                <p>Carbs:</p> <p>{food.carb} g</p>
                <p>Protein:</p> <p>{food.protein} g</p>
            </div>

            <Field>
                <FieldLabel>Amount:</FieldLabel>
                <div className="flex gap-4">
                    <Input type="number" value={amount} onChange={(ev) => setAmount(+ev.target.value)}/>
                    <Select defaultValue={food.unit}>
                        <SelectTrigger className="w-25">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent align="start" className="min-w-0">
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="ml">ml</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={save}>Save</Button>
                </div>
            </Field>


        </DialogContent>
    </Dialog>
}