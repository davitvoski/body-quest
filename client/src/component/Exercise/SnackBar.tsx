import { SnackbarOrigin } from "@mui/material";
import React from "react";

interface State extends SnackbarOrigin {
  openSnack: boolean;
}

export const SnackBar = (props: any) => {
  const [snackState, setSnackState] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, openSnack } = snackState;
};
