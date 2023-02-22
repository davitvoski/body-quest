import { Exercise } from "./Exercise"
import { IExercise } from "./IExercises"

type ExerciseListProps = {
    exercises: IExercise[]
}
export const ExerciseList = (props:ExerciseListProps) => {
    return(
        <div className="exerciseList">
            {props.exercises.map((exercise, i)=>(
                <Exercise exercise={exercise} key={i}/>
            ))}
        </div>
    )
}