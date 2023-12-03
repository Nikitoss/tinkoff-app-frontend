import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Grid, Link } from '@mui/material'

export default function Home() {
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
                        Здесь будет какой-нибудь красивый лендинг, но пока заглушка
                    </Typography>
                    <Link href="/login">Авторизация</Link>
                    <Link href="/projects">К проектам</Link>
                </Grid>
            </Container>
        </main>
    )
}
