'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import { createProject } from '@/api/Api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [titleValues, setTitleValues] = useState("")

    const values = {
        title: titleValues
    }

    const [hasError, setError] = useState(false)

    const router = useRouter()

    return (
        <Container fixed>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="min-h-screen"
            >
                <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                    <span className="font-bold text-2xl flex justify-center">Добавить проект</span>
                    <div className="px-16 space-y-1">
                        <label htmlFor="name">Введите название проекта</label>
                        <input
                            type="text"
                            id="title"
                            minLength={2}
                            maxLength={30}
                            placeholder="Мой последний проект"
                            required
                            className={`w-full flex justify-center rounded-[7px] p-2 ${hasError ? 'bg-red-100' : 'bg-white'}`}
                            onChange={(event) => {
                                setTitleValues(event.target.value)
                                setError(false)
                            }}
                        />
                        {hasError ? (
                            <div className='text-red-500'>Название слишком короткое</div>
                        ) : null}
                    </div>
                    <div className="flex justify-center mt-4 px-36">
                        <button
                            type="submit"
                            className="w-full h-12 px-10 mt-2 border flex justify-center items-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                            onClick={(event) => {
                                event.preventDefault()
                                createProject(values).then(({ error }) => {
                                    if (error) {
                                        setError(true)
                                    } else {
                                        setError(false)
                                        router.push('/projects')
                                    }
                                })
                            }}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </Grid>
        </Container>
    )
}