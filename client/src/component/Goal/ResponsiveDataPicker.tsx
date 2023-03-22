import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";

type DatePickerProps = {
  label: string;
  isToday: boolean;
  onChange: (newValue: Dayjs | null) => void;
  endAfterStart?: boolean;
};

/**
 * @author Santiago Luna
 * @param props
 *
 * This component is used to create a responsive date picker
 *
 */
export default function ResponsiveDatePicker(props: DatePickerProps) {
  const {t} = useTranslation();
  const [value, setValue] = React.useState<Dayjs | null>(
    props.isToday ? dayjs() : null
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {props.endAfterStart ? (
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
      ) : (
        <DatePicker
          label={props.label}
          openTo="day"
          views={["year", "month", "day"]}
          value={value}
          onChange={(newValue) => {
            props.onChange(newValue);
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={t('date_requirement')}
              sx={{ color: "red" }}
            />
          )}
        />
      )}
    </LocalizationProvider>
  );
}
