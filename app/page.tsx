import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Grid, Link } from '@mui/material'

export default function Home() {
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
