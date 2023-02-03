import React from 'react';
import {Box, Grid, Typography, Link} from '@mui/material';
import {Facebook, LinkedIn, Twitter} from '@mui/icons-material';

function FooterPage() {
    return (
        <Box sx={{py:5, px:2}}>
            <Grid container textAlign="center">
                <Grid item xs={12} sm={12} md={6} sx={{py: 2}}>
                    <Link href="https://twitter.com/datalab_auth/" target="_blank" rel="noreferrer">
                        <Twitter fontSize="large" sx={{px: 2}} />
                    </Link>
                    <Link href="https://www.facebook.com/datalab.auth/" target="_blank" rel="noreferrer">
                        <Facebook fontSize="large" sx={{px: 2}} />
                    </Link>
                    <Link href="https://www.linkedin.com/company/datalab-auth/" target="_blank" rel="noreferrer">
                        <LinkedIn fontSize="large" sx={{px: 2}} />
                    </Link>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={{py: 2}}>
                    <Typography variant="body2" color="text.secondary">
                        Copyright &#169;&nbsp;
                        <Link href="https://datalab.csd.auth.gr/" color="inherit">
                            Data and Web Science Lab (Datalab)
                        </Link>
                        &nbsp;
                        {new Date().getFullYear()}
                        .
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FooterPage;
