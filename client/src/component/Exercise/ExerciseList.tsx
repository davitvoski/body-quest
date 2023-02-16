import { Exercise } from "./Exercise"

type ExerciseListProps = {
    exercises: Array<Object>
}
export const ExerciseList = (props:ExerciseListProps) => {
    return(
        <div>
            {props.exercises.map((exrecise, i)=>(
                <Exercise />
            ))}
        </div>
    )
}