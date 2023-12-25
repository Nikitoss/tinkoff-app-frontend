'use client'

import { PropsWithChildren, useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import { getMe } from "@/api/Api"
import { MeResponse } from "@/api/dataСontracts"

const RoleChecker = (props: PropsWithChildren) => {
    const router = useRouter()
    const params = useParams()
    const projectId = Number(params.projectId)

    const [me, setMe] = useState({} as MeResponse)

    useEffect(() => {
        getMe(Number(projectId))
            .then(({ data: me }) => {
                setMe(me)
            })
    }, [projectId])

    return me.role === "ADMIN" ? (
        <>
            {props.children}
        </>
    ) : null
}

export default RoleChecker