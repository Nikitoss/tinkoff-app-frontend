'use client'

import { getAllCards, getProjectById, deleteCard } from '@/api/Api'
import { CardResponse, ProjectResponse } from '@/api/dataСontracts'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
// import DeleteIcon from '@mui/icons-material/Delete'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "relative w-full h-full bg-neutral-200 rounded-bl-lg rounded-br-lg overflow-y-auto overflow-x-hidden"

const card = "w-full aspect-video relative flex justify-center items-center text-center px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-neutral-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

const TaskCard = ({ title, upVote, downVote, projectId, taskId, createAt }: { title: string, upVote: number, downVote: number, projectId: number, taskId: number, createAt: string }) => (
    <Link className="w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
        <div className={grayCard}>
            <div className="absolute top-2 text-lg">
                {title}
            </div>
            <div className="flex justify-center items-center space-x-10">
                <div className="text-neutral-700">
                    {createAt.toString().split(',')[2]}/{createAt.toString().split(',')[1]}/{createAt.toString().split(',')[0]}<br />
                    {createAt.toString().split(',')[3]}:{createAt.toString().split(',')[4]}
                </div>               
                <AccountCircleIcon sx={{ fontSize: 52 }} />
            </div>
            <div className="absolute bottom-3 items-center text-2xl">
                {upVote} 🔥 | {downVote} 💩
            </div>
            <ul className="absolute top-2 right-2 space-y-1.5 opacity-0 ease-out duration-100 hover:opacity-100">
                {/* <Link href="" className="flex justify-center hover:text-neutral-500" onClick={(event) => deleteCard(projectId, taskId)}>
                    <DeleteIcon sx={{ fontSize: 24 }}/>
                </Link> */}
                <Link href={`/projects/${projectId}/tasks/${taskId}/edit`} className="flex justify-center hover:text-neutral-500">
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

const Tasks = ({ projectId }: { projectId: number }) => {
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

    return (
        <>
            {tasks.map(({ id, title, upVote, downVote, createAt }) => (
                <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} createAt={createAt!} key={id} />
            ))}
        </>
    )
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

            <div className="mr-5 grid grid-cols-4 gap-5 mb-4">
                <div className="">
                    <div className={`${columnHat} space-x-2`}>                      
                        <h1 className="font-bold">НОВЫЕ</h1>
                        <Link href={`${projectId}/tasks/create`}>
                            <div className="flex justify-center items-center">
                                <AddIcon sx={{ fontSize: 30 }} />
                            </div>
                        </Link>                   
                    </div>
                    <div className={column}>
                        <Tasks projectId={projectId} />
                    </div>
                </div>

                <div className="h-screen pb-36">
                    <div className={columnHat}>
                        <h1 className="font-bold">В РАБОТЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>

                <div className="h-screen pb-36">
                    <div className={columnHat}>
                        <h1 className="font-bold">ПРИНЯТЫЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>

                <div className="h-screen pb-36">
                    <div className={columnHat}>
                        <h1 className="font-bold">ОТКЛОНЁННЫЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>
            </div>
        </main>
    )
}