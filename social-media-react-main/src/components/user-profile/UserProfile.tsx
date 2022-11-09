

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Navbar from '../navbar/Navbar';


const theme = createTheme();


export default function UserProfile(){


    return(
        <>
        <Navbar/>
        <Typography> HI</Typography>
        </>
        )
}