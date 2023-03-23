import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { IPost } from "../../../../shared";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

type PostProps = {
  post: IPost;
  removePost: Function;
};

export const Post = (props: PostProps) => {
  const {t} = useTranslation();
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);

  /**
   * check if is admin user when loggin
   * @returns ifAdmin
   */
  const ifAdmin=async () => {
    const res = await fetch("/api/authentication/getUser");
    const checkUser = await res.json();
    if (checkUser.user !== undefined) {
      if(checkUser.user.isAdmin){
        setIsAdmin(true);
      }
    }
  }
 
  useEffect(() => {
   ifAdmin();
  }, [])
  return (
    <Card
      sx={{ width: "500px", marginBottom: "20px" }}
      elevation={12}
    >
      <CardHeader
        sx={{ textAlign: "left" }}
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
        <IconButton aria-label="add to liked">
          <FavoriteBorderIcon />
        </IconButton>
      
        {/* admin user can delete posts */}
       {isAdmin && <Button onClick={()=>{props.removePost(props.post)}} variant="contained">{t('delete_btn')}</Button>}
      </CardActions>
      <CardContent>
        <Typography align="left">
          {props.post.caption}
        </Typography>
      </CardContent>

    </Card>
  );
}