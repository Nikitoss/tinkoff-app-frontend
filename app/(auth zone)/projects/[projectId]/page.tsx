'use client'

import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add'
import { usePathname  } from 'next/navigation'

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
                    <Link className="relative w-full" href="/create">
                        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-100 hover:shadow">
                            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                        </div>
                    </Link>
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
    const res = await fetch('http://213.171.9.177:8000/api/v1/projects/1')
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }