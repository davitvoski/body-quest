import { Checkbox, Typography } from "@mui/material";
import Item from "../modules/Item";

const tempFavs = [
    {
        "name": "ankle circles"
    }, 
    {
        "name": "band bench press"
    }, 
    {
        "name": "dumbbell deadlift"
    },
    {
        "name": "ankle circles"
    }, 
    {
        "name": "band bench press"
    }, 
    {
        "name": "dumbbell deadlift"
    }
]

const FavouriteView = () => {
    return(
        <div>
            { tempFavs.map(goal => 
                <Item sx={{ m: "1% 0 1% 0", p:2}}>
                    <Typography sx={{ p: "1% 0 1% 0" }} display="inline-block">{ goal.name }</Typography>
                </Item>
            )}
        </div>
    )
}

export default FavouriteView
