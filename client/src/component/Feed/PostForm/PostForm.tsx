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
  IconButton,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { IPost } from "../../../../../shared";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import "../../../styles/Post.css";
import { enqueueSnackbar } from "notistack";

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
      await axios.post("/api/posts/", newPost);
    } catch (error) {
      enqueueSnackbar("Could not create post", {
        autoHideDuration: 2000,
        variant: "error",
      });
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
    const formattedDate = today.toLocaleDateString("en-US", options as Intl.DateTimeFormatOptions);
    return formattedDate;
  };

  const handleSubmit = async () => {
    const currentDate = getCurrentDate();
    if (image) {
      const newPost: IPost = {
        imageUrl: image,
        caption: caption,
        date: currentDate,
        likedUsers: [],
      };
      await createPost(newPost);
      navigate("/Feed");
    }
  };

  /**
   * close the post form
   */
  const closePostForm = () => {
    navigate("/Feed");
  };
  return (
    <div className="form-container">
      <Paper elevation={3} sx={{ width: "50%", maxWidth: "50%", maxHeight: "90%" }}>
        <div className="header">
          <Typography variant="h4" component="h4">
            {t("add_post")}
          </Typography>
        </div>
        <form className="goal-form">
          <Stack justifyContent="center" alignItems="center" spacing={5} width="100%">
            <Stack justifyContent="center" alignItems="center" spacing={8} width="100%">
              <FormControl sx={{ m: 1 }} fullWidth>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ alignSelf: "center", marginBottom: "25px" }}
                >
                  {image ? <>{t("change_image")}</> : <>{t("upload_image")}</>}
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                    hidden
                    onChange={(e) => handleImageChange(e)}
                  />
                </Button>
                {image && (
                  <Box>
                    <img width="30%" height="30%" id="newUploadImage" src={image} alt="uploaded image" />
                  </Box>
                )}
                <TextField
                  sx={{ marginTop: "20px", width: "80%", alignSelf: "center" }}
                  id="outlined-multiline-static"
                  label={t("caption")}
                  multiline
                  rows={4}
                  value={caption}
                  onChange={(event) => {
                    setCaption(event.target.value);
                  }}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Box>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
              onClick={handleSubmit}
              disabled={image === undefined}
            >
              {t("create")}
            </Button>
            <IconButton sx={{ color: "white" }} title={t("close") as string} onClick={closePostForm}>
              <CloseIcon />
            </IconButton>
            <Button sx={{ color: "white" }} title={t("close") as string} onClick={closePostForm}>
              {t("cancel")}
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
};
