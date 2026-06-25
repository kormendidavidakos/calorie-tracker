import { useRef } from "react";

function useDebounce(cb: (...args: any[]) => void, delay: number) {
    const timeoutId = useRef<number | null>(null)

    return function (...args: any[]) {
        if (timeoutId.current)
            clearTimeout(timeoutId.current)

        timeoutId.current = setTimeout(() => cb(...args), delay)
    }
}