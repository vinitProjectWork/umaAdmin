import React from "react"
import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"

import Select from "react-select"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
]

const filterColors = (inputValue) => {
  return options?.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  )
}

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue))
  }, 1000)
}

const SelectComponent = ({
  placeHolder = "Search...",
  isMulti = false,
  isStatic = false,
  data = options,
  setSelectedCategory,
  setSelectedCompany,
  setSelectedModel,
  selectedCategory
}) => {
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    setSelectedCategory && setSelectedCategory(selectedValue)
    setSelectedCompany && setSelectedCompany(selectedValue)
    setSelectedModel && setSelectedModel(selectedValue || [])
  }, [selectedValue])

  return (
    <Select
      cacheOptions
      // defaultInputValue={selectedCategory && selectedCategory}
      // value={data.filter((option) => option.value === selectedCategory)}
      loadOptions={isStatic ? null : loadOptions}
      options={data}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      onChange={(value) =>
        setSelectedValue(isMulti ? value ?? [] : value.value ?? "")
      }
      placeholder={placeHolder}
    />
  )
}

export default SelectComponent
