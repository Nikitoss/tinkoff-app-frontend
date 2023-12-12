'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import { createCard } from '@/api/Api'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Page() {
    const params = useParams()
    const projectId = params.projectId
    const [titleValues, setTitleValues] = useState("")
    const [summaryValues, setSummaryValues] = useState("")

    type Status = "NEW" | "IN_WORK" | "ACCEPTED" | "DISMISS"

    const values = {
        title: titleValues,
        summary: summaryValues,
        status: "NEW" as Status
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
                    <form className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                        <span className="font-bold text-2xl flex justify-center">Добавить предложение</span>
                        <div className="px-16">
                            <label htmlFor="title">Введите название задачи</label>
                            <input
                                type="text"
                                id="title"
                                value="Отсутствие печенек"
                                className="w-full flex justify-center rounded-[7px] px-1"
                                onChange={(event) =>
                                    setTitleValues(event.target.value)
                                }
                            />
                        </div>
                        <div className="px-16">
                            <label htmlFor="summary">Опишите её (желательно, чтобы все её поняли)</label>
                            <input
                                type="text" 
                                id="summary"
                                value="Как ни подойдешь на кухню, все время нет печенек, я начинаю грустить и становлюсь злюкой."
                                className="h-24 w-full rounded-[7px] px-1 inline-block align-text-top text-ellipsis"
                                onChange={(event) =>
                                    setSummaryValues(event.target.value)
                                }
                            />
                        </div> 
                        <div className="flex justify-center mt-4 px-36">
                            <Link
                                type="submit"
                                href="./../"
                                className="w-full h-12 px-10 mt-2 border flex justify-center items-center gap-2 rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300"
                                onClick={(event) =>
                                    createCard(Number(projectId), values)
                                }
                            >
                                Добавить
                            </Link>
                        </div>
                    </form>
                </Grid>
            </Container>
        </main>
    )
}

async function getData(projectId: number) {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/projects/${projectId}/cards`)
   
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}