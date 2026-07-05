import { formatDate, parseISO } from "date-fns"

const dateHelpers = {
    getDate: (from?: string | Date) => {
        if (from === undefined)
            from = new Date()
        if (typeof from === 'string')
            from = parseISO(from)

        return formatDate(from, 'yyyy-MM-dd')
    }
} as const

export default dateHelpers