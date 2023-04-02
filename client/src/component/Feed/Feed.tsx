import { Box, Button, LinearProgress, Typography } from "@mui/material";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IAllPostsUser, IFeedPosts, IPost, IPostLikedUser, IUser } from "../../../../shared";
import { Post } from "./Post";
import AddIcon from "@mui/icons-material/Add";
import { enqueueSnackbar } from "notistack";
import { useMediaQuery } from "react-responsive";
import dayjs from "dayjs";

export const Feed = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<IAllPostsUser[]>([]);
  const [user, setUser] = useState<IPostLikedUser>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  function sortPosts(posts: IFeedPosts[]) {
    const allFields = posts.reduce((fields, feedPost) => {
      const { username, email, picture } = feedPost;
      const postFields = feedPost.posts.map((post) => {
        const { imageUrl, caption, date, likedUsers } = post;
        return { username, email, picture, imageUrl, caption, date, likedUsers };
      }) as IAllPostsUser[];

      return fields.concat(postFields as any);
    }, []) as IAllPostsUser[];

    const allFieldsSorted = allFields.sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? 1 : -1;
    });

    return allFieldsSorted;
  }

  const getPosts = async () => {
    const res = await fetch("/api/posts/");
    const data = (await res.json()) as IFeedPosts[];
    if (data.length === 0) {
      setIsLoading(false);
      return;
    }
    setIsLoading(false);

    const allFieldsSorted = sortPosts(data);
    setPosts(allFieldsSorted);
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
      enqueueSnackbar("Failed to get your information", {
        autoHideDuration: 2000,
        variant: "error",
      });
    });
  }, []);

  /**
   * if is admin, then user can delete post
   */
  async function removePost(currentPost: IPost, postOwnerEmail: string) {
    console.log("removePost", currentPost, postOwnerEmail);
    const postToDelete = {
      imageUrl: currentPost.imageUrl,
      caption: currentPost.caption,
      date: currentPost.date,
      likedUsers: currentPost.likedUsers,
    } as IPost;
    console.log(postToDelete);
    let response = confirm(`${t("confrimDeletePost") as string}`);
    if (response) {
      await deletePost(postToDelete, postOwnerEmail);
    }
  }

  /**
   * delete post, send request to server
   * @param post IPost
   */
  async function deletePost(post: IPost, postOwnerEmail: string) {
    try {
      await axios.delete("/api/posts", {
        data: {
          post: post,
          postOwnerEmail: postOwnerEmail,
        },
      });

      const data = (await (await fetch("/api/posts/")).json()) as IFeedPosts[];
      setPosts(sortPosts(data));
    } catch (error) {
      enqueueSnackbar("Could not delete post", {
        autoHideDuration: 2000,
        variant: "error",
      });
    }
  }

  return (
    <div className="content profile">
      {user !== undefined && (
        <>
          {isDesktopOrLaptop && (
            <Box alignSelf="center" position={"fixed"} bottom={20} right={20} width={"20%"}>
              <Button variant="contained" href="#/Postcreation" fullWidth color="primary">
                <Typography color="background.paper" fontFamily={"Silkscreen"} variant="button" fontSize={30}>
                  + {t("add_post")}
                </Typography>
              </Button>
            </Box>
          )}

          {isTabletOrMobile && (
            <Box alignSelf="center" position={"fixed"} bottom={20} right={20} width={"20%"}>
              <Button variant="contained" href="#/Postcreation" fullWidth color="primary">
                <Typography color="background.paper" fontFamily={"Silkscreen"} variant="button" fontSize={20}>
                  + {t("add_post")}
                </Typography>
              </Button>
            </Box>
          )}
        </>
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        {isLoading && <LinearProgress sx={{ width: "60%" }} />}
        {posts.length === 0 && isLoading === false && "No posts yet"}
        <div className="feed">
          {posts.length > 0 &&
            posts.reverse().map((post, index) => {
              return (
                <Post
                  removePost={removePost}
                  postOwnerUsername={post.username}
                  postOwnerEmail={post.email}
                  postOwnerPicture={post.picture}
                  post={post}
                  key={index + post.imageUrl}
                  user={user!}
                />
              );
            })}
        </div>
      </Box>
    </div>
  );
};
