import { supabase } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { type Profile} from '@/lib/supabase/types'
import { Dialog } from "@/components/ui/dialog";



export default function ProfileSetup() {
    const [ username, setUsername ] = useState<string|null>(null)
    const { authState, profile, setProfile } = useAppStore()

    useEffect(() => {
        if (authState !== "authenticated" || profile !== null)
            return

        supabase.from('profile').select('*').then(({data, error}) => {
            console.log(data, error)
            if (error || data.length === 0) {
                setUsername('')
                return
            }

            const prof = data[0] as Profile

            setProfile(prof)
        })
         
        
    }, [authState])


    if (authState !== "authenticated" || profile !== null || username === null)
        return <></>

    return <Dialog>

    </Dialog>

}