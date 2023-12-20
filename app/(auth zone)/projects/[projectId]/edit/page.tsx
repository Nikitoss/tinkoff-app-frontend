'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'
import { getProjectById, updateProject } from '@/api/Api'
import { ProjectResponse } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function Page() {
    const params = useParams()
    const projectId = params.projectId
    const [status, setStatus] = useState('loading')
    const [project, setProject] = useState({} as ProjectResponse)

    useEffect(() => {
        getProjectById(Number(projectId))
            .then(({ data: projectId, error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                }
                setProject(projectId)
                setStatus('ready')
            })
            .catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [projectId])

    const [titleValues, setTitleValues] = useState("")

    const values = {
        title: titleValues
    }

    if (status === 'error') return null

    return (
        <main>
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="min-h-screen"
                >
                    <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                        <span className="font-bold text-2xl flex justify-center">Изменить проект</span>
                        <div className="px-16 space-y-1">
                            <label htmlFor="name">Введите новое название проекта</label>
                            <input
                                type="text"
                                id="name"
                                placeholder={titleValues}
                                required
                                minLength={2}
                                maxLength={30}
                                className="w-full flex justify-center rounded-[7px] p-2 whitespace-normal"
                                onChange={(event) => 
                                    setTitleValues(event.target.value)
                                }                               
                            />
                        </div>   
                        <div className="flex justify-center mt-4 px-36">
                            <Link
                                className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                                href="./"
                                onClick={(event) => {
                                    event.preventDefault()
                                    updateProject(Number(project.id), values)
                                }}
                            >
                                <span className="flex items-center">Изменить</span>
                            </Link>
                        </div>
                    </div>  
                </Grid>
            </Container>
        </main>
    )
}