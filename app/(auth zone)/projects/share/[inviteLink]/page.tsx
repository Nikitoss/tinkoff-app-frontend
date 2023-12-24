'use client'

import { enterFromInviteLink, getAllCards, getProjectById } from '@/api/Api'
import { CardResponse, ProjectResponse } from '@/api/dataСontracts'
import { usePathname, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
    // // const pathname = usePathname()
    // // const [projectId, setProjectId] = useState()

    // // useEffect(() => {
    // //     enterFromInviteLink(pathname)
    // //         .then(({ data: project, error }) => {
    // //             if (error) {
    // //                 console.error(error)
    // //                 return
    // //             }
    // //             setProjectId(project.id)
    // //         })
    // //         .catch((error) => {
    // //             console.error(error)
    // //         })
    // // }, [])

    // const [project, setProjects] = useState([] as ProjectResponse)

    // useEffect(() => {
    //     getProjectById(Number(projectId))
    //         .then(({ data: project }) => {
    //             setProjects(project)
    //         })
    // }, [projectId])
    return null
}