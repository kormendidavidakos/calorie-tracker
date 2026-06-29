import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { type Food } from "@/lib/supabase/types"
import { useDebounce } from "@/hooks/useDebounce"
import { Search } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import CreateFood from "./CreateFood"

interface Props {
}

export default function AddFood({ }: Props) {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<Food[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const searchName = debouncedSearch.trim()
        if (!searchName) {
            setSearchResult([])
            return
        }

        setIsSearching(true)
        supabase.from('foods')
            .select('*')
            .ilike('name', `%${searchName}%`)
            .limit(10).then(({ data, error }) => {
                setIsSearching(false)
                if (error) return

                setSearchResult(data || [])
            })
    }, [debouncedSearch])

    function renderSearchResult() {
        if (debouncedSearch.length === 0)
            return <></>
        if (isSearching)
            return <>Searching...</>
        if (searchResult.length === 0)
            return <>No result</>

        return <ul className="flex flex-col divide-y">
            {searchResult.map((food, idx) => (
                <li key={idx} className="p-3 hover:bg-slate-50 cursor-pointer">
                    {food.name}
                </li>
            ))}
        </ul>
    }

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

            <div className="w-full max-w-md space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search food"
                        className="px-10"
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {isSearching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4 items-center">
                    {renderSearchResult()}
                    <CreateFood defaultName={search.trim()}/>
                </div>
            </div>

        </DialogContent>
    </Dialog>
}