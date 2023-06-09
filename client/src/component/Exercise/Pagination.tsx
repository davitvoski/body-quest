import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { IExercise } from "../../../../shared";
import { useEffect, useState } from "react";
import { Exercise } from "./Exercise";
import { Grid } from "@mui/material";
import { useMediaQuery } from "react-responsive";

type PaginationProps = {
  exercises: IExercise[];
  isLoading: Boolean;
  isLoggedIn: Boolean;
};

export default function PaginationForExercises(props: PaginationProps) {
  // default show 100 exercises per page
  const [perPage, setPerPage] = useState(20);
  // total page
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    setTotalPage(Math.ceil(props.exercises.length / perPage));
  }, [props.exercises]);

  /**
   * List exercises according the page number
   * @returns IExercise[]
   */
  function currentData(): IExercise[] {
    const begin = (currentPage - 1) * perPage;
    let end = begin + perPage;
    if (isTabletOrMobile) end = 5;
    return props.exercises.slice(begin, end);
  }

  return (
    <>
      <div className="exerciseList">
        {currentData().map((exercise, i) => (
          <Exercise exercise={exercise} key={i} isLoggedIn={props.isLoggedIn} />
        ))}
      </div>
      {!props.isLoading && (
        <Pagination
          id="pagination"
          onChange={(e: React.ChangeEvent<unknown>, page: number) => {
            setCurrentPage(page);
          }}
          count={totalPage}
        />
      )}
    </>
  );
}
