import { Paper, Typography, Stack, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField, Button, Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { IPost } from "../../../../../shared";

export const PostForm = () => {
  const [image, setImage] = useState<string>();
  const [caption, setCaption] = useState("");

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
      console.log(evt.target);
      setImage(evt.target.result.toString())
    }
  };

  const createGoal = async (newPost: IPost) => {
    try {
      await axios.post("/api/posts", newPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    console.log("submit");
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
              <FormControl 
                sx={{ m: 1 }}
                fullWidth
              >
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFileIcon />}
                  sx={{alignSelf:"center"}}
                >
                  {image 
                    ? <>Change Image</>
                    : <>Upload Post Image</> 
                  }
                  <input 
                    type="file" 
                    accept="image/gif, image/jpeg, image/jpg, image/png" 
                    hidden 
                    onChange={(e) => handleImageChange(e)} 
                  />
                </Button>
                {image && 
                  <Box>
                    <img 
                      width="400px" 
                      id="newUploadImage" 
                      src={image} 
                      alt="uploaded image" 
                    />
                  </Box>
                }
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
                  </Button>  */  
                }  
                <TextField
                  sx={{marginTop: "20px", width: "80%", alignSelf:"center"}}
                  id="outlined-multiline-static"
                  label="Caption"
                  multiline
                  rows={4}
                />
              </FormControl>
            </Stack>
          </Stack>
            <Button
              variant="contained"
              sx={{ margin: "10px", backgroundColor: "black", color: "white" }}
              onClick={handleSubmit}
            >
              Create
            </Button>
        </form>
      </Paper>
    </div>
  )
}