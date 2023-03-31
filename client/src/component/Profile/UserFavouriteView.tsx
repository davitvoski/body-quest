import { Button, Checkbox, Typography } from "@mui/material";
import { IExercise } from "../../../../shared";
import { useEffect, useState } from "react";
import { Popup } from "../Exercise/Popup";
import Item from "../modules/Item";

/**
 * This component displays a users favourite exercises in a pannel
 */
interface favProps {
  favourites: IExercise[];
  email: string;
}

const UserFavouriteView = (props: favProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFav, setCurrentFav] = useState<IExercise>();
  const [favouriteExercises, setFavouriteExercises] = useState<IExercise[]>([]);

  // Display Users Favourites
  useEffect(() => {
    /**
     * This function gets a users favourite exercises
     */
    async function getFavourties() {
      const res = await fetch("/api/exercises/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: props.email }),
      });
      // If not logged in, return
      if (res.status === 401) return;
      const data = (await res.json()).exercises as IExercise[];
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
      {favouriteExercises.length > 0 ? (
        favouriteExercises.map((fav) => (
          <div className="clickableDiv">
            <Item
              sx={{ m: "1% 0 1% 0", p: 2 }}
              onClick={() => handlePopup(fav)}
            >
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav.name} {fav.body_part} {fav.target}
              </Typography>
            </Item>
          </div>
        ))
      ) : (
        <Item
          sx={{ m: "1% 0 1% 0", p: 2, textAlign: "center", opacity: "60%" }}
        >
          No favourites.
        </Item>
      )}

      {currentFav != undefined && (
        <Popup
          handleClose={closePopup}
          exercise={currentFav!}
          open={isOpen}
          isLoggedIn={false}
        />
      )}
    </div>
  );
};

export default UserFavouriteView;
