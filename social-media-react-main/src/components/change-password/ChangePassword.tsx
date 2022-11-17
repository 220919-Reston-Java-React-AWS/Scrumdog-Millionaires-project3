import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Navbar from '../navbar/Navbar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { apiChangePassword } from '../../remote/social-media-api/auth.api';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Tooltip } from '@mui/material';



const theme = createTheme();

export default function ChangePassword() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let email = "";
    if(user?.email){
      email = user.email;
    }
    const response = await apiChangePassword(email, `${data.get('password')}`)
    if (response.status >= 200 && response.status < 300) alert('your password has been change') ;
    
    
  };

   

  return (
    <><><Navbar /></><ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        
          sx={{ 
            // backgroundColor: '#F3E6D5',          
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
          }}
        >
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change you Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

      
          <Tooltip title="You can't update this field" followCursor>
          <Box sx={{ bgcolor: 'text.disabled', color: 'background.paper', p: 2 }}>
          {user?.email}
          </Box>
          </Tooltip>
            

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
            <Grid container>
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider></>
    
    
  );
 

}