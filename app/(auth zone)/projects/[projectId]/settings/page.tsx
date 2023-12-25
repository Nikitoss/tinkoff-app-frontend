'use client'

import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Grid } from '@mui/material'
import Link from 'next/link'
import { getProjectById, getMembers, deleteMember, createInviteLink, getProjectSettings, updateProjectSettings } from '@/api/Api'
import { MemberResponse, ProjectResponse, SettingsRequest, SettingsResponse } from '@/api/dataСontracts'
import DeleteIcon from '@mui/icons-material/Delete'
import RoleChecker from '@/app/(auth zone)/_components/RoleChecker'

const card = "w-full h-10 mx-1 mb-1 relative flex justify-left items-center text-center px-4 rounded-lg ease-out duration-300 hover:shadow"
const grayCard = `${card} bg-neutral-100 hover:bg-neutral-300`
const skeletonCard = `${card} bg-neutral-100 animate-pulse`

export default function Page() {
    const router = useRouter()
    const params = useParams()
    const projectId = Number(params.projectId)

    const MemberCard = ({ username, userId, accetionDate }: { username: string, userId: number, accetionDate: number }) => (
        <div className={grayCard} key={userId}>
            <div className="flex top-2 text-lg">
                {username}
            </div>
            <ul className="absolute top-2 right-2 space-x-1.5 ease-out duration-100">
                <Link href="" className="flex justify-center hover:text-neutral-500" onClick={() => deleteMember(projectId, userId)}>
                    <DeleteIcon sx={{ fontSize: 24 }} />
                </Link>
            </ul>
        </div>
    )

    const SkeletonMember = ({ count = 1 }) => {
        const ids = Array.from(Array(count).keys())

        return <>{ids.map((id) => <div className={skeletonCard} key={id}></div>)}</>
    }

    const Members = ({ projectId }: { projectId: number }) => {
        const [members, setMembers] = useState([] as MemberResponse[])
        const [status, setStatus] = useState('loading')

        useEffect(() => {
            getMembers(projectId)
                .then(({ data: members, error }) => {
                    if (error) {
                        console.error(error)
                        setStatus('error')
                        return
                    }
                    setMembers(members)
                    setStatus('ready')
                })
                .catch((error) => {
                    console.error(error)
                    setStatus('error')
                })
        }, [projectId])

        if (status === 'error') return null

        if (status === 'loading') return <SkeletonMember />

        return (
            <>
                {members.map(({ userId, username, accetionDate }) => (
                    <MemberCard userId={userId!} username={username!} accetionDate={accetionDate!} key={userId} />
                ))}
            </>
        )
    }

    // eslint-disable-next-line no-unused-vars
    type SubmitHandler = (form: SettingsRequest) => Promise<void>

    type SettingsFormProps = {
        inviteLink: string;
        projectId: number;
        initialVoteCount: number;
        initialPeriod: number;
        initialTitle: string;
        onSubmit: SubmitHandler;
    }

    const SettingsForm = ({ inviteLink, projectId, initialTitle, initialVoteCount, initialPeriod, onSubmit }: SettingsFormProps) => {
        const [titleValue, setTitleValue] = useState(initialTitle)
        const [voteCountValue, setVoteCountValue] = useState(initialVoteCount)
        const [periodValue, setPeriodValue] = useState(initialPeriod)

        const [hasTitleError, setTitleError] = useState(false)
        const [hasVoteCountError, setVoteCountError] = useState(false)
        const [hasPeriodError, setPeriodError] = useState(false)

        const validateTitle = (title: string) => title.length >= 2 && title.length <= 30
        const validateVoteCount = (voteCount: number) => voteCount >= 1 && voteCount <= 32
        const validatePeriod = (period: number) => period >= 1 && period <= 30

        const validateForm = () => {
            const hasTitleError = !validateTitle(titleValue)
            const hasVoteCountError = !validateVoteCount(voteCountValue)
            const hasPeriodError = !validatePeriod(periodValue)
            setTitleError(hasTitleError)
            setVoteCountError(hasVoteCountError)
            setPeriodError(hasPeriodError)
            return !(hasTitleError || hasVoteCountError || hasPeriodError)
        }

        const handleSubmit = async () => {
            const isFormValid = validateForm()

            if (isFormValid) {
                onSubmit({
                    voteCount: voteCountValue,
                    period: periodValue,
                    projectTitle: titleValue
                })
            }
        }

        const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target
            setTitleValue(value)
            setTitleError(!validateTitle(value))
        }

        return (
            <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                <span className="font-bold text-2xl flex justify-center">Настройки проекта</span>
                <div className="px-16 space-y-1">
                    <label htmlFor="name">Введите новое название проекта</label>
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
                <div className="flex px-16 items-center space-x-4">
                    <label htmlFor="add">Добавить участника</label>
                    <button
                        className="px-10 border flex justify-center items-center text-align-center gap-2 rounded-lg bg-white duration-300 ease-out hover:bg-neutral-300"
                        onClick={() => navigator.clipboard.writeText(`https://tinkoff-app-frontend.vercel.app/share/${inviteLink}`)}
                    >
                        Поделиться ссылкой
                    </button>
                </div>
                <div className="flex px-16 space-x-6">
                    <label htmlFor="add">Доступное количество голосов</label>
                    <input
                        type="number"
                        id="votes"
                        required
                        min={1}
                        max={32}
                        value={voteCountValue}
                        className="flex p-2 rounded-[7px]"
                        onChange={(event) => {
                            setVoteCountValue(Number(event.target.value))
                            // setVoteCountError(!validateVoteCount(value))
                        }}
                    />
                    {hasVoteCountError ? (
                        <div className='text-red-500'>Недопустимое значение</div>
                    ) : null}
                </div>
                <div className="flex px-16 space-x-4">
                    <label htmlFor="add">Период обновления голосов (дни)</label>
                    <input
                        type="number"
                        id="votes"
                        required
                        min={1}
                        max={32}
                        className="flex p-2 rounded-[7px]"
                        onChange={(event) => {
                            setPeriodValue(Number(event.target.value))
                            // setVoteCountError(!validateVoteCount(value))
                        }}
                    />
                    {hasPeriodError ? (
                        <div className='text-red-500'>Недопустимое значение</div>
                    ) : null}
                </div>
                <div className="px-16 overflow-y-auto overflow-x-hidden">
                    <label htmlFor="add">Пользователи</label>
                    <div className="bg-white h-24 w-full flex justify-center rounded-[7px] p-2">
                        <Members projectId={projectId} />
                    </div>
                </div>

                <div className="flex justify-center mt-4 px-36">
                    <Link
                        type="submit"
                        href="./../"
                        className="w-full h-12 px-10 mt-2 border flex justify-center items-center gap-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition duration-300"
                        onClick={handleSubmit}
                    >
                        Сохранить
                    </Link>
                </div>
            </div>
        )
    }

    const [project, setProject] = useState([] as ProjectResponse)

    useEffect(() => {
        getProjectById(projectId)
            .then(({ data: project }) => {
                setProject(project)
            })
    }, [projectId])

    const [settings, setSettings] = useState([] as SettingsResponse)

    useEffect(() => {
        getProjectSettings(projectId)
            .then(({ data: settings }) => {
                setSettings(settings)
            })
    }, [projectId])

    const [inviteLink, setInviteLink] = useState("")
    const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading')

    useEffect(() => {
        createInviteLink(projectId)
            .then(({ data: inviteLink }) => {
                setInviteLink(inviteLink)
            })
    }, [projectId])

    const onSubmit: SubmitHandler = async (form) => {
        const { error } = await updateProjectSettings(Number(projectId), { ...form })

        if (!error) {
            router.push(`/projects/${projectId}`)
        } else {
            setStatus('error')
        }
    }

    return (
        <Container fixed>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="min-h-screen"
            >
                <RoleChecker>
                    <SettingsForm
                        inviteLink={inviteLink}
                        projectId={Number(projectId)}
                        initialTitle={project.title || ""}
                        initialVoteCount={Number(settings.voteCount)}
                        initialPeriod={Number(settings.period)}
                        onSubmit={onSubmit}
                    />
                </RoleChecker>
            </Grid>
        </Container>
    )
}
