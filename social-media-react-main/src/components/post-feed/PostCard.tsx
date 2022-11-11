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

interface postProps {
  post: Post;
  key: number;
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

export const PostCard = (props: postProps) => {
  const { user } = useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);
  const [numberOfLikes, setNumberOfLikes] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const LikeButton: React.FC = () => {
    const [liked, setLiked] = React.useState(false);
    const Icon = liked ? ThumbUpIcon : ThumbUpOffAltIcon;

    const handleUnlike = () => {
      setLiked(false);
    };

    const handleLike = () => {
      setLiked(true);
    };

    useEffect(() => {
      if (props.post.likes.includes(user?.id!)) {
        console.log(liked);
        Likes.likeUnlikPost({ post_id: props.post.id, user_id: user?.id! });
      } else {
        console.log(liked);
        Likes.likeUnlikPost({ post_id: props.post.id, user_id: user?.id! });
      }
    }, [liked]);

    const onClick = liked ? handleUnlike : handleLike;

    return (
      <Icon
        css={css`
          cursor: pointer;
        `}
        color="success"
        onClick={onClick}
      />
    );
  };

  // const handleLikeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   // event.preventDefault();

  //   console.log("did something happen?");

  //   if(props.post.likes.includes(user?.id!)){
  //     setLiked(false)
  //     console.log(liked);
  //     Likes.likeUnlikPost({post_id: props.post.id, user_id:user?.id!});
  //   } else {
  //     setLiked(true)
  //     console.log(liked);
  //   Likes.likeUnlikPost({post_id: props.post.id, user_id:user?.id!});
  //   }

  // }

  let media = <></>;
  let commentForm = <></>;

  const handleComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    props.post.comments.push(
      new Post(0, data.get("commentText")?.toString() || "", "", [], user, [])
    );
    let payload = props.post;
    await apiUpsertPost(payload);
  };

  commentForm = (
    <Paper
      component="form"
      sx={{
        p: "4px 0",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: "15px",
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
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="submit">
        <AddCircleIcon color="warning" />
      </IconButton>
    </Paper>
  );

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

  return (
    <Card sx={{ maxWidth: "100%", marginTop: "3%" }}>
      <CardHeader
        title={props.post.author.firstName}
        avatar={
          <Avatar sx={{ bgcolor: "#ed6c02" }} aria-label="recipe">
            <PersonIcon />
          </Avatar>
        }
      />

      {media}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.post.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <List>
          <ListItem>
            <ListItemText
              primary={`${numberOfLikes} ${
                props.post.likes.length === 1 ? "like" : "likes"
              }`}
            />
          </ListItem>
          <ListItem>
            {/* <span onClick={handleLikeButton}>
        {liked ? <ThumbUpIcon/> : <ThumbUpOffAltIcon />}
        </span> */}
            <span>
              <LikeButton />
            </span>
          </ListItem>
        </List>

        {/* <div css={css`padding-left:0.5em`}>
        <LikeButton/>
        </div> */}

        <Typography variant="subtitle2">
          <span></span>
        </Typography>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <InsertCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {commentForm}
          <Typography paragraph>comments:</Typography>
          <Grid container justifyContent={"center"}>
            <Grid item sx={{ width: "100%" }}>
              {props.post.comments.map((item) => (
                <PostCard post={item} key={item.id} />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
