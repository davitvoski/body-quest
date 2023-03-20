import { Button, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IExercise } from "../../../../shared";
import Item from "../modules/Item";

/**
 * This component displays a users favourite exercises in a pannel
 */
const FavouriteView = () => {
  const [favouriteExercises, setFavouriteExercises] = useState<IExercise[]>([]);

  // Display Users Favourites
  useEffect(() => {
    /**
     * This function gets a users favourite exercises
     */
    async function getFavourties() {
      const resp = await fetch(`/api/exercises/favourites`);
      // If not logged in, return
      if (resp.status === 401) return;
      const data = (await resp.json()).exercises as IExercise[];

      setFavouriteExercises(data);
    }

    // NOTE: IF THE FAVOURITES ARE NOT DISPLAYING
    // IT MOST POSSIBLY MEANS THAT THE USER DOEST NOT HAVE ANY FAVOURITES
    getFavourties().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      {/* Real Data */}
      
      {favouriteExercises.length > 0 ? 
          favouriteExercises.map(fav => 
              <Item sx={{ m: "1% 0 1% 0", p:2}}>
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav.name}
              </Typography>
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav.body_part}
              </Typography>
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav.equipment}
              </Typography>
                  <Button>Create a Goal</Button>
              </Item>
          ) :
          <Item sx={{ m: "1% 0 1% 0", p:2, textAlign: "center", opacity:"60%"}}>No favourites.</Item>
      }
    </div>

  );
};

export default FavouriteView;
