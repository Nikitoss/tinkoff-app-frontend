'use client'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Grid, Link } from '@mui/material'
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
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
                    <Typography>
                        Здесь будут нормальные настройки, но пока заглушка
                    </Typography>
                    <Link onClick={() => router.back()}>Обратно</Link>
                </Grid>
            </Container>
        </main>
    )
}