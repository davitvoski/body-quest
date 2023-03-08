import { IExercise } from "../../../../shared"
import { Exercise } from "./Exercise"
import "../../styles/Exercises.css";
type ExerciseListProps = {
    exercises: IExercise[]
}
/**
 * All exercises data
 * @param props ExerciseListProps
 * @returns ExerciseList
 */
export const ExerciseList = (props:ExerciseListProps) => {
    return(
        <div className="exerciseList content">
            {props.exercises.map((exercise, i)=>(
                <Exercise exercise={exercise} key={i}/>
            ))}
        </div>
    )
}