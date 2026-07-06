import SetupGoal from "@/components/ProfileSetup/SetupGoal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAppStore } from "@/store/useAppStore"
import { UserIcon } from "lucide-react"
import { useState } from "react"

export default function Profile() {
    const { profile } = useAppStore()
    const [setupGoalOpen, setSetupGoalOpen] = useState(false)

    if (!profile) 
        return <></>
    
    return <>
        <div className="flex p-8 gap-4">
            <Avatar size="lg" className="size-18!" >

                <AvatarFallback>
                    <UserIcon className="size-10!"/>
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col h-full w-full gap-2">
                <h1 className="text-xl truncate w-full">{profile.name}</h1>
                <Dialog open={setupGoalOpen} onOpenChange={setSetupGoalOpen}>
                    <DialogTrigger asChild><Button variant={'secondary'} className="w-fit px-6">Setup goals</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Setup goals</DialogTitle>
                        </DialogHeader>
                        <SetupGoal onSuccess={() => setSetupGoalOpen(false)}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </>
}