'use client'

import { getAllProjects } from '@/api/Api'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import React, { useLayoutEffect, useState } from 'react'

export default function Page() {
    const [state, setState] = useState('initial')
    const [value, setValue] = useState([])
    const [error, setError] = useState('')

    const column = "w-full aspect-video rounded-lg flex justify-center items-center ease-out duration-300 hover:shadow hover:bg-gray-200"
    const grayColumn = `${column} bg-gray-300`
    const yellowColumn = `${column} bg-yellow-300`

    useLayoutEffect(() => {
        console.log("Hello!")
        getData(setState, setValue, setError)
    }, [])

    return (
        <main className='text-black'>
            {/* {state} */}
            {/* {value} */}
            {/* {error} */}
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5">
                <Link className="w-full" href="/projects/create">
                    <div className={yellowColumn}>
                        <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                    </div>
                </Link>
            </div>
        </main>
    )
}

async function getData(setState, setValue, setError) {
    // const res = await fetch('http://213.171.9.177:8000/api/v1/projects/')

    // if (!res.ok) {
    //     throw new Error('Failed to fetch data')
    // }

    // return res.json()
    setState("loading")
    const { data, error } = await getAllProjects()

    console.log(data, error);

    if (data) {
        setValue(data)
        setState("ready")
    }
    if (error) {
        setError(error)
        setState("error")
    }
}