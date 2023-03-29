import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { IPost, IPostLikedUser } from "../../../../shared";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

type PostProps = {
  post: IPost;
  removePost: Function;
  user?: IPostLikedUser;
};


export const Post = (props: PostProps) => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const [post, setPost] = useState<IPost>(props.post);
  const toggleLikedPost = async () => {
    if (props.user) {
      let response = await axios.post("/api/posts/togglelikedPost", { post: post, user: props.user })
      setPost(response.data.post);
    }
    else {
      enqueueSnackbar("Log in to like a post", {
        autoHideDuration: 2000,
        variant: 'error'
      });
    }
  }

  /**
   * check if is admin user when loggin
   * @returns ifAdmin
   */
  const ifAdmin = async () => {
    const res = await fetch("/api/authentication/getUser");
    const checkUser = await res.json();
    if (checkUser.user !== undefined) {
      if (checkUser.user.isAdmin) {
        setIsAdmin(true);
      }
    }
  }

  /**
   * check if loggin user is admin or not
   */
  useEffect(() => {
    ifAdmin();
  }, [])

  useEffect(() => {

  }, [post]);

  return (
    <>
      <Card
        sx={{ width: "500px", margin: "auto auto 5% auto" }}
        elevation={12}
      >
        <SnackbarProvider autoHideDuration={2000} maxSnack={1} />

        <CardHeader
          sx={{ textAlign: "left" }}
          avatar={
            <Avatar
              src={post.user.picture}
              alt={`${post.user.username}'s post`}
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
            {(post.likedUsers.some(someUser => someUser.email === props.user?.email)
              && <FavoriteIcon sx={{ color: "red" }} />)
              || <FavoriteBorderIcon />
            }
          </IconButton>

          <Typography>{post.likedUsers.length} Likes</Typography>
        </CardActions>

        <CardContent>
          <Typography align="left">
            {post.caption}
          </Typography>
        </CardContent>
        {/* admin user can delete posts */}
        {isAdmin && <Button fullWidth onClick={() => { props.removePost(post) }} variant="contained">{t('delete_btn')}</Button>}
      </Card>
    </>
  );
}