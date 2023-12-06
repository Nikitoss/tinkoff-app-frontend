'use client'

// import { getAllCards } from '@/api/Api'
// import { CardResponse } from '@/api/dataСontracts'
import AddIcon from '@mui/icons-material/Add'
import { request } from 'https'
import Link from 'next/link'
// import React, { Suspense, useEffect, useState } from 'react'

const columnHat = "w-full h-16 bg-neutral-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center"
const column = "w-full h-screen mb-4 bottom-4 bg-neutral-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"

const card = "w-full aspect-video rounded-lg flex justify-center items-center ease-out duration-300 hover:shadow"
// const grayCard = `${card} bg-gray-300 hover:bg-gray-400`
// const skeletonCard = `${card} bg-gray-300 animate-pulse`

const AddTaskCard = () => (
    <Link className="relative w-full" href='3/tasks/create'>
        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-neutral-100 hover:shadow">
            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
        </div>
    </Link>
)

export default function Page() {
    return (
        <main>
            <div className="py-4">
                <Link href="/projects">Проекты</Link>
                &nbsp;/&nbsp;
                
            </div>

            <div className="mr-5 grid grid-cols-4 gap-5">
                <div>
                    <div className={columnHat}>
                        <h1 className="font-bold">НОВЫЕ</h1>
                    </div>
                    <AddTaskCard />
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

async function getData(projectId: number, cardId: number) {
    const res = await fetch(`${process.env.SERVER_URL}/api/v1/projects/${projectId}/tasks/${cardId}`)
   
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
   
    return res.json()
}