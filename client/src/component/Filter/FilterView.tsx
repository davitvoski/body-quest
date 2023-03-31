import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { FilterDrawer } from "./FilterDrawer";
import { IExercise } from "../../../../shared";
import { useTranslation } from "react-i18next";

type FilterViewProps = {
  allExercises: IExercise[];
  setExercise: Function;
  isMobile?: boolean;
};

/**
 * When click filter button will open drawer
 * @param props FilterViewProps
 * @returns FilterView
 */
export const FilterView = (props: FilterViewProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const width = !props.isMobile ? "100%" : "90%";

  return (
    <div className="filterBtn">
      <Box
        alignSelf="center"
        color="background.default"
        padding={"5%"}
        width={"100%"}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            setIsFormOpen(true);
          }}
          sx={{
            backgroundColor: "background.default",
            boxShadow: "none",
            border: "none",
            width: width,
          }}
        >
          <Typography
            fontFamily={"Silkscreen"}
            variant="button"
            fontSize={20}
            height={"2.5rem"}
          >
            {t("filter")}
          </Typography>
        </Button>
      </Box>

      <FilterDrawer
        allExercises={props.allExercises}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        setExercise={props.setExercise}
      />
    </div>
  );
};
