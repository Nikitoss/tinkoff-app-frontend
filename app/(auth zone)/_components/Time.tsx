import { parseISO, format } from 'date-fns'

export default function Time({ timeString }: { timeString: string }) {
    const date = parseISO(timeString)

    return (
        <time dateTime={timeString}>{format(date, 'H:M')}</time>
    )
}