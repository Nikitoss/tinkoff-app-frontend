'use client'

import { getCardById, updateCard } from '@/api/Api'
import { CardResponse } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import AuthChecker from '@/app/(auth zone)/_components/AuthChecker'

export default function Page() {
    const { projectId, taskId } = useParams()
    const router = useRouter()

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

    const [titleValues, setTitleValues] = useState(task.title)
    const [summaryValues, setSummaryValues] = useState(task.summary)
    const [hasError, setError] = useState(false)

    const values = {
        title: titleValues,
        summary: summaryValues,
        status: task.status
    }

    if (status === 'error') return null

    return (
        <AuthChecker>
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
                        <div className="px-16">
                            <label htmlFor="title">Введите название задачи</label>
                            <input
                                type="text"
                                id="name"
                                value={titleValues}
                                required
                                minLength={2}
                                maxLength={30}
                                className={`w-full flex justify-center rounded-[7px] p-2 ${hasError ? 'bg-red-100' : 'bg-white'}`}
                                onChange={(event) => {
                                    setTitleValues(event.target.value)
                                    setError(false)
                                }}
                            />
                            {hasError ? (
                                <div className='text-red-500'>Название слишком короткое</div>
                            ) : null}
                        </div>
                        <div className="px-16">
                            <label htmlFor="summary">Опишите её (желательно, чтобы все её поняли)</label>
                            <input
                                type="text"
                                id="summary"
                                value={summaryValues}
                                required
                                minLength={2}
                                className={`h-16 w-full flex justify-center rounded-[7px] p-2 ${hasError ? 'bg-red-100' : 'bg-white'}`}
                                onChange={(event) => {
                                    setSummaryValues(event.target.value)
                                    setError(false)
                                }}
                            />
                            {hasError ? (
                                <div className='text-red-500'>Описание слишком короткое</div>
                            ) : null}
                        </div>
                        <div className="flex justify-center mt-4 px-36">
                            <button
                                className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                                onClick={(event) => {
                                    event.preventDefault()
                                    updateCard(Number(projectId), Number(taskId), values).then(({ error }) => {
                                        if (error) {
                                            setError(true)
                                        } else {
                                            setError(false)
                                            router.push(`/projects/${projectId}`)
                                        }
                                    })
                                }}
                            >
                                <span className="flex items-center">Изменить</span>
                            </button>
                        </div>
                    </div>
                </Grid>
            </Container>
        </AuthChecker>
    )
}