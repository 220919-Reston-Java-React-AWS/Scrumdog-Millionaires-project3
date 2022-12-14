import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import Navbar from '../navbar/Navbar';
import { PostCard } from './PostCard';
import Post from '../../models/Post';
import { apiGetAllPosts } from '../../remote/social-media-api/postFeed.api';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import TextField from '@mui/material/TextField';
import { apiUpsertPost } from '../../remote/social-media-api/post.api';


export const PostFeed = () => {  
    const [post, setPosts] = useState<Post[]>([])
    const { user } = useContext(UserContext);
    let welcomeText = 'Welcome!'
    let postForm = <></>;
    const [value, setValue] = React.useState("");
    const [ivalue, setIValue] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let payload = new Post(0, data.get('postText')?.toString() || '', data.get('postImage')?.toString() || '', [], user,[]);
    await apiUpsertPost(payload);
    fetchData();
    setValue("");
    setIValue("");
  }

    if (user) {
        postForm = <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          required
            id="postText"
            name='postText'
            label="Thoughts You Would Like to Share?"
            fullWidth
            onChange ={(e) => {
                setValue(e.target.value)
              }}
              defaultValue = {value}
              value = {value}
          />
          <TextField
              id="postImage"
              name="postImage"
              label="Add an Image or Diagram?"
              fullWidth
              variant="standard"
              onChange ={(e) => {
                setIValue(e.target.value)
              }}
              defaultValue = {ivalue}
              value = {ivalue}
          />
          <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="warning"
          >
              Create Post
          </Button>
        </Box>
        
        welcomeText = `Welcome, ${user.firstName}!`
    }
    const fetchData = async () => {
        const result = await apiGetAllPosts()
        setPosts(result.payload.reverse())
    }

    useEffect(() => {
        fetchData()
       }, []);

       let noPostsText = <></>;

       if(post.length === 0) {
            noPostsText =
                        
            <h2 style={{textAlign: 'center', marginTop: '3%'}}>
                There are no posts, share your thoughts!
            </h2>;
       }
    
    return (
        <>
           <Navbar />
         
                <h2 style={{textAlign: 'center'}}>{ welcomeText }</h2>
                { postForm }             
           
            <Grid container justifyContent={"center"}>
                <Grid item sx={{width: '60%', mb: '20px'}}>
                    {post.map((item) =>(

                    <PostCard post={item} key={item.id} setPosts={setPosts} posts ={post} />

                ))
                }
                </Grid> 
            </Grid>
            { noPostsText } 
        </>
    )
};