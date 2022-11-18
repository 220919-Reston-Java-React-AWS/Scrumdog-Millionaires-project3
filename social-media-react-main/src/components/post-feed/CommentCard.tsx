import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import Comments from "../../models/Comments";
import Post from "../../models/Post";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';




interface commentProps {
    comment: Comments;
    post: Post;
    key: number;
  }

export default function CommentCard(cprops: commentProps){
    const comText = cprops.comment.text;
    // console.log(comText);
    const { user} = useContext(UserContext);
    const navigate = useNavigate();


    function handleProfile(){
        if(user?.id !== cprops.comment.author.id){
          
             navigate('/other-user', {state:{id:cprops.comment.author.id, firstName:cprops.comment.author.firstName, lastName:cprops.comment.author.lastName, email:cprops.comment.author.email}})
        
          }else{navigate('/current-profile' )
          }
        }

    

    return (
        <div>

            
    <Card sx={{maxWidth:"100%", marginTop: "3%" }}>
      
      <CardHeader
        title={cprops.comment.author.firstName}
        avatar={
  
            <Avatar sx={{ bgcolor: '#ed6c02' }} aria-label="recipe" >
  
                  <PersonOutlineOutlinedIcon onClick={handleProfile} />
  
  
  
            </Avatar>
          }
          />
         <CardContent>
        <Typography variant="body2" color="text.secondary">
          {comText}
        </Typography>
      </CardContent>
          </Card>
     

            {/* {cprops.comment} */}
              
         
          </div>
    )
}