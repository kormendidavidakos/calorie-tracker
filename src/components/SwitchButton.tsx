import { useState } from "react"

interface Props {values: [string, string], onChange: (value: any) => void, place?: 'center' | 'start' | 'end'}

export default function SwitchButton({values, onChange, place = 'center'}: Props) {
    const [value, setValue] = useState<typeof values[number]>(values[0])

    function set(to: typeof value){
        setValue(to)
        onChange(to)
    }

    return <div className={`flex justify-${place}`}>
        <div className={`cursor-pointer p-2 w-30 text-center border border-white hover:bg-white hover:text-background 
                            transition-colors border-r-0 rounded-l-2xl ${value === values[0] ? 'bg-white text-background' : ''}`}
            onClick={() => set(values[0])}>
            {values[0]}
        </div>
        <div className={`cursor-pointer p-2 w-30 text-center border border-white hover:bg-white hover:text-background 
                            transition-colors rounded-r-2xl ${value === values[1] ? 'bg-white text-background' : ''}`}
            onClick={() => set(values[1])}>
            {values[1]}
        </div>
    </div>

}