import { useAppStore } from "@/store/useAppStore";
import { ScrollArea } from "../ui/scroll-area";
import type { DailyFood } from "@/lib/supabase/client";
import { ChevronRight } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

export default function DailyFoods() {
    const { renderedDay } = useAppStore()

    function foodCard(food: DailyFood, idx: number){
        const borderClass = idx < renderedDay.length - 1 ? 'border-b border-accent' : ''
        return <div key={idx} className={`flex p-3 pr-1 gap-2 ${borderClass}`}>
            <h1 className="w-[65%] truncate ">{food.name}</h1>
            <h2 className="w-[25%] truncate text-end">{food.amount} g</h2>
            <Drawer>
                <DrawerTrigger asChild>
                    <p className="w-[10%]"><ChevronRight/></p>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{food.name}</DrawerTitle>
                        <DrawerDescription>{food.amount} g</DrawerDescription>
                        <div className="flex flex-col gap-2 w-full p-4 my-6">
                            <div className="flex items-center justify-between">
                                <p>Calories</p>
                                <p>{food.kcal} kcal</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Fat</p>
                                <p>{food.fat} g</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Carbs</p>
                                <p>{food.carb} g</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Protein</p>
                                <p>{food.protein} g</p>
                            </div>
                        </div>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </div>
    }

    function getContent(){
        if (renderedDay.length === 0) return <div className="w-full h-70 flex items-center justify-center">
            No food recorded
        </div>
        
        return <div className="w-full h-70 flex flex-col">
            {renderedDay.map((food, idx) => foodCard(food, idx))}
        </div>
    }

    return <ScrollArea className="h-fit w-[90%] border border-accent rounded mt-4" >
        {getContent()}
    </ScrollArea>
}