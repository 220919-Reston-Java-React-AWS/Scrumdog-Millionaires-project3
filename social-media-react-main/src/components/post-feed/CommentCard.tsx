/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Comments from "../../models/Comments";
import Post from "../../models/Post";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { ILikes } from "../../models/LikesModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { css } from "@emotion/react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { Comments as CommentsApi } from "../api/commentApi";
import { ThemeConsumer } from "styled-components";

interface commentProps {
  comment: Comments;
  post: Post;
  key: number;
  comments: Comments[];
  setComments:(updatedComment: Comments[]) => void;
}

export default function CommentCard(cprops: commentProps) {
  const comText = cprops.comment.text;
  // console.log(comText);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  //@ts-ignore
  const [liked, setLiked] = React.useState(
    cprops.post.likes.includes(user?.id!) ? true : false
  );

  const [isError, setIsError] = React.useState<boolean>(false);

  const [likesIdArray, setLikesIdArray] = useState([...cprops.post.likes]);

  function handleProfile() {
    if (user?.id !== cprops.comment.author.id) {
      navigate("/other-user", {
        state: {
          id: cprops.comment.author.id,
          firstName: cprops.comment.author.firstName,
          lastName: cprops.comment.author.lastName,
          email: cprops.comment.author.email,
        },
      });
    } else {
      navigate("/current-profile");
    }
  }

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

  const handleDelete = (id: number) => {
    CommentsApi.deleteCommment(id)
      .then((data) => {
        let updatedComment = cprops.comments.filter((comment: {id:number;}) => comment.id !== id);
        cprops.setComments(updatedComment);
      })
      .then((err) =>{
        setIsError(true)
      } 
  )}

  return (
    <div>
      <Card sx={{ maxWidth: "100%", marginTop: "3%" }}>
        <CardHeader
          title={cprops.comment.author.firstName}
          avatar={
            <Avatar sx={{ bgcolor: "#ed6c02" }} aria-label="recipe">
              <PersonOutlineOutlinedIcon onClick={handleProfile} />
            </Avatar>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {comText}
          </Typography>
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
                {(user?.id === cprops.post.author.id ||
                  user?.id === cprops.comment.author.id) && (
                  <span
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={() => handleDelete(cprops.comment.id!)}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </span>
                )}
              </ListItem>
            </List>
          </CardActions>
        </CardContent>
      </Card>

      {/* {cprops.comment} */}
    </div>
  );
}
