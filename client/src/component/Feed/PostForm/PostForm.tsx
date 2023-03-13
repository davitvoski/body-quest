import { Paper, Typography, Stack, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, TextField, Button, Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from '@mui/icons-material/Delete';

export const PostForm = () => {
  const [image, setImage] = useState<string>();
  const [caption, setCaption] = useState("");


    const handleSubmit = () => {
        console.log("submit");
    };

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

    return (
    <div className="form-container">
      <Paper elevation={3} sx={{ maxWidth: "50%" }}>
        <div className="header">
          <Typography variant="h4" component="h4">
            Add a Post
          </Typography>
        </div>
        <form className="goal-form">
          <Stack justifyContent="center" alignItems="center" spacing={5}>
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={8}
            >
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <Box 
                  display="flex"
                  justifyContent="space-between"
                >
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
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
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => setImage(undefined)}
                    >
                      Remove Image
                    </Button>    
                  }  
                </Box>          
                {image && <img width="200px" id="newUploadImage" src={image} alt="uploaded image"/>}
              </FormControl>

              <FormControl>
                {
                    <>
                    </>
                }
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