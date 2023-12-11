'use client'

import { getCardById } from '@/api/Api'
import { CardResponse } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'

const card = "w-full inset-x-0 aspect-video px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-gray-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

export default function Page() {
    const { projectId, taskId } = useParams();
    const [status, setStatus] = useState('loading')
    const [task, setTask] = useState({} as CardResponse)

    useEffect(() => {
        getCardById(Number(projectId), Number(taskId))
            .then(({ data: tasks, error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                }
                setTask(tasks)
                setStatus('ready')
            })
            .catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [projectId, taskId])

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
                        <span className="font-bold text-2xl flex justify-center">Редактировать предложение</span>
                        <div className="px-16 space-x-4 flex">
                            <label htmlFor="name">Изменить статус</label>
                            <select name="status" id="status" className="font-bold flex items-center justify-center text-center px-2 rounded-md bg-orange-300 text-sm w-fit">
                                <option value="new">NEW</option>
                                <option value="inprogress">IN PROGRESS</option>
                                <option value="accepted">ACCEPTED</option>
                                <option value="declined">REJECTED</option>
                            </select>
                        </div>
                        <div className="px-16">
                            <label htmlFor="title">Введите название задачи</label>
                            <input type="text" id="name" placeholder={task.title} className="w-full flex justify-center rounded-[7px] px-1" />
                        </div>
                        <div className="px-16">
                            <label htmlFor="summary">Опишите её (желательно, чтобы все её поняли)</label>
                            <input type="text" id="name" placeholder={task.summary} className="h-16 w-full items-start rounded-[7px] px-1 align-text-top text-ellipsis" />
                        </div> 
                        <div className="flex justify-center mt-4 px-36">
                            <Link className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="./">
                                <span className="flex items-center">Изменить</span>  
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Container>            
        </main>
    )
}