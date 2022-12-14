
import { AppBar, Box, Container, CssBaseline, Divider, Drawer, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { apiGetAllPostsByUser } from '../../remote/social-media-api/profileFeed.api';
import Navbar from '../navbar/Navbar';
import { PostCard } from '../post-feed/PostCard';
import SettingsIcon from '@mui/icons-material/Settings';
import { css, jsx } from "@emotion/react";
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

export default function UserProfile(){
const { user, setUser } = useContext(UserContext);
const [post, setPosts] = useState<Post[]>([])
const navigate = useNavigate();


const fetchData = async () => {
    let currentuserid = user?.id!;
    const result = await apiGetAllPostsByUser(currentuserid)
    setPosts(result.payload.reverse())
}


const loadDataOnlyOnce = useCallback(() =>{
    console.log(`Hello there ${user?.id}`)
}, [user])

useEffect(() => {
    fetchData();
   }, [loadDataOnlyOnce]);

   let noPostsText = <></>;

   if(post.length === 0) {
        noPostsText = 
        <h2 style={{textAlign: 'center', marginTop: '3%', color: 'gray'}}>
            There are no posts associated with this user!
        </h2>;
   }

   
   function handleAboutMe(){
    navigate('/about-me',{state:{id: user?.id, name:user?.firstName}} )
    }

    return(
        
        <div >
        <Navbar />       
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
                >

        <Box sx ={{backgroundColor: '#4A4A4A',       
                boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)',
                color: 'black'}}>
        <MenuList>
          <MenuItem onClick={handleAboutMe} sx = {{textDecoration: 'none !important', color:'black !important'}} > About Me</MenuItem>      
        </MenuList>
        </Box>

            <Container component="main" maxWidth="xs">
        
                <Box
                
            sx={{           
                marginTop: 8,
                marginRight: 16,
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#4A4A4A99',       
                boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
                
            }}>
            
                    <h2 style={{textAlign: 'center'}}> Welcome {user?.firstName} </h2> 
                                        
                    <h3 style={{textAlign: 'center'}}> Name: {user?.firstName}  {user?.lastName}</h3> 
                                    
                    <h2 style={{textAlign: 'center', color: 'orange', }}> Posts</h2>            

                </Box>
            </Container>

            <Grid container justifyContent={"center"}>
            <Grid item sx={{width: '60%', mb: '20px', }} >
                    {post.map((item) =>(
                    <PostCard post={item} key={item.id} setPosts={setPosts} posts ={post}/>
                ))
                }
                </Grid> 
                </Grid>
                </Grid>
        </div >
               
        ) 
            
}