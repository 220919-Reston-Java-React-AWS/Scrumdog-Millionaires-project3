

import { AppBar, Container, CssBaseline, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar } from '@mui/material';
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


const theme = createTheme(
//     {
//     palette: {
//         background:{
//             default: 'tan'
//         }
//     }
// }
);

const styles = {
    paperContainer: {
        backgroundImage: `url(${"https://www.kindpng.com/imgv/TTRxT_map-of-the-world-no-borders-hd-png/"})`,
        width: "100%",
        height: '100%'
    }
};
const drawerWidth = 240;



export default function UserProfile(){
const { user, setUser } = useContext(UserContext);
const [post, setPosts] = useState<Post[]>([])


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



    return(
        
        <div style={{backgroundImage:"url('https://www.kindpng.com/picc/m/4-41696_map-of-the-world-no-borders-hd-png.png')",
        width:'100%'
        
        }}>
        <Navbar />
      
     
        
                <h2 style={{textAlign: 'center'}}> Welcome {user?.firstName} </h2> 
                                    
          
                <h3 style={{textAlign: 'center'}}> Name: {user?.firstName}  {user?.lastName}</h3> 
                                   
                <h2 style={{textAlign: 'center', color: 'orange', }}> Posts</h2>            

           

            <Grid container justifyContent={"center"}>
            <Grid item sx={{width: '60%', mb: '20px', }} >
                    {post.map((item) =>(
                    <PostCard post={item} key={item.id} />
                ))
                }
                </Grid> 
                </Grid>
                

        </div >
            
            
        )
    
            
}