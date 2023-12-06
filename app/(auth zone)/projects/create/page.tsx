'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'

export default function Page() {
    return (
        <main>
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="min-h-screen"
                >
                    <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                        <span className="font-bold text-2xl flex justify-center">Добавить проект</span>
                        <div className="px-16 space-y-1">
                            <label htmlFor="name">Введите название проекта</label>
                            <input type="text" id="name" placeholder="Мой последний проект" className="w-full flex justify-center rounded-[7px] p-2 whitespace-normal" />
                        </div>   
                        <div className="flex justify-center">
                            <Link className="flex items-center h-12 px-16 border rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="/projects">
                                Добавить
                            </Link>
                        </div>
                    </div>  
                </Grid>
            </Container>
        </main>
    )
}

async function getData() {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/projects/`)
   
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}