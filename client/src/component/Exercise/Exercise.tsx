import { Card, CardContent, Typography } from "@mui/material"

type ExerciseProps = {
    exercise: any
}
export const Exercise=(props:ExerciseProps)=>{
    return (
        <div className="exerciseArea">
            <Card className="cardExecise" variant="outlined">
                <CardContent>
                    <Typography>{props.exercise.name}</Typography>
                    <Typography>{props.exercise.body_part}</Typography>
                </CardContent>
            </Card>
        </div>

    )
}