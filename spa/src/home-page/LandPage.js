import React, { Fragment } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Stack,
    Typography
} from '@mui/material';
import './LandPage.css';
import { Link } from 'react-router-dom';

function SectorA() {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    PyPoll
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    PyPoll is a Python Twitter mining and polarization Library,
                    a state-of-the-art Python library that automates Twitter graph mining, measures polarization,
                    and visualizes graphs. PyPoll provides simple high-level functionalities to users that do not
                    have great programming skills or are new to polarization and graph mining or are new to
                    Python or experts. It is open-source and guidelines and examples for using it can be found
                    on GitHub.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" href="https://github.com/dpgiakatos/PyPoll">Go to PyPoll</Button>
                    <Button variant="outlined" component={Link} to="/graph-sharing-app">Share a graph</Button>
                </Stack>
            </Container>
        </Box>
    );
}

function LandPage() {
    return (
        <Box>
            <SectorA />
        </Box>
    );
}

export default LandPage;
