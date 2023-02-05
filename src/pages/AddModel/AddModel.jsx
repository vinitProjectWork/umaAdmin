import { useEffect, useLayoutEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import SelectComponent from "../../components/Select/Select"
import { allBrands } from "../../redux/slices/brands/brands"
import { GetAllBrandList, PostModel } from "../../services"

const MAX_COUNT = 5

const AddModel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState("")

  const { allBrandList } = useSelector(({ brands }) => brands)

  useEffect(() => {
    GetAllBrandList()
      .then((resp) => {
        if (resp.data.length > 0) {
          const _data = resp.data.map((item) => {
            return {
              label: item.attributes.name,
              value: item.id
            }
          })
          dispatch(allBrands([..._data]))
        }
      })
      .catch((err) => toast.error("Something went wrong!"))
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleUploadFiles = (files) => {
    console.log("files", files)
    const uploaded = [...uploadedFiles]
    let limitExceeded = false
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file)
        if (uploaded.length === MAX_COUNT) setFileLimit(true)
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`)
          setFileLimit(false)
          limitExceeded = true
          return true
        }
      }
    })
    console.log(uploaded)
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const handleFileEvent = (e) => {
    console.log("event", e)
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    console.log("here", chosenFiles)
    handleUploadFiles(chosenFiles)
  }

  const createModel = (data) => {
    const _data = {
      brand: selectedCompany,
      name: data.model_name
    }
    PostModel({ ..._data })
      .then((resp) => {
        toast.success("Model created successfully!")
        navigate("/model-list")
      })
      .catch((err) => toast.error("Something went wrong!"))
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Model
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createModel)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="company-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Company Name
            </label>
            <SelectComponent
              data={allBrandList}
              setSelectedCompany={setSelectedCompany}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="model-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Model Name
            </label>
            <input
              name="model-name"
              placeholder="Enter model name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("model_name", { required: true })}
            />
            {errors.model_name && (
              <p className="text-red-500 font-normal text-sm">
                Model name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createModel)}
              className={`inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddModel
