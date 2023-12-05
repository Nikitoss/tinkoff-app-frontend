import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { Grid } from '@mui/material'

export default function Page() {
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
                </Grid>
            </Container>
        </main>
    )
}