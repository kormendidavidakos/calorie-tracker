import { useState } from "react";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { SetupStageProps } from "../UserSetup";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

export default function SetupProfile({ onSuccess }: SetupStageProps) {
    const [username, setUsername] = useState('')
    const [isValid, setIsValid] = useState(true)
    const { setProfile, session } = useAppStore()

    function validate() {
        let name = username.trim()
        if (name.length === 0) {
            setIsValid(false)
            return false
        }

        return true
    }

    async function onSubmit(){
        if (!validate() || !session) return

        const {data, error} = await supabase.from('profiles').insert([
            {name: username, user_id: session.user.id}
        ]).select()

        if (error){
            setIsValid(false)
            return
        }

        setProfile(data[0] as Profile)
        onSuccess()
    }

    return <>
        <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" value={username} aria-invalid={!isValid} onChange={(ev) => {setUsername(ev.target.value); setIsValid(true)}} />
        </Field>
        <Button className="cursor-pointer" onClick={onSubmit}>Next</Button>
    </>
}