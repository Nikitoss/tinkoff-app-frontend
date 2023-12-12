'use client'

import { getAllCards, getProjectById, deleteCard } from '@/api/Api'
import { CardResponse, ProjectResponse } from '@/api/dataСontracts'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "w-full h-full bg-neutral-200 rounded-bl-lg rounded-br-lg justify-center items-center overflow-y-auto"

const card = "w-full inset-x-0 aspect-video px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-neutral-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

// const CreateTaskCard = ({ projectId }: { projectId: number }) => {
//     return (
//         <Link href={`${projectId}/tasks/create`} className="relative w-full">
//             <div className="w-full aspect-video bg-neutral-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-neutral-100 hover:shadow">
//                 <AddIcon sx={{ fontSize: 76 }} className="text-white" />
//             </div>
//         </Link>
//     )
// }

const TaskCard = ({ title, upVote, downVote, projectId, taskId }: { title: string, upVote: number, downVote: number, projectId: number, taskId: number }) => (
    <Link className="w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
        <div className={grayCard}>
            <div className="flex justify-center items-start font-bold py-4">
                {title}
            </div>
            <div className="flex justify-center items-end text-2xl">
                {upVote}&nbsp; <ThumbUpIcon /> &nbsp;| {downVote}&nbsp; <ThumbDownIcon />
            </div>
            <div className="items-start relative mr-2 mt-2">
                <Link href={`/projects/${projectId}/tasks/${taskId}/edit`} className="hover:text-neutral-500"><EditIcon sx={{ fontSize: 20 }}/></Link>
                <Link href="#" className="hover:text-neutral-500" onClick={(event) => deleteCard(projectId, taskId)}><DeleteIcon sx={{ fontSize: 20 }}/></Link>
            </div>
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
            {tasks.map(({ id, title, upVote, downVote }) => (
                <TaskCard projectId={projectId} taskId={id!} title={title!} upVote={upVote!} downVote={downVote!} key={id} />
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

            <div className="mr-5 grid grid-cols-4 gap-5 mb-4 overflow-hidden">
                <div className="">
                    <div className={`${columnHat} space-x-2`}>                      
                        <h1 className="font-bold">НОВЫЕ</h1>
                        <Link href={`${projectId}/tasks/create`}>
                            <div className="flex justify-center items-center">
                                <AddIcon sx={{ fontSize: 26 }} />
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