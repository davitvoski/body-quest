import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { IPost, IPostLikedUser } from "../../../../shared";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useEffect, useState } from "react";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

type PostProps = {
  post: IPost;
  user?: IPostLikedUser;
};

export const Post = (props: PostProps) => {
  let navigate = useNavigate();

  const [post, setPost] = useState<IPost>(props.post);
  const toggleLikedPost = async () => {
    if (props.user) {
      let response = await axios.post("/api/posts/togglelikedPost", {
        post: post,
        user: props.user,
      });
      setPost(response.data.post);
    } else {
      enqueueSnackbar("Log in to like a post", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
  };

  useEffect(() => {}, [post]);

  return (
    <Card sx={{ width: "500px", marginBottom: "20px" }} elevation={12}>
      <SnackbarProvider autoHideDuration={2000} maxSnack={1} />

      <CardHeader
        sx={{ textAlign: "left" }}
        avatar={
          <Avatar
            src={props.post.user.picture}
            alt={`${props.post.user.username}'s post`}
            onClick={() => {
              navigate(`/users/${props.post.user.username}`, {
                state: { user: props.post.user },
              });
            }}
            sx={{ cursor: "pointer" }}
          />
        }
        title={post.user.username}
        subheader={post.date}
      />

      <CardMedia
        component="img"
        image={post.imageUrl}
        alt={`${post.user.username}'s image`}
        width="100%"
        height="500vh"
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to liked" onClick={toggleLikedPost}>
          {(post.likedUsers.some(
            (someUser) => someUser.email === props.user?.email
          ) && <FavoriteIcon sx={{ color: "red" }} />) || (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography>{post.likedUsers.length} Likes</Typography>
      </CardActions>

      <CardContent>
        <Typography align="left">{post.caption}</Typography>
      </CardContent>
    </Card>
  );
};
