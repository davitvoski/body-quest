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
}

const UserFavouriteView = (props: favProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFav, setCurrentFav] = useState<IExercise>();

  const handlePopup = (fav: IExercise) => {
    setCurrentFav(fav);
    setIsOpen(!isOpen);
  };

  const closePopup = () => setIsOpen(!isOpen);

  return (
    <div>
      {props.favourites.length > 0 ? (
        props.favourites.map((fav) => (
          <div className="clickableDiv">
            <Item
              sx={{ m: "1% 0 1% 0", p: 2 }}
              onClick={() => handlePopup(fav)}
            >
              <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">
                {fav}
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
        <Popup handleClose={closePopup} exercise={currentFav!} open={isOpen} />
      )}
    </div>
  );
};

export default UserFavouriteView;
