import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"

type FilterProps = {
    option: string,
    keyExerercise: string
    listDataByOption: Function
}
export const Filter = (props: FilterProps) => {
    return (
        <span onClick={() => {
            props.listDataByOption(props.keyExerercise, props.option);
        }}>
            {props.option}
            {/* <FormControlLabel value={props.option} control={<Radio />} label={props.option} /> */}
            
        </span>
    )
}