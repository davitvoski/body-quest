import { Box, Button, LinearProgress, Typography } from "@mui/material";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPost, IPostLikedUser, IUser } from "../../../../shared";
import { Post } from "./Post";
import AddIcon from "@mui/icons-material/Add";
import { useMediaQuery } from "react-responsive";

export const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IPostLikedUser>();
  console.log(user);

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data: IPost[] = (await res.json()) as IPost[];
    setPosts(data);
  };

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      const user: IPostLikedUser = {
        username: data.user.username,
        email: data.user.email,
      };
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
    let allPosts: IPost[] = posts.filter(
      (currentPost) => currentPost.imageUrl !== post.imageUrl
    );
    let response = confirm(`${t("confrimDeletePost") as string}`);
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
          post: post,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className="content profile">
      {user !== undefined && (
        <>
          {isDesktopOrLaptop && (
            <Box
              alignSelf="center"
              position={"fixed"}
              bottom={20}
              right={20}
              width={"20%"}
            >
              <Button
                variant="contained"
                href="#/Postcreation"
                fullWidth
                color="primary"
              >
                <Typography
                  color="background.paper"
                  fontFamily={"Silkscreen"}
                  variant="button"
                  fontSize={30}
                >
                  + Add Post
                </Typography>
              </Button>
            </Box>
          )}
          {isTabletOrMobile && (
            <Box
              alignSelf="center"
              position={"fixed"}
              bottom={20}
              right={20}
              width={"20%"}
            >
              <Button
                variant="contained"
                href="#/Postcreation"
                fullWidth
                color="primary"
              >
                <Typography
                  color="background.paper"
                  fontFamily={"Silkscreen"}
                  variant="button"
                  fontSize={20}
                >
                  + Add Post
                </Typography>
              </Button>
            </Box>
          )}
        </>
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        {posts.length === 0 && <LinearProgress sx={{ width: "60%" }} />}
        <div className="feed">
          {posts &&
            posts
              .slice(0)
              .reverse()
              .map((post, index) => (
                <Post
                  removePost={removePost}
                  post={post}
                  key={index + post.imageUrl}
                  user={user}
                />
              ))}
        </div>
      </Box>
    </div>
  );
};
