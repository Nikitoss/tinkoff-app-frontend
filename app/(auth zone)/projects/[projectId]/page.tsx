'use client'

import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import React, { Suspense } from 'react'

const AddTaskCard = () => (
    <Link className="relative w-full" href='3/tasks/create'>
        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-100 hover:shadow">
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
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1 className="font-bold">НОВЫЕ</h1>
                    </div>
                    <AddTaskCard />
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