import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Paper, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { IPost } from "../../../../shared";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

type PostProps = { 
  post: IPost
}

export const Post = (props: PostProps) => {
  return (
    <Card 
      sx={{width: "500px", marginBottom:"20px" }}
      elevation={12} 
    >
      <CardHeader 
        sx={{textAlign:"left"}}
        avatar={
          <Avatar 
            src={props.post.user.picture}
            alt={`${props.post.user.username}'s post`}
          />
        }
        title={props.post.user.username}
        subheader={props.post.date}
      />

      <CardMedia 
        component="img"
        image={props.post.imageUrl}
        alt={`${props.post.user.username}'s image`} 
        width="100%"   
        height="500vh"    
      />

      <CardActions disableSpacing>
        <IconButton aria-label="add to liked">
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography align="left">
          {props.post.caption}
        </Typography>
      </CardContent>

    </Card>
  );
}

/*
          <Box
            display="flex"
            flexDirection="row"
          >
            <Avatar 
              src={props.post.imageUrl}
              alt={`${props.post.user.username}'s post`}
            />
            <Typography>
              {props.post.user.username}
            </Typography>
          </Box>
          
          <Typography>
            {props.post.caption}
          </Typography>
*/