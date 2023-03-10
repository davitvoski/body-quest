import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IPost } from "../../../../shared";
import { Post } from "./Post";

export const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data:IPost[] = await res.json() as IPost[];
    console.log(data);
    console.log("data");
    
    setPosts(data);  
    console.log(posts);
    console.log("posts");
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <>
        {posts && 
          posts.map((post, index) => {
            <Post post={post} key={index} />
          })
        }
      </>
    </Box>
  );
}