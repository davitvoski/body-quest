import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IPost, IPostLikedUser, IUser } from "../../../../shared";
import { Post } from "./Post";

export const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IPostLikedUser>();

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data:IPost[] = await res.json() as IPost[];
    setPosts(data);  
  }

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      const user:IPostLikedUser = {username: data.user.username, email: data.user.email}
      setUser(user);
    }
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {posts.length === 0 && <LinearProgress sx={{ width:"100%" }}/>}
      {posts && posts.slice(0).reverse().map((post, index)=>(
        <Post post={post} key={index} user={user}/>
      ))}
    </Box>
  );
}