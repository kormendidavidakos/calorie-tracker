import { supabase } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { type Goal, type Profile} from '@/lib/supabase/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SetupProfile from "./ProfileSetup/SetupProfile";
import SetupGoal from "./ProfileSetup/SetupGoal";


interface SetupStep {
    title: string
    element: React.ReactNode
    needed: boolean
}

export interface SetupStageProps {
    onSuccess: () => void
}


export default function UserSetup() {
    const [ needsProfile, setNeedsProfile ] = useState(false) 
    const [ needsGoal, setNeedsGoal ] = useState(false)
    const { authState, profile, setProfile, goal, setGoal } = useAppStore()

    const setupSteps: SetupStep[] = [
        {title: 'Setup profile', element: <SetupProfile onSuccess={() => setNeedsProfile(false)}/>, needed: needsProfile},
        {title: 'Setup goal', element: <SetupGoal onSuccess={() => setNeedsGoal(false)}/>, needed: needsGoal}
    ]

    useEffect(() => {
        if (authState !== "authenticated")
            return

        if (profile === null){
            supabase.from('profiles').select('*').then(({data, error}) => {
                if (error || data.length === 0) {
                    setNeedsProfile(true)
                    return
                }
    
                setProfile(data[0] as Profile)
            })
        }

        if (goal === null){
            supabase.from('goals').select('*').order('created_at', {ascending: false}).then(({data, error}) => {
                if (error || data.length === 0) {
                    setNeedsGoal(true)
                    return
                }
    
                setGoal(data[0] as Goal)
            })
        }
        
    }, [authState])

    function getNextStep(){
        for (const step of setupSteps) {
            if (!step.needed) continue
            return step
        }

        return null
    }

    const nextStep = getNextStep()

    return <Dialog open={nextStep !== null} modal>
        <DialogContent showCloseButton={false} >
            <DialogHeader>
                <DialogTitle>
                    {nextStep?.title}
                </DialogTitle>
            </DialogHeader>
            
            {nextStep?.element}

        </DialogContent>
    </Dialog>

}