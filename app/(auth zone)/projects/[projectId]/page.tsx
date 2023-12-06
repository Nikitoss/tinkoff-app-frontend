'use client'

import { getAllCards } from '@/api/Api'
import { CardResponse } from '@/api/dataСontracts'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "w-full h-screen mb-4 bottom-4 bg-neutral-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"

const card = "w-full aspect-video rounded-lg flex justify-center items-center ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-gray-300 hover:bg-gray-400`
const skeletonCard = `${card} bg-gray-300 animate-pulse`

const TaskCard = ({ title, projectId, taskId }: { title: string, projectId: number, taskId: number }) => (
    <Link className="w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
        <div className={grayCard}>
            {title}
        </div>
    </Link>
)

const SkeletonTasks = ({ count = 1 }) => {
    const ids = Array.from(Array(count).keys())

    return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
}

const Tasks = (projectId: number) => {
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
    }, [])


    if (status === 'error') return null;

    if (status === 'loading') return <SkeletonTasks />

    return (
        <>
            {tasks.map(({ projectId, id, title }) => (
                <TaskCard projectId={projectId!} taskId={id!} title={title!} key={id} />
            ))}
        </>
    )
}

export default function Page() {
    const params = useParams()

    return (
        <main>
            <div className="py-4">
                <Link href="/projects" className="hover:text-neutral-500">Проекты</Link>
                &nbsp;/&nbsp;
                <Link href="" className="hover:text-neutral-500">Название проекта</Link>
            </div>

            <div className="mr-5 grid grid-cols-4 gap-5">
                <div>
                    <div className={columnHat}>
                        <h1 className="font-bold">НОВЫЕ</h1>
                    </div>
                    <Link href={`${params.projectId}/tasks/create`} className="relative w-full">
                        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-neutral-100 hover:shadow">
                            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                        </div>
                    </Link>

                    {/* <Tasks projectId={params.projectId} /> */}
                </div>
                
                <div>
                    <div className={columnHat}>
                        <h1 className="font-bold">В РАБОТЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>
                
                <div>
                    <div className={columnHat}>
                        <h1 className="font-bold">ПРИНЯТЫЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>
                
                <div>
                    <div className={columnHat}>
                        <h1 className="font-bold">ОТКЛОНЁННЫЕ</h1>
                    </div>
                    <div className={column}></div>
                </div>
            </div>
        </main>
    )
}

async function getData(projectId: number) {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/projects/${projectId}/tasks`)
   
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}