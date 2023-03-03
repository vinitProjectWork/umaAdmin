import { useEffect } from "react"
import { useState } from "react"

const EditModel = ({ data, setEditedData }) => {
  const { label } = data
  const [updatedName, setUpdatedName] = useState("")

  useEffect(() => {
    setUpdatedName(label)
  }, [label])

  const updateName = (value) => {
    setEditedData(value)
    setUpdatedName(value)
  }

  return (
    <>
      <div className="border-2 w-full rounded-md">
        <input
          type="text"
          value={updatedName}
          className="outline-none w-full p-2"
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
    </>
  )
}

export default EditModel
