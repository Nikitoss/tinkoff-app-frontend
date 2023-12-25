'use client'

import { getAllProjects } from '@/api/Api'
import { ProjectResponse } from '@/api/dataСontracts'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
// import EditIcon from '@mui/icons-material/Edit'

const card = "w-full aspect-video relative flex justify-center items-center text-center rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-gray-300 hover:bg-gray-400`
const yellowCard = `${card} bg-yellow-300 hover:bg-yellow-400`
const skeletonCard = `${card} bg-gray-300 animate-pulse`

const AddProjectCard = () => (
    <Link className="w-full" href="/projects/create">
        <div className={yellowCard}>
            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
        </div>
    </Link>
)

const ProjectCard = ({ title, id }: { title: string, id: number }) => (
    <Link className="w-full" key={id} href={`/projects/${id}`}>
        <div className={grayCard}>
            <div className="flex justify-center text-center font-bold px-8 text-ellipsis overflow-hidden">
                {title}
            </div>
            {/* <ul className="absolute top-2 right-2 space-y-1.5 opacity-0 ease-out duration-100 hover:opacity-100">
                <Link href="" className="flex justify-center hover:text-neutral-500" onClick={(event) => deleteProject(id)}>
                    <DeleteIcon sx={{ fontSize: 24 }}/>
                </Link>
                <Link href={`/projects/${id}/edit`}>
                    <EditIcon sx={{ fontSize: 26 }}/>
                </Link>              
            </ul> */}
        </div>
    </Link>
)

const SkeletonProjects = ({ count = 1 }) => {
    const ids = Array.from(Array(count).keys())

    return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
}

const Projects = () => {
    const [status, setStatus] = useState('loading')
    const [projects, setProjects] = useState([] as ProjectResponse[])

    useEffect(() => {
        getAllProjects()
            .then(({ data: projects, error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                }
                setProjects(projects)
                setStatus('ready')
            })
            .catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [])


    if (status === 'error') return null

    if (status === 'loading') return <SkeletonProjects />

    return (
        <>
            {projects.map(({ id, title }) => (
                <ProjectCard id={id!} title={title!} key={id} />
            ))}
        </>
    )
}

export default function Page() {
    return (
        <div className="pt-3 mr-5 grid grid-cols-4 gap-5">
            <AddProjectCard />

            <Projects />
        </div>
    )
}