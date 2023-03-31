import { Box, Button, LinearProgress, Typography } from "@mui/material";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFeedPosts, IPost, IPostLikedUser, IUser } from "../../../../shared";
import { Post } from "./Post";
import AddIcon from "@mui/icons-material/Add";
import { enqueueSnackbar } from "notistack";

export const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<IFeedPosts[]>([]);
  const [user, setUser] = useState<IPostLikedUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data = (await res.json()) as IFeedPosts[];
    if (data.length === 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setPosts(data);
  };

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      const user: IPostLikedUser = { username: data.user.username, email: data.user.email };
      setUser(user);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getPosts().catch((err) => {
      enqueueSnackbar("Failed to get the posts", {
        autoHideDuration: 2000,
        variant: "error",
      });
    });

    getUser().catch((err) => {
      enqueueSnackbar("Failed to het your information", {
        autoHideDuration: 2000,
        variant: "error",
      });
    });
  }, []);

  /**
   * if is admin, then user can delete post
   */
  const removePost = (post: IPost) => {
    let allPosts: IFeedPosts[] = posts.filter((currentPost) => currentPost.picture !== post.imageUrl);
    let response = confirm(`${t("confrimDeletePost") as string}`);
    if (response) {
      deletPost(post);
      setPosts(allPosts);
    }
  };

  const deletPost = async (post: IPost) => {
    try {
      await axios.delete("/api/posts", {
        data: {
          post: post,
        },
      });
    } catch (error) {
      enqueueSnackbar("Could not delete", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
  };

  return (
    <div className="content profile">
      {user !== undefined && (
        <Box alignSelf="center" position={"fixed"} bottom={20} right={20} width={"20%"}>
          <Button variant="contained" href="#/Postcreation" fullWidth color="primary">
            <Typography color="background.paper" fontFamily={"Silkscreen"} variant="button" fontSize={30}>
              + Add Post
            </Typography>
          </Button>
        </Box>
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        {isLoading && <LinearProgress sx={{ width: "60%" }} />}
        {posts.length === 0 && isLoading === false && "No posts yet"}
        <div className="feed">
          {posts.length > 0 &&
            posts
              .slice(0)
              .reverse()
              .map((userPost, index) => {
                return userPost.posts.map((post, index) => {
                  return (
                    <Post
                      removePost={removePost}
                      postOwnerUsername={userPost.username}
                      postOwnerEmail={userPost.email}
                      postOwnerPicture={userPost.picture}
                      post={post}
                      key={index + post.imageUrl}
                      user={user!}
                    />
                  );
                });
              })}
        </div>
      </Box>
    </div>
  );
};
