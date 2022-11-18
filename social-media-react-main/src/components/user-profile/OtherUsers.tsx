import UserProfile from "./UserProfile";

import { Box, Container, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { apiGetAllPostsByUser } from '../../remote/social-media-api/profileFeed.api';
import Navbar from '../navbar/Navbar';
import { PostCard } from '../post-feed/PostCard';
import { useLocation } from "react-router-dom";


const theme = createTheme();


export default function OtherUser(){
const { user, setUser } = useContext(UserContext);
const [post, setPosts] = useState<Post[]>([])
const {state} = useLocation();



const fetchData = async () => {
    let currentuserid = state.id;
    const result = await apiGetAllPostsByUser(currentuserid)
    setPosts(result.payload.reverse())
    console.log(user?.id)
}

useEffect(() => {
    fetchData()
   }, []);

   let noPostsText = <></>;

   if(post.length === 0) {
        noPostsText = 
        <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
            There are no posts associated with this user!
        </h2>;
   }

    return(
        <>
         <div
        //   style={{backgroundImage:"url('https://www.kindpng.com/picc/m/4-41696_map-of-the-world-no-borders-hd-png.png')",
        // width:'100%'
        
        // }}
        >
        <Navbar/>
        <Container component="main" maxWidth="xs">
        
                <Box
                
            sx={{           
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#4A4A4A99',       
                boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
            }}>
  
                <h2 style={{textAlign: 'center'}}> Welcome to {state.firstName}'s profile</h2> 
                          

                <h3 style={{textAlign: 'center'}}> Name: {state.firstName}  {state.lastName}</h3> 
                          
           
                <h2 style={{textAlign: 'center', color: 'orange', }}> Posts</h2>    
                </Box>
            </Container>        

            <Grid container justifyContent={"center"}>
            <Grid item sx={{width: '60%', mb: '20px', }} >
                    {post.map((item) =>(
                    <PostCard post={item} key={item.id} posts={post} setPosts={setPosts}/>
                ))
                }
                </Grid> 
                </Grid>
                </div>
        
        </>
        )
}