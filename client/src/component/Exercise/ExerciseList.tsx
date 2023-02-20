import { Exercise } from "./Exercise"

type ExerciseListProps = {
    exercises: Array<Object>
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