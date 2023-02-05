import { useState } from "react"
import { useEffect } from "react"
import { useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import SelectComponent from "../../../../components/Select/Select"
import { allModels } from "../../../../redux/slices/models/models"
import { GetAllModelsList } from "../../../../services"

const ModelsForm = ({ setData, data }) => {
  const { allModelList } = useSelector(({ models }) => models)

  const dispatch = useDispatch()

  const [selectedModel, setSelectedModel] = useState([])
  // const [allSelectedModel, setallSelectedModel] = useState(
  //   JSON.parse(data?.modelDetails)
  // )

  const [totalRows, setTotalRows] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useLayoutEffect(() => {
    getData(perPage, totalRows)
  }, [])

  useEffect(() => {
    setData((state) => {
      return {
        ...state,
        model: selectedModel
      }
    })
  }, [selectedModel])
  console.log(selectedModel)

  const getData = (perPage, totalRows = 10) => {
    GetAllModelsList({ perPage, totalRows })
      .then((resp) => {
        if (resp.data.length > 0) {
          const _data = resp.data.map((item) => {
            return {
              label: item.attributes.name,
              value: item.id
            }
          })
          dispatch(allModels([..._data]))
        }
      })
      .catch((err) => toast.error("Something went wrong!!"))
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <label>Select Model</label>
      <SelectComponent
        isMulti={true}
        data={allModelList}
        setSelectedModel={setSelectedModel}
      />
      <div className="flex flex-col gap-2">
        <label className="font-medium border-b-2 border-t-2 py-1">
          Selected Models
        </label>
        {selectedModel.map((item) => item.label).join(", ")}
        {/* {selectedModel.length > 0 ? (
          selectedModel?.map((model) => {
            return (
              <>
                <div className="flex gap-2">
                  <p>{model.label}</p>
                  <input
                    type="text"
                    placeholder="Enter moq"
                    value={data.moq}
                    className="px-2 border-2 w-1/12 rounded-md"
                  />
                  <input
                    type="text"
                    value={data.price}
                    placeholder="Enter price"
                    className="px-2 border-2 w-1/12 rounded-md"
                  />
                </div>
              </>
            )
          })
        ) : (
          <p>No models selcted</p>
        )} */}
        {/* <label className="font-medium border-b-2 border-t-2 py-1">
          Already added
        </label>
        {allSelectedModel?.map((model, index) => {
          return (
            <>
              <div className="flex gap-2">
                <p>{model.name}</p>
                <input
                  type="text"
                  placeholder="Enter moq"
                  value={model.moq}
                  onChange={(e) =>
                    handleUpdatedData(e.target.value, "moq", index)
                  }
                  className="px-2 border-2 w-1/12 rounded-md"
                />
                <input
                  type="text"
                  value={model.price}
                  onChange={(e) =>
                    handleUpdatedData(e.target.value, "price", index)
                  }
                  placeholder="Enter price"
                  className="px-2 border-2 w-1/12 rounded-md"
                />
              </div>
            </>
          )
        })} */}
      </div>
    </div>
  )
}

export default ModelsForm
