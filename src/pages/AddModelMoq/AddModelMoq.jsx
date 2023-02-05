import { useState } from "react"
import { useForm } from "react-hook-form"

const MAX_COUNT = 5

const AddModelMoq = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleUploadFiles = (files) => {
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
    if (!limitExceeded) setUploadedFiles(uploaded)
  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles)
  }

  const createModelMoq = (data) => {
    console.log(data)
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Model MOQ
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createModelMoq)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="model-moq-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Model MOQ Name
            </label>
            <input
              name="model-moq-name"
              placeholder="Enter model name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("model_moq_name", { required: true })}
            />
            {errors.model_name && (
              <p className="text-red-500 font-normal text-sm">
                Model Moq name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="min-qty"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Minimum Quantity
            </label>
            <input
              name="min-qty"
              placeholder="Enter model name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("min-qty", { required: true })}
            />
            {errors.model_name && (
              <p className="text-red-500 font-normal text-sm">
                Minimum quantity is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createModelMoq)}
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

export default AddModelMoq
