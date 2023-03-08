import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type DatePickerProps = {
  label: string;
  isToday: boolean;
  onChange: (newValue: Dayjs | null) => void;
};

/**
 * @author Santiago Luna
 * @param props
 * 
 * This component is used to create a responsive date picker 
 * 
 */
export default function ResponsiveDatePicker(props: DatePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(
    props.isToday ? dayjs() : null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={props.label}
        openTo="day"
        views={["year", "month", "day"]}
        value={value}
        onChange={(newValue) => {
          props.onChange(newValue);
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
