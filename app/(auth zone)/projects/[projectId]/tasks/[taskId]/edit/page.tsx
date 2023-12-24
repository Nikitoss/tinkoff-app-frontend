'use client'

import { getCardById, updateCard } from '@/api/Api'
import { CardRequest, CardResponse } from '@/api/dataСontracts'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import AuthChecker from '@/app/(auth zone)/_components/AuthChecker'

// eslint-disable-next-line no-unused-vars
type SubmitHandler = (form: Omit<CardRequest, 'status'>) => Promise<void>

type TaskFormProps = {
    initialTitle: string;
    initialSummary: string;
    onSubmit: SubmitHandler;
}

const TaskFormLoader = () => {
    return (
        <h1>LOADING...</h1>
    )
}

const TaskFormError = () => {
    return (
        <h1>ERROR</h1>
    )
}

const TaskForm = ({ initialTitle, initialSummary, onSubmit }: TaskFormProps) => {

    const [titleValue, setTitleValue] = useState(initialTitle)
    const [summaryValue, setSummaryValue] = useState(initialSummary)
    const [hasTitleError, setTitleError] = useState(false)
    const [hasSummaryError, setSummaryError] = useState(false)

    const validateTitle = (title: string) => title.length >= 2 && title.length <= 30
    const validateSummary = (summary: string) => summary.length >= 2

    const validateForm = () => {
        const hasTitleError = !validateTitle(titleValue)
        const hasSummaryError = !validateSummary(summaryValue)
        setTitleError(hasTitleError)
        setSummaryError(hasSummaryError)
        return !(hasTitleError || hasSummaryError)
    }

    const handleSubmit = async () => {
        // event.preventDefault() // тут не используешь тег формы, поэтому можно не вызывать preventDefault

        const isFormValid = validateForm()

        if (isFormValid) {
            onSubmit({
                title: titleValue,
                summary: summaryValue
            })
        }
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setTitleValue(value)
        setTitleError(!validateTitle(value))
    }

    const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setSummaryValue(value)
        setSummaryError(!validateSummary(value))
    }

    return (
        <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
            <span className="font-bold text-2xl flex justify-center">Редактировать предложение</span>
            <div className="px-16">
                <label htmlFor="title">Введите название задачи</label>
                <input
                    type="text"
                    id="name"
                    value={titleValue}
                    required
                    minLength={2}
                    maxLength={30}
                    className={`w-full flex justify-center rounded-[7px] p-2 ${hasTitleError ? 'bg-red-100' : 'bg-white'}`}
                    onChange={handleTitleChange}
                />
                {hasTitleError ? (
                    <div className='text-red-500'>Название слишком короткое</div>
                ) : null}
            </div>
            <div className="px-16">
                <label htmlFor="summary">Опишите её (желательно, чтобы все её поняли)</label>
                <input
                    type="text"
                    id="summary"
                    value={summaryValue}
                    required
                    minLength={2}
                    className={`h-16 w-full flex justify-center rounded-[7px] p-2 ${hasSummaryError ? 'bg-red-100' : 'bg-white'}`}
                    onChange={handleSummaryChange}
                />
                {hasSummaryError ? (
                    <div className='text-red-500'>Описание слишком короткое</div>
                ) : null}
            </div>
            <div className="flex justify-center mt-4 px-36">
                <button
                    className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                    onClick={handleSubmit}
                >
                    <span className="flex items-center">Изменить</span>
                </button>
            </div>
        </div>
    )
}

export default function Page() {
    const { projectId, taskId } = useParams()
    const router = useRouter()

    const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')
    const [task, setTask] = useState({} as CardResponse)

    useEffect(() => {
        getCardById(Number(projectId), Number(taskId))
            .then(({ data: task, error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                }
                setTask(task)
                setStatus('ready')
            })
            .catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [projectId, taskId])

    const onSubmit: SubmitHandler = async (form) => {
        const { error } = await updateCard(Number(projectId), Number(taskId), { ...form, status: task.status })

        if (!error) {
            router.push(`/projects/${projectId}`)
        } else {
            setStatus('error')
        }
    }

    if (status === 'error') return <TaskFormError />
    if (status === 'loading') return <TaskFormLoader />

    return (
        <AuthChecker>
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="min-h-screen"
                >
                    <TaskForm
                        initialTitle={task.title || ""}
                        initialSummary={task.summary || ""}
                        onSubmit={onSubmit}
                    />
                </Grid>
            </Container>            
        </AuthChecker>
    )
}