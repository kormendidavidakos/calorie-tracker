import { useAppStore } from "@/store/useAppStore";
import { HouseIcon, UserIcon } from "lucide-react";

export default function Navbar() {
    const { page, setPage } = useAppStore()

    const icons: Record<typeof page, any> = {
        home: HouseIcon,
        profile: UserIcon
    }

    function renderIcons(){
        return Object.entries(icons).map(([name, Icon]) => {
            let classList = "transition"
            if (page === name)
                classList += " text-sky-400"

            return <Icon className={classList} onClick={() => setPage(name as typeof page)}/>
        })
    }
    
    return <div className="w-full h-15 flex justify-around items-center border-t border-accent">
        {renderIcons()}
    </div>
}