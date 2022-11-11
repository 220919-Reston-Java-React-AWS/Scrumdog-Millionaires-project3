import UserProfile from "./UserProfile";

import { Container, Grid } from '@mui/material';
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
interface postProps {
    post: Post,
    key: number
}



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
        <Navbar/>
        <Container maxWidth="xl" sx={{
                backgroundColor: '#fff',
                height: 'auto'
            }}>
                <h2 style={{textAlign: 'center'}}> Welcome to {state.firstName}'s profile</h2> 
                          
            </Container> 

            <Container maxWidth="xl" sx={{
                backgroundColor: '#fff',
                height: 'auto'
            }}>
                <h3 style={{textAlign: 'center'}}> Name: {state.firstName}  {state.lastName}</h3> 
                          
            </Container>
            <Container maxWidth="xl" sx={{
                backgroundColor: '#fff',
                height: 'auto'
            }}>
                <h2 style={{textAlign: 'center', color: 'orange', }}> Posts</h2>            
            </Container> 

            <Grid container justifyContent={"center"}>
            <Grid item sx={{width: '60%', mb: '20px', }} >
                    {post.map((item) =>(
                    <PostCard post={item} key={item.id}/>
                ))
                }
                </Grid> 
                </Grid>

        </>
        )
}