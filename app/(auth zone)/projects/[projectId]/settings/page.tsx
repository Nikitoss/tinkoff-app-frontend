'use client'

import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Grid } from '@mui/material'
import Link from 'next/link'
import { getMembers, deleteMember, createInviteLink } from '@/api/Api'
import { MemberResponse } from '@/api/dataСontracts'
import AuthChecker from '@/app/(auth zone)/_components/AuthChecker'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Page() {
    const card = "w-full h-10 mx-1 mb-1 relative flex justify-left items-center text-center px-4 rounded-lg ease-out duration-300 hover:shadow"
    const grayCard = `${card} bg-neutral-100 hover:bg-neutral-300`
    const skeletonCard = `${card} bg-neutral-100 animate-pulse`

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

    const [hasError, setError] = useState(false)
    const [titleValues, setTitleValues] = useState("")

    const [inviteLink, setInviteLink] = useState("")

    useEffect(() => {
        createInviteLink(projectId)
            .then(({ data: inviteLink }) => {
                setInviteLink(inviteLink)
            })
    }, [projectId])

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
                    <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                        <span className="font-bold text-2xl flex justify-center">Настройки проекта</span>
                        <div className="px-16 space-y-1">
                            <label htmlFor="name">Введите новое название проекта</label>
                            <input
                                type="text"
                                id="name"
                                value={titleValues}
                                required
                                minLength={2}
                                maxLength={30}
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
                                className="flex p-2 rounded-[7px]"
                            />
                            {hasError ? (
                                <div className='text-red-500'>Название слишком короткое</div>
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
                            />
                            {hasError ? (
                                <div className='text-red-500'>Название слишком короткое</div>
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
                            >
                                Сохранить
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Container>
        </AuthChecker>
    )
}