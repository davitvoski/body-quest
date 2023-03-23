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
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { IPost, IUserPost } from "../../../../../shared";
import { useNavigate } from "react-router";

export const PostForm = () => {
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
      return {
        username: userName,
        email: email,
        picture: picture,
      } as IUserPost;
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
      };
      await createPost(newPost);
      navigate("/Feed");
    }
  };

  return (
    <div className="form-container">
      <Paper elevation={3} sx={{ width: "50%", maxWidth: "50%" }}>
        <div className="header">
          <Typography variant="h4" component="h4">
            Add a Post
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
              <FormControl sx={{ m: 1 }} fullWidth>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{ alignSelf: "center", marginBottom: "25px" }}
                >
                  {image ? <>Change Image</> : <>Upload Post Image</>}
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                    hidden
                    onChange={(e) => handleImageChange(e)}
                  />
                </Button>
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
                <TextField
                  sx={{ marginTop: "20px", width: "80%", alignSelf: "center" }}
                  id="outlined-multiline-static"
                  label="Caption"
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
          <Button
            variant="contained"
            sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
            onClick={handleSubmit}
            disabled={image === undefined}
          >
            Create
          </Button>
        </form>
      </Paper>
    </div>
  );
};
