import { useState } from "react"
import { useForm } from "react-hook-form"

const MAX_COUNT = 5

const AddCategory = () => {
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

  const createCategory = (data) => {
    console.log(data)
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Category
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createCategory)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="category-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Category Name
            </label>
            <input
              name="category-name"
              placeholder="Enter full name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("category_name", { required: true })}
            />
            {errors.category_name && (
              <p className="text-red-500 font-normal text-sm">
                Category name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="availibility"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Product Availibility
            </label>
            <select
              name="availibility"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("availibility", { required: true })}
            >
              <option value="0">In Stock</option>
              <option value="1">Out of Stock</option>
            </select>
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

          {/* <div className="w-full border sm:col-span-2 rounded-sm shadow-sm p-2 flex flex-col gap-3">
            <p className="text-sm font-medium border-b pb-2">Uploaded Images</p>
            <img src="" alt="test"  />
          </div> */}

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createCategory)}
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

export default AddCategory
