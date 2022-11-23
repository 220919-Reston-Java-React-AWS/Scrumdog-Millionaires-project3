import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import { apiGetAboutMe } from "../../../remote/social-media-api/profileFeed.api";
import Navbar from "../../navbar/Navbar";




export default function AboutMe(){

    const { user, setUser } = useContext(UserContext);
    const [aboutMe, setAboutMe] = React.useState("");
    const {state} = useLocation();
    const [isShown, setIsShown] = React.useState(false);

    const fetchData = async () => {
        let currentuserid = state?.id!;
        const result = await apiGetAboutMe(currentuserid)
        setAboutMe(result.payload);
    }

    const handleClick = () =>{
        setIsShown(current => !current);
        console.log(isShown);
      }

    useEffect(() => {
        fetchData();
       });

       const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


       }

    return(

        <> 

            <Navbar />
            
            
            <Box
                
            sx={{           
                marginTop: 8,
                marginRight: 100,
                marginLeft: 100,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#4A4A4A99',       
                boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
                
            }}>
            
                    <h2 style={{textAlign: 'center'}}> This is {state?.name}'s about me </h2> 
                    </Box>

            <Box sx={{ backgroundColor: '#4A4A4A99',       
    boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)', maxWidth: "100%", marginTop: "3%"}}>
        
        <CardContent>
        <Typography variant="body2" sx={{fontSize:'28px !important'}}>

        {aboutMe} 
          
        </Typography>
      </CardContent>
      </Box>
        <Box>
      {user?.id == state.id && isShown == false &&
      <div>
      <p>Want to Change your About me? Click below.</p>

      <button onClick={handleClick}>Update about me</button>
      
      </div> 
      
       }
       {isShown &&
                 <Box sx={{           
                    marginTop: 8,
                    marginRight: 70,
                    marginLeft: 70,
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',       
                    boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)',
                    // width: {  md: 800 },
                    
                }}>
                    <br/>
                    {/* <br/> */}
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                sx={{
                    width: {  md: 800 },                    
                }}
                    id="outlined-textarea"
                    multiline
                 />

                <Button type="submit" value="Update" onClick={handleClick}/> 
                <Button onClick={handleClick}> Go back</Button>

                </Box>



                 </Box> }
      </Box>
                             
             
        </>
    )


}