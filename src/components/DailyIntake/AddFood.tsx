import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { type Food } from "@/lib/supabase/types"

interface Props {
}

export default function AddFood({}: Props) {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<Food[]>([])

    useEffect(() => {
        if (!search.trim()) return
        
        const timeoutId = setTimeout(() => {
            console.log(search)
        }, 1000)

        return () => clearTimeout(timeoutId)
    }, [search])

    return <Dialog modal>
        <DialogTrigger asChild>
            <Button variant={"outline"} className="px-6 py-4 text-lg font-bold">
                Add
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Add Food
                </DialogTitle>
            </DialogHeader>
            
            <Input autoFocus value={search} onChange={ev => setSearch(ev.target.value)}/>

        </DialogContent>
    </Dialog>
}