'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import { createProject } from '@/api/Api'
import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
    const [titleValues, setTitleValues] = useState("")

    const values = {
        title: titleValues
    }
    
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
                            <input
                                type="text"
                                id="title"
                                minLength={2}
                                maxLength={30}
                                placeholder="Мой последний проект"
                                className="w-full flex justify-center rounded-[7px] p-2 whitespace-normal"
                                onChange={(event) =>
                                    setTitleValues(event.target.value)
                                }
                                required
                            />
                        </div>   
                        <div className="flex justify-center mt-4 px-36">
                            <Link
                                type="submit"
                                href="./"
                                className="w-full h-12 px-10 mt-2 border flex justify-center items-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                                onClick={() => {
                                    createProject(values)
                                }}
                            >
                                Добавить
                            </Link>
                        </div>
                    </div>  
                </Grid>
            </Container>
        </main>
    )
}