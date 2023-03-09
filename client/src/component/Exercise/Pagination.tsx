import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { IExercise } from '../../../../shared';
import { useEffect, useState } from 'react';
import { Exercise } from './Exercise';

type PaginationProps = {
  exercises: IExercise[]
}
export default function PaginationForExercises(props: PaginationProps) {
  // default show 100 exercises per page
  const [perPage, setPerPage] = useState(20);
  // total page 
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setTotalPage(Math.ceil(props.exercises.length / perPage))
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
      <Pagination onChange={(e: React.ChangeEvent<unknown>, page: number) => {
        console.log(page);
        setCurrentPage(page);

      }} count={totalPage} />
      <div className="exerciseList">
        {currentData().map((exercise, i) => (
          <Exercise exercise={exercise} key={i} />
        ))}
      </div>
    </>
  );
}