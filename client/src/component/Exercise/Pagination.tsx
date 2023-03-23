import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { IExercise } from "../../../../shared";
import { useEffect, useState } from "react";
import { Exercise } from "./Exercise";
import { Grid } from "@mui/material";

type PaginationProps = {
  exercises: IExercise[];
};

export default function PaginationForExercises(props: PaginationProps) {
  // default show 100 exercises per page
  const [perPage, setPerPage] = useState(20);
  // total page
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setTotalPage(Math.ceil(props.exercises.length / perPage));
  }, [props.exercises]);

  /**
   * List exercises according the page number
   * @returns IExercise[]
   */
  function currentData(): IExercise[] {
    const begin = (currentPage - 1) * perPage;
    const end = begin + perPage;
    return props.exercises.slice(begin, end);
  }

  return (
    <>
      <div className="exerciseList">
        <Grid container sx={{ flexGrow: 1, justifyContent: "space-around" }}>
          {currentData().map((exercise, i) => (
            <Grid md={2.5} sm={2} margin={1}>
              <Exercise exercise={exercise} key={i} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        onChange={(e: React.ChangeEvent<unknown>, page: number) => {
          setCurrentPage(page);
        }}
        count={totalPage}
      />
    </>
  );
}
