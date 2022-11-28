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
import { useContext, useEffect, useState } from 'react';
import { User, UserContext } from '../../context/user.context';
import {css} from '@emotion/react';
import { DirectMessageModel } from '../../models/DirectMessageModel';
import axios from 'axios';
import { request } from 'http';
import Navbar from '../navbar/Navbar';
import { apiGetMgsBetweenUsers, apiSendMsg } from '../../remote/social-media-api/auth.api';
import { DirectMessageCard } from './DirectMessageCard';
import { ResultType } from '@remix-run/router/dist/utils';

function DirectMessaging () {

    const [dm, setDMs] = useState<DirectMessageModel[]>([])
    const { user, setUser } = useContext(UserContext);
    const [recId, setRecId] = useState(0);
    const [tx, setTx] = useState('');
    const theme = createTheme();
    let msg:DirectMessageModel = {
        text: "",
        sender: user
    }
    let receiver_id: any;
    let msgForm = <></>; 

    
    function setReceiver (event: React.ChangeEvent<HTMLInputElement>) {
        
        receiver_id = parseInt(event.target.value);
        setRecId(receiver_id);

    }

    function setText (event: React.ChangeEvent<HTMLInputElement>) {
        msg.text = event.target.value;
        setTx(msg.text);
    }

    const fetchMsg = async () => {
        const result = await apiGetMgsBetweenUsers(recId);
        console.log(result.payload);
        setDMs(result.payload)
    }

    const sendDM = async ( event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await apiSendMsg(msg, recId, tx)
        console.log(response);
        fetchMsg();
        console.log(recId);

    }

    if (user) {
        msgForm = <form onSubmit={sendDM}>
        <Container component="main" maxWidth="xs" css = {css `display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 1rem `}>

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
    }
    else {
        msgForm = <h2 style={{textAlign: 'center', marginTop: '3%'}}>
        You are not logged in!
    </h2>;
    }

    useEffect(() => {
        fetchMsg()
       }, []);

    return (
        <><><Navbar /></><ThemeProvider theme={theme}>
            <h2 style={{textAlign: 'center', marginTop: '3%'}}>
                This is the beginning of your direct message history with this user.
            </h2>
            <Grid container justifyContent={"center"} >
                <Grid item sx={{width: '60%', mb: '20px'}}>
                    {dm.map((item) =>(
                        <DirectMessageCard dm = {item} key = {item.id} dms = {dm} setDMs = {setDMs}/>
                    ))}
                </Grid>
            </Grid>
            
            {msgForm}

        </ThemeProvider></>
    )
}

export default DirectMessaging