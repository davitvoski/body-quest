type FilterProps = {
    option: string
}
export const Filter = (props: FilterProps) => {
    return (
        <span>
            {props.option}
        </span>


    )
}