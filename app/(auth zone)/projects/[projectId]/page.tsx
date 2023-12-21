'use client'

import { getAllCards, getProjectById } from '@/api/Api'
import { CardResponse, ProjectResponse } from '@/api/dataСontracts'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Date from '../../_components/Date'
import Time from '../../_components/Time'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "static w-full h-screen bg-neutral-200 rounded-bl-lg rounded-br-lg space-y-2 overflow-y-auto overflow-x-hidden"

const card = "w-auto aspect-video mx-1 mb-1 relative flex justify-center items-center text-center px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-neutral-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

enum Status {
    New = "NEW",
    InWork = "IN WORK",
    Accepted = "ACCEPTED",
    Dismiss = "DISMISS"
}

const TaskCard = ({ title, upVote, downVote, projectId, taskId, createAt }: { title: string, upVote: number, downVote: number, projectId: number, taskId: number, createAt: string }) => (
    <Link className="inset-y-1 mt-1 w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
        <div className={grayCard}>
            <div className="absolute top-2 text-lg">
                {title}
            </div>
            <div className="flex justify-center items-center space-x-8">
                <div className="text-neutral-700">
                    <Date dateString={createAt} /><br />
                    <Time timeString={createAt} />
                </div>               
                <AccountCircleIcon sx={{ fontSize: 52 }} />
            </div>
            <div className="absolute bottom-3 items-center text-2xl">
                {upVote} 🔥 | {downVote} 💩
            </div>
            <ul className="absolute top-2 right-2 space-y-1.5 ease-out duration-100">
                {/* <Link href="" className="flex justify-center hover:text-neutral-500" onClick={(event) => deleteCard(projectId, taskId)}>
                    <DeleteIcon sx={{ fontSize: 24 }}/>
                </Link> */}
                <Link href={`/projects/${projectId}/tasks/${taskId}/edit`} className="flex justify-center hover:opacity-75">
                    <EditIcon sx={{ fontSize: 26 }}/>
                </Link>               
            </ul>
        </div>
    </Link>
)

const SkeletonTasks = ({ count = 1 }) => {
    const ids = Array.from(Array(count).keys())

    return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
}

const Tasks = ({ projectId, taskStatus }: { projectId: number, taskStatus: string }) => {
    const [status, setStatus] = useState('loading')
    const [tasks, setTasks] = useState([] as CardResponse[])

    useEffect(() => {
        getAllCards(projectId)
            .then(({ data: tasks, error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                }
                setTasks(tasks)
                setStatus('ready')
            })
            .catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [projectId])

    if (status === 'error') return null

    if (status === 'loading') return <SkeletonTasks />

    if (taskStatus === Status.InWork) {
        return (
            <>
                {tasks.filter(tasks => tasks.status === "IN_WORK").map(({ id, title, upVote, downVote, createAt }) => (
                    <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} createAt={createAt!} key={id} />
                ))}
            </>
        )
    } else if (taskStatus === Status.Accepted) {
        return (
            <>
                {tasks.filter(tasks => tasks.status === "ACCEPTED").map(({ id, title, upVote, downVote, createAt }) => (
                    <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} createAt={createAt!} key={id} />
                ))}
            </>
        )
    } else if (taskStatus === Status.Dismiss) {
        return (
            <>
                {tasks.filter(tasks => tasks.status === "DISMISS").map(({ id, title, upVote, downVote, createAt }) => (
                    <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} createAt={createAt!} key={id} />
                ))}
            </>
        )
    } else {
        return (
            <>
                {tasks.filter(tasks => tasks.status === "NEW").map(({ id, title, upVote, downVote, createAt }) => (
                    <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} createAt={createAt!} key={id} />
                ))}
            </>
        )
    }
}

export default function Page() { 
    const params = useParams()
    const [project, setProjects] = useState([] as ProjectResponse)
    const projectId = Number(params.projectId)

    useEffect(() => {
        getProjectById(projectId)
            .then(({ data: project }) => {
                setProjects(project)
            })
    }, [projectId])

    return (
        <main>
            <div className="py-4">
                <Link href="/projects" className="hover:text-neutral-500">Проекты</Link>
                &nbsp;/&nbsp;
                <Link href={`/projects/${projectId}/edit`} className="hover:text-neutral-500">{project.title} <EditIcon sx={{ fontSize: 16 }}/></Link>
            </div>
            
            <div className="mr-5 grid grid-cols-4 gap-5">
                <div className="h-full pb-4">
                    <div className={columnHat}>                      
                        <h1 className="font-bold">NEW</h1>
                        <Link href={`${projectId}/tasks/create`}>
                            <div className="flex justify-center items-center">
                                <AddIcon sx={{ fontSize: 30 }} />
                            </div>
                        </Link>                   
                    </div>
                    <div className={column}>
                        <Tasks projectId={projectId} taskStatus={Status.New} />
                    </div>
                </div>

                <div className="h-full pb-4">
                    <div className={columnHat}>
                        <h1 className="font-bold">IN WORK</h1>
                    </div>
                    <div className={column}>
                        <Tasks projectId={projectId} taskStatus={Status.InWork} />
                    </div>
                </div>

                <div className="h-full pb-4">
                    <div className={columnHat}>
                        <h1 className="font-bold">ACCEPTED</h1>
                    </div>
                    <div className={column}>
                        <Tasks projectId={projectId} taskStatus={Status.Accepted} />
                    </div>
                </div>

                <div className="h-full pb-4">
                    <div className={columnHat}>
                        <h1 className="font-bold">DISMISS</h1>
                    </div>
                    <div className={column}>
                        <Tasks projectId={projectId} taskStatus={Status.Dismiss} />
                    </div>
                </div>
            </div>
        </main>
    )
}