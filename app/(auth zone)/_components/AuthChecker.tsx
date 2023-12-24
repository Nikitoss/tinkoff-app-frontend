'use client'

import { PropsWithChildren } from "react"
import { redirect } from 'next/navigation'

const AuthChecker = (props: PropsWithChildren) => {
    const token = localStorage?.getItem('token')
    return token ? (
        <>
            {props.children}
        </>
    ) : redirect('/login')
}

export default AuthChecker