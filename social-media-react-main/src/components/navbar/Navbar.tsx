import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockResetIcon from '@mui/icons-material/LockReset';
import { apiLogout } from '../../remote/social-media-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import ForestIcon from '@mui/icons-material/Forest';
import { Switch } from '@mui/material';
import DarkMode from '../darkMode/DarkMode';

import BedtimeOffIcon from '@mui/icons-material/BedtimeOff';
import BedtimeIcon from '@mui/icons-material/Bedtime';

import MessageIcon from '@mui/icons-material/Message';



export default function Navbar() {

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(<></> );
    const [tipTitleLog, setTipTitleLog] = useState('');
    const [userIcon, setUserIcon] = useState(<></>);
    const [tipTitleUse, setTipTitleUse] = useState('');
    const [resetPssword, setResetPsswrd] = useState(<></>);
    const [tipTitleUse1, setTipTitleUse1] = useState('');
    const [directMsg, setDirectMsg] = useState(<></>);
    const [tipTitleUse2, setTipTitleUse2] = useState('');
    
    
    useEffect(() => {
        if(user) {
          setDirectMsg(< MessageIcon />);
          setTipTitleUse2('Direct Messages');
          setResetPsswrd(< LockResetIcon />);
           setTipTitleUse1('Reset Password'); 
           setUserIcon(< AccountBoxIcon />);
           setTipTitleUse('User Profile'); 
            setLoggedIn(<LogoutIcon />);
            setTipTitleLog('Logout');         
        } else {
          setUserIcon( <></>);
           setTipTitleUse(''); 
            setLoggedIn(<LoginIcon />);
            setTipTitleLog('Login');
        }
    }, [user]);

    function handleAuth() {
        if(user) {
            apiLogout();
            setUser();
            navigate('/');
        } else {
           navigate('/login'); 
        }
    } 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="nav" className='nav' position="static" >
        <Toolbar>
          <ForestIcon/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  onClick={() => navigate('/')}>
            TraveLog
          </Typography>
            <div>
            <DarkMode />
            <Tooltip disableFocusListener disableTouchListener title={tipTitleUse2}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate('/messages')}
            >
                {directMsg}
            </IconButton>
            </Tooltip>

            <Tooltip disableFocusListener disableTouchListener title={tipTitleUse1}>
                          
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate('/change-password')}
            >
                {resetPssword}
            </IconButton>
            </Tooltip>
            <Tooltip disableFocusListener disableTouchListener title={tipTitleUse}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate('/current-profile')}
            >
                {userIcon}
            </IconButton>
            </Tooltip>

            <Tooltip disableFocusListener disableTouchListener title={tipTitleLog}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => handleAuth()}
                color="inherit"
            >
                {loggedIn}
            </IconButton>
            </Tooltip>
           
          

            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
