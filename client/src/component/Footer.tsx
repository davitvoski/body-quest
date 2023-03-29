import { AppBar, Box, Typography, useTheme } from "@mui/material"

const Footer = () => {
    const theme = useTheme();

    return(
        <Box id="footer" width="100%" height="10rem" sx={{ backgroundColor: "secondary.main"}} display="flex" flexDirection={"column"} justifyContent="center" alignItems="center">
                <Typography fontFamily={"Silkscreen"}>Davit Voskerchyan | Raphaël Canciani | Santiago Luna Gonzalez | Sophia Marshment | Wanting Huang</Typography>
        </Box>
    )
}

export default Footer