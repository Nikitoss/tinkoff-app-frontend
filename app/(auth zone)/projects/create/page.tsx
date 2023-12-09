'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'
import { createProject } from '@/api/Api'
import { ProjectRequest, ProjectResponse } from '@/api/dataСontracts'
import { useState } from 'react'

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
                        <div className="flex justify-center mt-4 px-36">
                            <Link className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="./" >
                                <span className="flex items-center">Добавить</span>
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