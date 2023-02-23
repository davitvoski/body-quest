import { Paper, styled } from "@mui/material";

/**
 * Styling for grid items
 */
export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#37313b' : '#EEE8E8',
    ...theme.typography.body1,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#d3ccd9' : '#000000',
}));