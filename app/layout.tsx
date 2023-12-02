import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic-ext'] })

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