'use client'

import Container from '@mui/material/Container'
import { useState  } from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'

export default function Page() {
    const [hasError, setError] = useState(false)
    const [titleValues, setTitleValues] = useState("")

    const values = {
        title: titleValues
    }

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
                        <span className="font-bold text-2xl flex justify-center">Настройки проекта</span>
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
                        <div className="flex px-16 items-center space-x-4">
                            <label htmlFor="add">Добавить участника</label>
                            <button className="px-10 border flex justify-center items-center text-align-center gap-2 rounded-lg bg-white">Поделиться ссылкой</button>
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
                        </div>
                        <div className="flex px-16 space-x-4">
                            <div>
                                <label htmlFor="add">Пользователи</label>
                                
                            </div>
                            <div>
                                <label htmlFor="add">Администраторы</label>
                                
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
        </main>
    )
}