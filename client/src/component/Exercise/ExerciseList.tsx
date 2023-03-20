import { IExercise } from "../../../../shared"
import { Exercise } from "./Exercise"
import "../../styles/Exercises.css";
import PaginationForExercises from "./Pagination";
type ExerciseListProps = {
    exercises: IExercise[]
}
/**
 * All exercises data
 * @param props ExerciseListProps
 * @returns ExerciseList
 */
export const ExerciseList = (props: ExerciseListProps) => {
    return (
        <div className="content">
            <PaginationForExercises exercises={props.exercises} />
        </div>
    )
}