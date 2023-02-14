import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import Counter from '../components/counter';
import Timer from '../components/timer';

export default function TipingPage() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed sx={{
                marginTop: '10px'
            }}>
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Timer></Timer>
                    </Grid>
                    <Grid xs={6}>
                        <Counter amount={1} description={'Touren'} isMoney={false}></Counter>
                    </Grid>
                    <Grid xs={6}>
                        <Counter amount={0.5} description={'Trinkgeld'} isMoney={true}></Counter>
                    </Grid>
                    <Grid xs={6}>TOUREN / STUNDE</Grid>
                    <Grid xs={6}>TRINKGELD / STUNDE</Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
}