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
        </span>
    )
}