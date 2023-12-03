'use client'

import NavBar from "./_components/NavBar"
import React from "react"

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <main className="relative ml-24">
                {children}
            </main>
        </>
    )
}