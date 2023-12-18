'use client'

import Container from '@mui/material/Container'
import { redirect } from 'next/navigation'
import { useState, useCallback } from 'react'
import { Grid } from '@mui/material'
import { loginUser } from '@/api/Api'

export default function Page() {
    const [loginValues, setLoginValues] = useState("")
    const [passwordValues, setPasswordValues] = useState("")

    const values = {
        login: loginValues,
        password: passwordValues
    }

    const [status, setStatus] = useState('loading')

    const handleLoginUser = useCallback(() => {
        loginUser(values)
            .then(({ data: error }) => {
                if (error) {
                    console.error(error)
                    setStatus('error')
                    return
                } else {
                    redirect("/projects")
                }
            }).catch((error) => {
                console.error(error)
                setStatus('error')
            })
    }, [])
    
    return (
        <main>
            <img className="md:fixed absolute h-[58rem] -mt-40 pl-[54rem] -z-10" src="https://brosaem.online/wp-content/uploads/2019/08/D09AD0B0D0BBD18CD18FD0BD.jpg" /> 
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className="min-h-screen"
                >
                    <div className="w-3/5 py-4 rounded-lg bg-neutral-200 space-y-2 inset-x-0 mb-12">
                        <span className="font-bold text-2xl flex justify-center mb-4">Вход в систему</span>
                        <form className="px-16 space-y-2">
                            <input
                                name="login"
                                type="text"
                                placeholder="Логин"
                                className="w-full flex justify-center rounded-[7px] p-2"
                                onChange={(event) => {
                                    setLoginValues(event.target.value)
                                }}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Пароль (не 123456!)"
                                className="peer w-full flex justify-center rounded-[7px] p-2"
                                onChange={(event) => {
                                    setPasswordValues(event.target.value)
                                }}
                            />
                            <div className="flex justify-center">
                                <button
                                    className="flex items-center h-12 px-16 border rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300"
                                    onClick={(event) => {
                                        handleLoginUser()
                                    }}
                                >
                                    <span className="flex items-center">Войти</span>  
                                </button>  
                            </div>                                         
                        </form>
                        
                        <div className="py-2 items-baseline text-neutral-600 text-center">
                            <p className="text-xs">Приступая к работе, вы соглашаетесь с нашими&nbsp; 
                                <a href="/privacy-policy/" className="underline">Условиями использования</a>
                                и подтверждаете, что ознакомились с нашим&nbsp;
                                <a href="/privacy-policy/" className="underline">Положением о конфиденциальности и файлах cookie</a>.
                            </p>
                        </div> 
                    </div>
                </Grid>
            </Container>        
        </main>
    )
}