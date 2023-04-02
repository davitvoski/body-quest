import { Typography } from "@mui/material";

const Unauthorized = () => {
  return (
    <div className="content">
      <Typography fontFamily={"Silkscreen"} variant={"h1"} paddingLeft={0} color="primary">
        Error 401
      </Typography>
      <Typography fontFamily={"Silkscreen"} variant={"h2"} color="primary.contrastText">
        Unauthroized - Try logging in?
      </Typography>
    </div>
  );
};

export default Unauthorized;
