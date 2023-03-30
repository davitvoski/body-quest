<<<<<<< HEAD
import {
  Paper,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
  Box,
} from "@mui/material";
=======
import { Paper, Typography, Stack, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField, Button, Box, IconButton } from "@mui/material";
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { IPost, IUserPost } from "../../../../../shared";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseIcon from '@mui/icons-material/Close';
import "../../../styles/Post.css";

export const PostForm = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string>();
  const [caption, setCaption] = useState("");
  let navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let uploadedImage = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(uploadedImage);

    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      setImage(evt.target.result.toString());
    };
  };

  const createPost = async (newPost: IPost) => {
    try {
      await axios.post("/api/posts/createPost", newPost);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentDate = () => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    var today = new Date();
    const formattedDate = today.toLocaleDateString(
      "en-US",
      options as Intl.DateTimeFormatOptions
    );
    return formattedDate;
  };

  const getUser = async () => {
    const res = await fetch("/api/authentication/getUser");
    const data = await res.json();
    if (data.user !== undefined) {
      const userName = data.user.username;
      const email = data.user.email;
      const picture = data.user.picture;
<<<<<<< HEAD
      return {
        username: userName,
        email: email,
        picture: picture,
      } as IUserPost;
=======
      return { username: userName, email: email, picture: picture } as IUserPost;
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
    }
    return;
  };

  const handleSubmit = async () => {
    const currentDate = getCurrentDate();
    const user: IUserPost | undefined = await getUser();
    if (user && image) {
      const newPost: IPost = {
        user: user,
        imageUrl: image,
        caption: caption,
        date: currentDate,
        likedUsers: []
      }
      await createPost(newPost);
      navigate("/Feed");
    }
  };

  /**
   * close the post form 
   */
  const closePostForm = () => {
    navigate("/Feed");
  }
  return (
    <div className="form-container">
      <Paper elevation={3} sx={{ width: "50%", maxWidth: "50%", maxHeight: "90%" }}>
        <div className="header">
          <Typography variant="h4" component="h4">
            {t('add_post')}
          </Typography>
        </div>
        <form className="goal-form">
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={5}
            width="100%"
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={8}
              width="100%"
            >
<<<<<<< HEAD
              <FormControl sx={{ m: 1 }} fullWidth>
=======
              <FormControl
                sx={{ m: 1 }}
                fullWidth
              >
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ alignSelf: "center", marginBottom: "25px" }}
                >
<<<<<<< HEAD
                  {image ? <>Change Image</> : <>Upload Post Image</>}
=======
                  {image
                    ? <>{t('change_image')}</>
                    : <>{t('upload_image')}</>
                  }
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                    hidden
                    onChange={(e) => handleImageChange(e)}
                  />
                </Button>
<<<<<<< HEAD
                {image && (
                  <Box>
                    <img
                      width="400px"
                      id="newUploadImage"
                      src={image}
                      alt="uploaded image"
                    />
                  </Box>
                )}
                {/*image &&
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    sx={{alignSelf:"center"}}
                    onClick={() => setImage("")}
                  >
                    Remove Image
                  </Button>  */}
=======
                {image &&
                  <Box>
                    <img 
                      width="30%" 
                      height="30%"
                      id="newUploadImage" 
                      src={image} 
                      alt="uploaded image" 
                    />
                  </Box>
                }
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
                <TextField
                  sx={{ marginTop: "20px", width: "80%", alignSelf: "center" }}
                  id="outlined-multiline-static"
                  label={t('caption')}
                  multiline
                  rows={4}
                  value={caption}
<<<<<<< HEAD
                  onChange={(event) => {
                    setCaption(event.target.value);
                  }}
=======
                  onChange={(event) => { setCaption(event.target.value) }}
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
                />
              </FormControl>
            </Stack>
          </Stack>
<<<<<<< HEAD
          <Button
            variant="contained"
            sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
            onClick={handleSubmit}
            disabled={image === undefined}
          >
            Create
          </Button>
=======
          <Box>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
              onClick={handleSubmit}
              disabled={image === undefined}
            >
              {t('create')}
            </Button>
            <IconButton
              sx={{ color: "white" }}
              title={t("close") as string}
              onClick={closePostForm}
            >
              <CloseIcon />
            </IconButton>
          </Box>
>>>>>>> 1ef4d621ba813b3257fb9e59dbc760a406106a4e
        </form>
      </Paper>
    </div>
  );
};
