import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IPost } from "../../../../shared";
import { Post } from "./Post";
import AddIcon from '@mui/icons-material/Add';

export const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data:IPost[] = await res.json() as IPost[];
    setPosts(data);  
  }

  useEffect(() => {
    getPosts();
  }, []);  

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
      >
        {posts.length === 0 && <LinearProgress sx={{width:"100%"}}/>}
        {posts && posts.map((post, index)=>(
          <Post post={post} key={index}/>
        ))}
      </Box>
      <Button variant="contained" startIcon={<AddIcon />}>Add Post</Button>
    </>
  );
}