'use client'

import { getAllCards } from '@/api/Api'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import React, { Suspense } from 'react'

const card = "w-full aspect-video rounded-lg flex justify-center items-center ease-out duration-300 hover:shadow"
const skeletonCard = `${card} bg-gray-300 animate-pulse`

const AddTaskCard = () => (
    <Link className="relative w-full" href='3/tasks/create'>
        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-100 hover:shadow">
            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
        </div>
    </Link>
)

// const TaskCard = ({ title, projectId, taskId }: { title: string, projectId: number, taskId: number }) => (
//     <Link className="w-full" key={taskId} href={`/projects/${projectId}/tasks/${taskId}`}>
//         <div className="">
//             {title}
//         </div>
//     </Link>
// )

// const SkeletonTasks = ({ count = 2 }) => {
//     const ids = Array.from(Array(count).keys())

//     return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
// }


// const Tasks = async (projectId: number) => {
//     const { data: tasks, error } = await getAllCards(projectId)

//     if (error) {
//         console.error(error)
//         return null
//     }

//     return (
//         <>
//             {tasks.map(({ id, title }) => (
//                 <TaskCard taskId={id!} title={title!} key={id} />
//             ))}
//         </>
//     )
// }


export default function Page() {
    return (
        <main>
            <div className="py-4">
                <Link href="/projects">Проекты</Link>
                /
                
            </div>


            <div className="mr-5 grid grid-cols-4 gap-5">
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1 className="font-bold">НОВЫЕ</h1>
                    </div>
                    <AddTaskCard />
{/* 
                    <Suspense fallback={<SkeletonTasks />}>
                        <Tasks />
                    </Suspense> */}
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1 className="font-bold">В РАБОТЕ</h1>
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1 className="font-bold">ПРИНЯТЫЕ</h1>
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1 className="font-bold">ОТКЛОНЁННЫЕ</h1>
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
            </div>
        </main>
    )
}

async function getData() {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/projects/1/tasks/1`)
   
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}