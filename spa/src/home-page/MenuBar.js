import React, {useState} from 'react';
import {AppBar, Box, Container, IconButton, Menu, MenuItem, MenuList, Stack, Toolbar, Typography} from '@mui/material';
import {Adb, Menu as MenuIcon, TranslateOutlined} from '@mui/icons-material';
import {Link} from 'react-router-dom';
import './MenuBar.css'

function MenuBar() {
    const insidePages = [{name: 'Graph Sharing App', url: '/graph-sharing-app'}];
    const docsURL = 'https://readthedocs.org/';
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="ml">
                <Toolbar disableGutters>
                    {/*<Adb sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />*/}
                    <Typography
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <Link to="/" className="link">
                            PyPoll
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(event) => setAnchorElNav(event.currentTarget)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {/*<MenuItem onClick={handleCloseNavMenu}>*/}
                            {/*    <Typography textAlign="center">*/}
                            {/*        <a href={docsURL} target="_blank" rel="noreferrer" className="link">*/}
                            {/*            Docs*/}
                            {/*        </a>*/}
                            {/*    </Typography>*/}
                            {/*</MenuItem>*/}
                            {insidePages.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page.url} className="link">
                                            {page.name}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*<Adb sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />*/}
                    <Typography sx={{display: {xs: 'flex', md: 'none'}, flexGrow: 1}}>
                        <Link to="/" className="link">
                            PyPoll
                        </Link>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <MenuList>
                            <Stack direction="row">
                                {/*<MenuItem>*/}
                                {/*    <Typography>*/}
                                {/*        <a href={docsURL} target="_blank" rel="noreferrer" className="link">*/}
                                {/*            Docs*/}
                                {/*        </a>*/}
                                {/*    </Typography>*/}
                                {/*</MenuItem>*/}
                                {insidePages.map((page, index) => (
                                    <MenuItem key={index}>
                                        <Typography>
                                            <Link to={page.url} className="link">
                                                {page.name}
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Stack>
                        </MenuList>
                    </Box>
                    {/*<Box sx={{flexGrow: 0}}>*/}
                    {/*    <IconButton*/}
                    {/*        onClick={() => {}}*/}
                    {/*        size="large"*/}
                    {/*        aria-controls="menu-appbar"*/}
                    {/*        aria-haspopup="true"*/}
                    {/*        color="inherit"*/}
                    {/*    >*/}
                    {/*        <TranslateOutlined />*/}
                    {/*    </IconButton>*/}
                    {/*</Box>*/}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MenuBar;
