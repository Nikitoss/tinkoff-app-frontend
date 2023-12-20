'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

import { getCardById, voteForCards } from '@/api/Api'
import { CardResponse, Vote } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'

const card = "w-full inset-x-0 aspect-video px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-gray-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

export default function Page() {
    const { projectId, taskId } = useParams();
    const [status, setStatus] = useState('loading')
    const [task, setTask] = useState({} as CardResponse)

    const [upVote, setUpVote] = useState(() => task.upVote || 0)
    const [downVote, setDownVote] = useState(() => task.downVote || 0)

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
                        <div className="flex justify-center space-x-3 mb-4">
                            <span className="font-bold text-2xl flex">{task.title}</span>
                            <span className="font-bold flex items-center px-2 rounded-md bg-orange-300 text-sm w-fit">{task.status}</span>
                        </div>
                        <div className="flex m-16 items-center space-x-3">
                            <p>
                                <AccountCircleIcon sx={{ fontSize: 50 }} />
                            </p>
                            <span className="text-neutral-600">{task.authorId}</span>
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