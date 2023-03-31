import { Typography } from "@mui/material"

const NotFound = () => {
    return(
        <div className="content">
            <Typography fontFamily={"Silkscreen"} variant={"h1"} paddingLeft={0} color="primary">Error 404</Typography>
            <Typography fontFamily={"Silkscreen"} variant={"h2"} color="primary.contrastText">Page not found</Typography>
        </div>
    )
}

export default NotFound