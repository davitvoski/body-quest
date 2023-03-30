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
import { useNavigate } from "react-router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

type PostProps = {
  post: IPost;
  removePost: Function;
  user?: IPostLikedUser;
};

export const Post = (props: PostProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  // check if the post belong to current user
  const [currentUserPosts, setCurrentUserPosts] = useState<Boolean>(false);
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
      if (checkUser.user.username === props.post.user.username) {
        setCurrentUserPosts(true);
      }
    }
  };

  /**
   * check if loggin user is admin or not
   */
  useEffect(() => {
    ifAdmin();
  }, []);

  useEffect(() => {}, [post]);

  return (
    <>
<<<<<<< HEAD
      <Card sx={{ width: "500px", marginBottom: "20px" }} elevation={12}>
        <SnackbarProvider autoHideDuration={2000} maxSnack={1} />
=======
      <Card
        sx={{ width: "500px", margin: "auto auto 5% auto" }}
        elevation={12}
      >
        <SnackbarProvider autoHideDuration={2000} />
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e

        <CardHeader
          sx={{ textAlign: "left" }}
          avatar={
            <Avatar
              src={post.user.picture}
              alt={`${post.user.username}'s post`}
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

          <Typography>{post.likedUsers.length} {t('likes')}</Typography>
        </CardActions>

        <CardContent>
          <Typography align="left">{post.caption}</Typography>
        </CardContent>
        {/* admin user or the owner of post can delete posts */}
        {(isAdmin || currentUserPosts) && (
          <Button
            fullWidth
            onClick={() => {
              props.removePost(post);
            }}
            variant="contained"
          >
            {t("delete_btn")}
          </Button>
        )}
      </Card>
    </>
  );
};
