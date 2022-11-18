/** @jsxImportSource @emotion/react */
import * as React from "react";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import Post from "../../models/Post";
import {
  Box,
  Container,
  Button,
  Paper,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  createStyles,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import { apiUpsertPost } from "../../remote/social-media-api/post.api";
import { UserContext } from "../../context/user.context";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { css } from "@emotion/react";
import { ILikes } from "../../models/LikesModel";
import { Likes } from "../api/postApi";
import { apiGetAllPosts } from "../../remote/social-media-api/postFeed.api";
import { useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Comments from "../../models/Comments";
import { apiGetAllCommentsByPost, apiUpsertComment } from "../../remote/social-media-api/comment.api";
import CommentCard from "./CommentCard";
import { setConstantValue } from "typescript";
import SelectInput from "@mui/material/Select/SelectInput";
import DeleteIcon from "@mui/icons-material/Delete";
import {DeletePost} from "../api/postApi";


interface postProps {
  post: Post;
  // comment: Comments;
  key: number;
}

interface commentProps {
  comment: Comments;
  post:Post;
  key: number;
	posts: Post[]; //add
	setPosts: (updatedPost: Post[]) => void; //add
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
}));


export const PostCard = (props: postProps, cprops: commentProps) => {
  const { user} = useContext(UserContext);
  const [expanded, setExpanded ] = React.useState(false);

  //@ts-ignore
  const [liked, setLiked] = React.useState(
    props.post.likes.includes(user?.id!) ? true : false
  );
  // const [likesCount, setLikesCount] = React.useState(props.post.likes.length);

  const [likesIdArray, setLikesIdArray] = React.useState([...props.post.likes]);


  const [uComment, setComments] =React.useState<Comments[]>([])


// console.log(likesIdArray);

	const [isError, setIsError] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const LikeButton: React.FC = () => {
  //   const [liked, setLiked] = React.useState(false);
  //   const Icon = liked ? ThumbUpIcon : ThumbUpOffAltIcon;

  //   const handleUnlike = () => {
  //     setLiked(false);
  //   };

  //   const handleLike = () => {
  //     setLiked(true);
  //   };

  //   const onClick = liked ? handleUnlike : handleLike;

  //   return (
  //     <Icon
  //       css={css`
  //         cursor: pointer;
  //       `}
  //       color="success"
  //       onClick={onClick}
  //     />
  //   );
  // };



  const handleLikeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    //@ts-ignore
    if (!likesIdArray.includes(user?.id)) {
      setLiked(true);
      //@ts-ignore
      Likes.likeUnlikPost({ post_id: props.post.id, user_id: user?.id });
      //@ts-ignore
      setLikesIdArray([...likesIdArray, user?.id!]);
      // setLikesCount(likesCount - 1);
    } else {
      setLiked(false);
      //@ts-ignore
      Likes.likeUnlikPost({ post_id: props.post.id, user_id: user?.id });
      const index = likesIdArray.indexOf(user?.id!);
      if (index > -1) {
        likesIdArray.splice(index, 1);
      }
    }

  };



  let media = <></>;
  let commentForm = <></>;


  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let payloadcom = (
      new Comments(0, data.get("commentText")?.toString() || "",  user, props.post)
    );
    // console.log(payloadcom);
    await apiUpsertComment(payloadcom);
    // event.target.reset();
    setValue("");
     
    fetchComments();

  };


  const fetchComments = async () => {
    const result = await apiGetAllCommentsByPost(props.post.id);
    setComments(result.payload);
    // console.log(uComment);
    
    
}

useEffect(() => {
  fetchComments();
 
 }, []);


const [value, setValue] = React.useState("");
function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

if (user) {
    commentForm = (
      <Paper
        component="form"
        sx={{
          
          p: "4px 0",
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: "15px",
          backgroundColor: '#4A4A4A99',
          boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)'
        }}
        elevation={1}
        onSubmit={handleComment}
      >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id="commentText"
        name="commentText"
        placeholder="Make a comment..."
        inputProps={{ "aria-label": "Make a comment" }}
        onChange ={(e) => {
          setValue(e.target.value)
        }}
        defaultValue = {value}
        value = {value}
        
        
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="submit" >
        <AddCircleIcon color="warning"  />
      </IconButton>

    </Paper>
  };



  if (props.post.imageUrl) {
    media = (
      <CardMedia
        component="img"
        src={props.post.imageUrl}
        alt="post image"
        sx={{
          maxHeight: "300px",
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    );
  }



function handleProfile(){
if(user?.id !== props.post.author.id){
  
     navigate('/other-user', {state:{id:props.post.author.id, firstName:props.post.author.firstName, lastName:props.post.author.lastName, email:props.post.author.email}})

  }else{navigate('/current-profile' )




	const handleDelete = (id: number) => {
    DeletePost.deletePost(id)
      .then((data) => {
        let updatedPost = props.posts.filter((post) => post.id !== id);
        props.setPosts(updatedPost);
      })
      .then((err) => {
        setIsError(true)
      })
	};



  return (
    <Box sx={{ backgroundColor: '#4A4A4A99',       
    boxShadow: '10px 10px 4px rgba(0, 0, 0, .400)', maxWidth: "100%", marginTop: "3%" }}>
      <CardHeader
        title={props.post.author.firstName}
        avatar={
          <Avatar sx={{ bgcolor: "#ed6c02" }} aria-label="recipe">
            <PersonOutlineOutlinedIcon onClick={handleProfile} />
          </Avatar>
        }
      />

      {media}
      <CardContent>
        <Typography variant="body2">


          {props.post.text}
          
          
        
        </Typography>
      </CardContent>
      <CardActions
        css={css`
          display: flex;
          justify-content: space-between;
        `}
        disableSpacing
      >
        <List>
          <ListItem>
            <ListItemText
              primary={`${likesIdArray.length} ${
                likesIdArray.length === 1 ? "like" : "likes"
              }`}
            />
          </ListItem>
          <ListItem>
            <span
              css={css`
                cursor: pointer;
              `}
              onClick={handleLikeButton}
            >
              {liked ? (
                <IconButton>
                  <ThumbUpIcon />
                </IconButton>
              ) : (
                <IconButton>
                  <ThumbUpOffAltIcon />
                </IconButton>
              )}
            </span>
          </ListItem>
        </List>
        <List css={css`width: 8%; padding-top:3rem; height:100%; display:flex; justify-content:space-around; align-items: flex-end`}>
          <ListItem>
            { user?.id === props.post.author.id &&
            <span
              css={css`
                cursor: pointer;
              `}
              onClick={() => handleDelete(props.post.id!)}
            >
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </span>
            }
            {/* <Typography variant="subtitle2">
                <span></span>
              </Typography> */}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <InsertCommentIcon />
            </ExpandMore>
            {/* </div>
            </div> */}
          </ListItem>
        </List>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {commentForm}
          <Typography paragraph>comments:</Typography>
          <Grid container justifyContent={"center"}>
            <Grid item sx={{ width: "100%" }}>


             {uComment.map((item) => (
              <CommentCard comment = {item} key = {item.id} post = {props.post}/> ))}
              

            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Box>
  );
};

