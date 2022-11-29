import { Box, Button, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import { apiGetAboutMe, apiUpdateAboutMe } from "../../../remote/social-media-api/profileFeed.api";
import Navbar from "../../navbar/Navbar";

export default function AboutMe(){

    const { user, setUser } = useContext(UserContext);
    const [aboutMe, setAboutMe] = React.useState("");
    const [newAboutMe, setNewAboutMe] = React.useState("");
    const {state} = useLocation();
    const [isShown, setIsShown] = React.useState(false);

    const fetchData = async () => {
        let currentuserid = state?.id!;
        const result = await apiGetAboutMe(currentuserid)
        setAboutMe(result.payload);
    }
// Used to determine if the update form box is shown or not
    const handleClick = () =>{
        setIsShown(current => !current);
      }

      const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) =>{
        setNewAboutMe(e.target.value);
      }

    useEffect(() => {
        fetchData();
       });

       const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsShown(current => !current);
        const string = newAboutMe;
        const response = await apiUpdateAboutMe(user?.id!, string)
        fetchData();
        
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
                justifyContent:'center',
                backgroundColor: '#4A4A4A99',       
                boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
                
            }}>
            
                    <h2 style={{textAlign: 'center'}}> This is {state?.name}'s about me </h2> 
                    </Box>

            <Box  sx={{ backgroundColor: '#4A4A4A99',       
                        boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)',  
                        marginTop: "3%", 
                        marginLeft: '10px',
                        marginRight: '10px'
                        }}>
        
        <CardContent>
        <Typography variant="body2" sx={{fontSize:'28px !important'}} align='center' justifySelf='center'>

        {aboutMe} 
          
        </Typography>
      </CardContent>
      </Box>
        <Box>
      {user?.id == state.id && isShown == false &&
      <div>
      <br/>

      <Button  type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="warning" onClick={handleClick}>Update about me</Button>
      
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
                    
                }}>
                    <br/>
                    
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                    <Box sx = {{
                        backgroundColor: 'white',

                    }} >
                <TextField
                sx={{
                    width: {  md: 800 },                    
                }}
                    id="outlined-textarea"
                    multiline
                    onChange={handleChange}
                    
                 />
                 </Box>

                <Button   
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="warning" type="submit" >Update</Button> 
                <Button   type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="warning" onClick={handleClick}> Go back</Button>

                </Box>
              </Box> }
      </Box>
                             
             
        </>
    )


}