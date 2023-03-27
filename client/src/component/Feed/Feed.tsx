import { Box, Button, LinearProgress, Typography } from "@mui/material";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPost, IPostLikedUser, IUser } from "../../../../shared";
import { Post } from "./Post";

export const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IPostLikedUser>();

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data: IPost[] = await res.json() as IPost[];
    setPosts(data);
  }

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      const user: IPostLikedUser = { username: data.user.username, email: data.user.email }
      setUser(user);
    }
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  /**
    * if is admin, then user can delete post
    */
  const removePost = (post: IPost) => {
    let allPosts: IPost[] = posts.filter(currentPost => currentPost.imageUrl !== post.imageUrl);
    let response = confirm(`${t('confrimDeletePost') as string}`);
    if (response) {
      deletPost(post);
      setPosts(allPosts);
    }
  }


  /**
   * delete post, send request to server
   * @param post IPost
   */
  const deletPost = async (post: IPost) => {
    try {
      await axios.delete("/api/posts", {
        data: {
          post: post
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {posts.length === 0 && <LinearProgress sx={{ width: "100%" }} />}
      {posts && posts.slice(0).reverse().map((post, index) => (
        <Post removePost={removePost} post={post} key={index + post.imageUrl} user={user} />
      ))}
    </Box>
  );
}