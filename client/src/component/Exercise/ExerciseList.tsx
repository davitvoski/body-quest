import { IExercise } from "../../../../shared"
import { Exercise } from "./Exercise"

type ExerciseListProps = {
    exercises: IExercise[]
}
export const ExerciseList = (props:ExerciseListProps) => {
    return(
        <div className="exerciseList content">
            {props.exercises.map((exercise, i)=>(
                <Exercise exercise={exercise} key={i}/>
            ))}
        </div>
    )
}