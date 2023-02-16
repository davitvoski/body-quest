import { Card, CardContent, Typography } from "@mui/material"

type ExerciseProps = {
    bodyPart: String,
    equipment: String,
    gifUrl:String,
    name:String,
    target:String
}
export const Exercise=(props:ExerciseProps)=>{
    return (
        <div className="exerciseArea">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant='caption'>{props.name}</Typography>
                    <Typography> </Typography>
                </CardContent>
            </Card>
        </div>

    )
}