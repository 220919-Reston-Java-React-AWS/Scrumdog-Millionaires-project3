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
import { User, UserContext } from '../../context/user.context';
import {css} from '@emotion/react';
import { DirectMessageModel } from '../../models/DirectMessageModel';
import axios from 'axios';
import { request } from 'http';
import Navbar from '../navbar/Navbar';
import { apiSendMsg } from '../../remote/social-media-api/auth.api';

function DirectMessaging () {

    const { user, setUser } = useContext(UserContext);
    const theme = createTheme();
    let msg:DirectMessageModel = {
        text: "",
        sender: user
    }
    let receiver_id: any; 

    function setReceiver (event: React.ChangeEvent<HTMLInputElement>) {
        receiver_id = parseInt(event.target.value);

    }

    function setText (event: React.ChangeEvent<HTMLInputElement>) {
        msg.text = event.target.value;
    }

    const sendDM = async ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const response = await apiSendMsg(msg, receiver_id, msg.text)
        console.log(response);
    }


    return (
        <><><Navbar /></><ThemeProvider theme={theme}>
            <form onSubmit={sendDM}>
            <Container component="main" maxWidth="xs" css = {css `display: flex; flex-direction: column; justify-content: flex-end; height: 100vh; padding-bottom: 1rem `}>

            <TextField
                id="text"
                name="text"
                label="Type the ID of the user you wish to send a message to."
                fullWidth
                variant="standard"
                onChange={setReceiver}
                />

                <TextField
                id="text"
                name="text"
                label="Send a message"
                fullWidth
                variant="standard"
                onChange={setText}
                />
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
              </Button>
            </Container>
            </form>
        </ThemeProvider></>
    )
}

export default DirectMessaging