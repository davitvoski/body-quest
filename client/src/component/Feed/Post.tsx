import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { IPost, IPostLikedUser } from "../../../../shared";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";

type PostProps = { 
  post: IPost;
  user?: IPostLikedUser;
};

export const Post = (props: PostProps) => {  
  const toggleLikedPost = async () => {
    if (props.user) {
      await axios.post("/api/posts/likePost", {post: props.post, user:props.user})
    }
    else {
      
    }
  }
  
  return (
    <Card 
      sx={{width: "500px", marginBottom:"20px" }}
      elevation={12} 
    >
      <CardHeader 
        sx={{textAlign:"left"}}
        avatar={
          <Avatar 
            src={props.post.user.picture}
            alt={`${props.post.user.username}'s post`}
          />
        }
        title={props.post.user.username}
        subheader={props.post.date}
      />

      <CardMedia 
        component="img"
        image={props.post.imageUrl}
        alt={`${props.post.user.username}'s image`} 
        width="100%"   
        height="500vh"    
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to liked" onClick={toggleLikedPost}>
          <FavoriteBorderIcon />
        </IconButton>
        <Typography>{props.post.likedUsers.length} Likes</Typography>
      </CardActions>

      <CardContent>
        <Typography align="left">
          {props.post.caption}
        </Typography>
      </CardContent>

    </Card>
  );
}