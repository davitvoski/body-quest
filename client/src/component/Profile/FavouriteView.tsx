import { Button, Checkbox, Typography } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useEffect, useState } from "react";
import { Popup } from "../Exercise/Popup";
import Item from "../modules/Item";

/**
 * This component displays a users favourite exercises in a pannel
 */
const FavouriteView = () => {
  const [favouriteExercises, setFavouriteExercises] = useState<IExercise[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const [currentFav, setCurrentFav] = useState<IExercise>()

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
  
  const handlePopup = (fav: IExercise) => {
    setCurrentFav(fav);
    setIsOpen(!isOpen);
  };

  const closePopup = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Real Data */}
      
      {favouriteExercises.length > 0 ? 
        favouriteExercises.map(fav => 
          <div className="clickableDiv">
            <Item sx={{ m: "1% 0 1% 0", p:2}} onClick={() => handlePopup(fav)} tabIndex={0}>
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav.name} {fav.body_part} {fav.target}
              </Typography>
            </Item>
          </div>
        ) :
        <Item sx={{ p:2, textAlign: "center", opacity:"60%"}}>No favourites.</Item>
      }
      
      {currentFav != undefined &&
        <Popup
        handleClose={closePopup}
        exercise={currentFav!}
        open={isOpen}
        />
      }
      
    </div>

  );
};

export default FavouriteView;
