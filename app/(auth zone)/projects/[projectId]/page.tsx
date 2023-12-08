'use client'

import { getAllCards } from '@/api/Api'
import { CardResponse } from '@/api/dataСontracts'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "w-full h-full mb-4 bottom-4 bg-neutral-200 rounded-bl-lg rounded-br-lg justify-center items-center"

const card = "w-auto aspect-video px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-300 hover:bg-gray-400`
const skeletonCard = `${card} bg-neutral-300 animate-pulse`

export default function Page() {
    const params = useParams()

    const TaskCard = ({ title, createdAt, projectId, taskId }: { title: string, createdAt: string, projectId: number, taskId: number }) => (
        <Link className="w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
            <div className={grayCard}>
                <div className="flex justify-center items-start font-bold py-4">
                    {title}

                </div>
                <div className="flex justify-center items-start">
                    {/* {createdAt} */}
                </div>
            </div>
        </Link>
    )
    
    const SkeletonTasks = ({ count = 1 }) => {
        const ids = Array.from(Array(count).keys())
    
        return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
    }
    
    const Tasks = () => {
        const [status, setStatus] = useState('loading')
        const [tasks, setTasks] = useState([] as CardResponse[])
    
        useEffect(() => {
            getAllCards(Number(params.projectId))
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
                {tasks.map(({ projectId, id, title, createAt }) => (
                    <TaskCard projectId={projectId!} taskId={id!} title={title!} createdAt={createAt!} key={id} />
                ))}
            </>
        )
    }

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
                    <div className={column}>
                        <Tasks />

                        <Link href={`${params.projectId}/tasks/create`} className="relative w-full">
                            <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-neutral-100 hover:shadow">
                                <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                            </div>
                        </Link> 
                    </div>             
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