import { supabase, } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { useAppStore } from "@/store/useAppStore";
import type { SetupStageProps } from "../UserSetup";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Database } from "@/lib/supabase/supabase";
import SetupGoalAutomatically from "./SetupGoalAutomatically";
import SetupGoalManually from "./SetupGoalManually";
import SwitchButton from "../SwitchButton";


export type GoalSetup = Database['public']['Tables']['goals']['Insert']
export interface SetupGoalProps {
    goalSetup: GoalSetup
    setGoalSetup: Dispatch<SetStateAction<GoalSetup>>
}

export default function SetupGoal({ onSuccess }: SetupStageProps) {
    const { session, setGoal, goal } = useAppStore()

    const [goalSetup, setGoalSetup] = useState<GoalSetup>({carb: 0, fat: 0, kcal: 0, protein: 0, weight: 0})
    const [mode, setMode] = useState<'Manual'|'Automatic'>('Automatic')

    useEffect(() => {
        if (!goal) return

        setGoalSetup({...goal})
    }, [goal])


    async function onSubmit() {
        if (!session) return

        const {carb, fat, kcal, protein, weight} = goalSetup
        if (!carb || !fat || !kcal || !protein || !weight) return

        const { data, error } = await supabase.from('goals').insert([
            { user_id: session.user.id, weight, kcal, fat, carb, protein }
        ]).select()

        if (error || !data.length) return

        setGoal(data[0])
        onSuccess()
    }


    return <>
        <SwitchButton values={['Automatic', 'Manual']} onChange={setMode}/>
        {mode === 'Automatic' ? 
            <SetupGoalAutomatically goalSetup={goalSetup} setGoalSetup={setGoalSetup}/> :
            <SetupGoalManually goalSetup={goalSetup} setGoalSetup={setGoalSetup}/>}

        <Button className="cursor-pointer" onClick={onSubmit}>{goal === null ? 'Complete' : 'Save'}</Button>
    </>
}