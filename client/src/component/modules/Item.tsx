import { Paper, styled } from "@mui/material";

/**
 * Styling for grid items
 */
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left'
}));

export default Item;