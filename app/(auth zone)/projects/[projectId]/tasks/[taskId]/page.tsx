'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { getCardById, updateCard, voteForCards } from '@/api/Api'
import { CardResponse, Vote } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'

export default function Page() {
    const { projectId, taskId } = useParams()
    const [status, setStatus] = useState('loading')
    const [task, setTask] = useState({} as CardResponse)
    const [statusValue, setStatusValue] = useState("")

    const [upVote, setUpVote] = useState(() => task.upVote || 0)
    const [downVote, setDownVote] = useState(() => task.downVote || 0)

    enum Status {
        New = "NEW",
        InWork = "IN_WORK",
        Accepted = "ACCEPTED",
        Dismiss = "DISMISS"
    }

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
    }, [projectId, taskId, upVote, downVote])

    if (status === 'error') return null

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
                    <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0">
                        <div className="flex justify-center space-x-2 mb-4">
                            <span className="font-bold text-2xl flex">{task.title}</span>
                            <select
                                name="status"
                                id="status"
                                value={statusValue}
                                className="font-bold flex items-center text-center px-2 rounded-md bg-orange-300 text-sm w-fit"
                                onChange={(event) => {
                                    setStatusValue(event.target.value)
                                    updateCard(Number(projectId), Number(taskId), { status: statusValue as Status })
                                }}
                            >
                                <option value={Status.New}>NEW</option>
                                <option value={Status.InWork}>IN WORK</option>
                                <option value={Status.Accepted}>ACCEPTED</option>
                                <option value={Status.Dismiss}>DISMISS</option>
                            </select>
                        </div>
                        <div className="flex m-16 items-center space-x-3">
                            <p>
                            <Image
                                src="/Андрей.jpg"
                                alt="Андрей"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            </p>
                            <span className="text-neutral-600">{task.authorName}</span>
                        </div>
                        <div className="flex justify-center items-end text-4xl">
                            <h1>{task.upVote}&nbsp;
                                <button
                                    className="hover:opacity-75"
                                    onClick={() =>
                                        voteForCards(Number(projectId), Number(taskId), { voteType: Vote.For })
                                            .then(() => {
                                                setUpVote(upVote => upVote + 1)
                                            })
                                    }
                                >
                                    🔥
                                </button>
                                &nbsp;| {task.downVote}&nbsp;
                                <button
                                    className="hover:opacity-75"
                                    onClick={() =>
                                        voteForCards(Number(projectId), Number(taskId), { voteType: Vote.Against })
                                            .then(() => {
                                                setDownVote(downVote => downVote + 1)
                                            })
                                    }
                                >
                                    💩
                                </button>
                            </h1>
                        </div>
                        <div className="px-8 ">
                            <span className="text-neutral-600">Описание</span>
                            <div className="flex">
                                <span>{task.summary}</span>
                            </div>
                        </div>                       
                    </div>
                </Grid>
            </Container>             
        </main>
    )
}