import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// TODO Тут не нужно вытаскивать из шрифта латинницу,
// так как ожидается, что бОльшая часть контента будет на русском языке 
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Retro doard',
    description: 'Доска с задачами для ретро',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}