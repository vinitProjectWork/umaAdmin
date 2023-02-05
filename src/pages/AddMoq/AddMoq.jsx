import { useState } from "react"
import { useForm } from "react-hook-form"

const MAX_COUNT = 5

const AddMoq = () => {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)

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

  console.log(uploadedFiles)

  const handleFileEvent = (e) => {
    console.log("event", e)
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    console.log("here", chosenFiles)
    handleUploadFiles(chosenFiles)
  }

  const createMoq = (data) => {
    console.log(data)
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Moq
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createMoq)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="moq-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              MOQ Name
            </label>
            <input
              name="moq-name"
              placeholder="Enter Moq name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("moq-name", { required: true })}
            />
            {errors.moq_name && (
              <p className="text-red-500 font-normal text-sm">
                Moq name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="status"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Status
            </label>
            <select
              name="status"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("status", { required: true })}
            >
              <option value="0">In Stock</option>
              <option value="1">Out of Stock</option>
            </select>
            {errors.status && (
              <p className="text-red-500 font-normal text-sm">
                Please select status
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="images"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Images
            </label>
            <input
              name="images"
              type="file"
              multiple
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              accept="image/png"
              onChange={handleFileEvent}
              disabled={fileLimit}
              {...register("images", { required: true })}
            />
            {errors.category_name && (
              <p className="text-red-500 font-normal text-sm">
                Image name is required
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
              placeholder="Enter minimum quantity"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("min-qty", { required: true })}
            />
            {errors.moq_name && (
              <p className="text-red-500 font-normal text-sm">
                Minimum quantity is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="total-qty"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Total Quantity
            </label>
            <input
              name="total-qty"
              placeholder="Enter total quantity"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("total-qty", { required: true })}
            />
            {errors.moq_name && (
              <p className="text-red-500 font-normal text-sm">
                Total quantity is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="material"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Material
            </label>
            <select
              name="material"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("material", { required: true })}
            >
              <option value="0">Silicon</option>
              <option value="1">Hard</option>
              <option value="2">Soft</option>
              <option value="3">Leather</option>
              <option value="4">Transperent Silicon</option>
            </select>
            {errors.material && (
              <p className="text-red-500 font-normal text-sm">
                Please select material
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="visibility"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Visibility
            </label>
            <select
              name="visibility"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("visibility", { required: true })}
            >
              <option value="0">Visible</option>
              <option value="1">Hidden</option>
            </select>
            {errors.visibility && (
              <p className="text-red-500 font-normal text-sm">
                Please select visibility
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createMoq)}
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

export default AddMoq
