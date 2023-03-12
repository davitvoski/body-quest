import { Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IExercise } from "../../../../shared";
import Item from "../modules/Item";

const tempFavs = [
  {
    name: "ankle circles",
  },
  {
    name: "band bench press",
  },
  {
    name: "dumbbell deadlift",
  },
  {
    name: "ankle circles",
  },
  {
    name: "band bench press",
  },
  {
    name: "dumbbell deadlift",
  },
];

/**
 * This component displays a users favourite exercises in a pannel
 */
const FavouriteView = () => {
  const [favouriteExercises, setFavouriteExercises] = useState<IExercise[]>();

  // Display Users Favourites
  useEffect(() => {
    async function checkFavourite() {
      const resp = await fetch(`/api/exercises/favourites`);
      // If not logged in, return
      if (resp.status === 401) return;

      const data = (await resp.json()).exercises as IExercise[];
      console.log(data);

      setFavouriteExercises(data);
    }

    checkFavourite().catch((err) => {
      console.log(err);
    });
  }, []);
  
  return (
    <div>
      {/* TODO: Remove this part when integrated with real favourites */}
      {!favouriteExercises &&
        tempFavs.map((goal) => (
          <Item sx={{ m: "1% 0 1% 0", p: 2 }}>
            <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
              {goal.name}
            </Typography>
          </Item>
        ))}

      {/* This part displays a user favourites, I suck at desinging so though to leave it to you Sophia */}
      {favouriteExercises &&
        favouriteExercises.map((fav) => (
          <Item sx={{ m: "1% 0 1% 0", p: 2 }}>
            <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
              {fav.name}
            </Typography>
            <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
              {fav.body_part}
            </Typography>
            <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
              {fav.equipment}
            </Typography>
          </Item>
        ))}
    </div>
  );
};

export default FavouriteView;
