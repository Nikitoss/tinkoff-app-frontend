'use client'

import Container from '@mui/material/Container'
import * as React from 'react'
import { Grid } from '@mui/material'
import Link from 'next/link'

export default function Page() {
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
                            <input name="login" type="text" placeholder="Логин" className="w-full flex justify-center rounded-[7px] p-2" />
                            <input name="password" type="text" placeholder="Пароль (не 123456!)" className="w-full flex justify-center rounded-[7px] p-2" />
                            <div className="flex justify-center">
                                <Link className="flex items-center h-12 px-16 border rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="/projects">
                                    <span className="flex items-center">Войти</span>  
                                </Link>  
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