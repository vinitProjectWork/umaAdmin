import DatePickerComponent from "../DatePicker/DatePicker"
import MenuComponent from "../Menu/Menu"
import Select from "../Select/Select"

const Filters = () => {
  return (
    <div className="w-full flex flex-col justify-between px-10">
      <p className="text-lg font-medium mb-3">Filters</p>
      <div className="w-full flex shadow-md rounded-md bg-indigo-400 shadow-blue-300 p-4 flex-col md:flex-row md:justify-between md:gap-5 md:items-center">
        <div className="w-full mb-2 md:w-1/3 md:mb-0">
          <Select />
        </div>
        <div className="w-full mb-2 md:w-1/5 md:mb-0">
          <DatePickerComponent />
        </div>
        <div className="w-full mb-2 md:w-1/3 md:mb-0">
          <MenuComponent isRight={true} title="Sort by" />
        </div>
      </div>
    </div>
  )
}

export default Filters
