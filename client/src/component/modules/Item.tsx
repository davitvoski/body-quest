import { Paper, styled } from "@mui/material";

/**
 * Styling for grid items
 */
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode == 'dark'? '#37313b' : '#FFFBFF',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left'
}));

export default Item;