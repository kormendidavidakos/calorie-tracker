import { useAppStore } from "@/store/useAppStore";
import { HouseIcon, UserIcon } from "lucide-react";

export default function Navbar() {
    const { page, setPage } = useAppStore()

    const icons: Record<typeof page, any> = {
        home: HouseIcon,
        profile: UserIcon
    }

    function renderIcons(){
        return Object.entries(icons).map(([name, Icon], idx) => {
            let classList = "transition cursor-pointer"
            if (page === name)
                classList += " text-sky-400"

            const containerClass = idx < Object.keys(icons).length - 1 ? 'border-r border-accent' : ''

            return <div className={`${containerClass} w-full flex justify-center h-full items-center`}>
                <Icon className={classList} onClick={() => setPage(name as typeof page)}/>

                </div>
        })
    }
    
    return <div className="fixed bg-background bottom-0 left-0 p-3 w-full h-15 flex justify-around items-center border-t border-accent">
        {renderIcons()}
    </div>
}