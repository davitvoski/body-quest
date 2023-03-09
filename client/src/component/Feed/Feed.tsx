import { Box } from "@mui/material";
import { IPost } from "../../../../shared";
import { Post } from "./Post";

const testPost:IPost = {
  user: {
    username: "RaphyBoy", 
    email: "raph.gmail.com", 
    picture: "https://pocblobstoragewebdev.blob.core.windows.net/webdevcontainer/ahhhh.png"
  },
  imageUrl: "https://pocblobstoragewebdev.blob.core.windows.net/webdevcontainer/DAS.png",
  caption: "This is a test caption, thanks for being here",
  date: "March 9, 2023"
}

export const Feed = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Post post={testPost} />
      <Post post={testPost} />

    </Box>
  );
}