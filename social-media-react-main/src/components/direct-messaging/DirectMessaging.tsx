/** @jsxImportSource @emotion/react */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import {css} from '@emotion/react'

function DirectMessaging () {

    const { user } = useContext(UserContext);
    const theme = createTheme();


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" css = {css `display: flex; flex-direction: column; justify-content: flex-end; height: 100vh; padding-bottom: 1rem `}>
                <TextField
                id="text"
                name="text"
                label="Send a message"
                fullWidth
                variant="standard"
                />
            </Container>
        </ThemeProvider>
    )
}

export default DirectMessaging