'use client'

import NavBar from "./_components/NavBar"
import React from "react"

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavBar />
            <main className="overflow-hidden relative ml-24">
                {children}
            </main>
        </>
    )
}