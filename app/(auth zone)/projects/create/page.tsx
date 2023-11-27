'use client'

import Link from 'next/link'

export default function Page() {
    return (
        <main>
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5 relative">
                <div className="col-start-2 col-span-2 w-full mt-36 px-10 py-4 rounded-lg bg-zinc-200 space-y-2 inset-x-0">
                    <span className="font-bold text-2xl flex justify-center">Добавить проект</span>
                    <div>
                        <label htmlFor="name">Введите название проекта</label>
                        <input type="text" id="name" placeholder="Мой первый проект" className="w-full flex justify-center rounded-[7px] px-1" />
                    </div>   
                    <div className="flex justify-center mt-4 px-36">
                        <Link className="w-full h-12 px-10 py-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="/projects">
                            <span className="flex items-center">Добавить</span>  
                        </Link>
                    </div>
                </div>   
            </div>
        </main>
    )
}