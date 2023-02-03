import React, {useState} from 'react';
import {Alert, Box, Button, ButtonBase, Grid, Paper, Snackbar, Stack, Typography} from '@mui/material';
import {ContentCopy} from '@mui/icons-material';
import {Masonry} from '@mui/lab';
import './LandPage.css';

function SectorA() {
    const [copy, setCopy] = useState(false);
    const docsURL = 'https://readthedocs.org/';
    const installCommand = 'pip install ...';
    const iframesData = [
        {height: 250, width: 460, title: 'Graph 1', url: 'http://localhost:3000/embed/635fa4f32e86064bf9ec4fae'},
        {height: 450, width: 460, title: 'Graph 2', url: 'http://localhost:3000/embed/635fa4f32e86064bf9ec4fae'},
        {height: 280, width: 460, title: 'Graph 3', url: 'http://localhost:3000/embed/635fa4f32e86064bf9ec4fae'}
    ];
    return (
        <Box>
            <Grid container>
                <Grid item md={7} lg={6}>
                    <Typography>
                        Get the library
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            variant="contained"
                            href={docsURL}
                            target="_blank"
                            rel="noreferrer"
                        >Get started</Button>
                        <Button
                            variant="outlined"
                            sx={{
                                backgroundColor: '#F3F6F9',
                                borderColor: '#CDD2D7',
                                color: '#2D3843',
                                textTransform: 'none'
                            }}
                            endIcon={<ContentCopy />}
                            onClick={(e) => {
                                setCopy(true);
                                navigator.clipboard.writeText(e.currentTarget.value);
                            }}
                            value={installCommand}
                        >
                            {installCommand}
                        </Button>
                        <Snackbar
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            open={copy}
                            autoHideDuration={2000}
                            onClose={() => setCopy(false)}
                        >
                            <Alert severity="success" sx={{width: '100%'}}>
                                Copied to clipboard!
                            </Alert>
                        </Snackbar>
                    </Stack>
                </Grid>
                <Grid item md={5} lg={6}>
                    <Masonry columns={{xs: 1, xl: 2}} spacing={2}>
                        {iframesData.map((data, index) => (
                            <Paper key={index}>
                                <iframe
                                    height={data.height}
                                    width={data.width}
                                    src={data.url}
                                    title={data.title}
                                ></iframe>
                            </Paper>
                        ))}
                    </Masonry>
                </Grid>
            </Grid>
        </Box>
    );
}

function SectorB() {
    const projects = [
        {
            name: 'Political Lighthouse',
            description: 'Explore Polarization on greek political discussions in Twitter.',
            url: 'https://political-lighthouse.netlify.com/',
            imageURL: 'political_lighthouse_logo.png'
        },
        {
            name: 'Political Lighthouse',
            description: 'Explore Polarization on greek political discussions in Twitter.',
            url: 'https://political-lighthouse.netlify.com/',
            imageURL: 'political_lighthouse_logo.png'
        },
        {
            name: 'Political Lighthouse',
            description: 'Explore Polarization on greek political discussions in Twitter.',
            url: 'https://political-lighthouse.netlify.com/',
            imageURL: 'political_lighthouse_logo.png'
        }
    ];
    return (
        <Box width={500} height="auto">
            <Typography>
                Tools that created with the library
            </Typography>
            <Grid container spacing={2}>
                {projects.map((data, index) => (
                    <Grid item key={index}>
                        <Paper variant="outlined">
                            <ButtonBase href={data.url} target="_blank" rel="noreferrer">
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <img
                                        src={`./images/logos/${data.imageURL}`}
                                        height={130}
                                        alt={data.name}
                                    />
                                    <Box>
                                        <Typography variant="body1">
                                            <b>{data.name}</b>
                                        </Typography>
                                        <Typography variant="body2">
                                            {data.description}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </ButtonBase>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function LandPage() {
    return (
        <Box>
            <SectorA />
            <SectorB />
        </Box>
    );
}

export default LandPage;
