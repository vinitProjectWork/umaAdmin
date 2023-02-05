import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import classes from "./DatePicker.module.css"

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const onChange = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      placeholderText="Select date range"
      dateFormat="dd/MM/yyyy"
      className={classes["date-picker"]}
      dropdownMode="select"
      todayButton="Today"
      scrollableMonthYearDropdown
      scrollableYearDropdown
      showMonthDropdown
      showYearDropdown
    />
  )
}

export default DatePickerComponent
