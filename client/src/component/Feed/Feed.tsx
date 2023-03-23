import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPost } from "../../../../shared";
import { Post } from "./Post";

export const Feed = () => {
  const {t} = useTranslation();
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data:IPost[] = await res.json() as IPost[];
    setPosts(data);  
  }

  useEffect(() => {
    getPosts();
  }, []);  

   /**
   * if is admin, then user can delete post
   */
   const removePost = (post:IPost) =>{
    let allPosts = posts.filter(elePost => elePost.caption !== post.caption && elePost.date !== post.date);
    let response = confirm(`${t('confrimDeletePost') as string}`); 
    if(response){
      setPosts(allPosts);  
    }
}

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {posts.length === 0 && <LinearProgress sx={{width:"100%"}}/>}
      {posts && posts.slice(0).reverse().map((post, index)=>(
        <Post removePost={removePost} post={post} key={index}/>
      ))}
    </Box>
  );
}