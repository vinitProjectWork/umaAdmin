import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { PostCompany } from "../../services"

const MAX_COUNT = 1

const AddCompany = () => {
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

  const createCompany = (data) => {
    const _data = {
      name: data.company_name,
      logo: data.image
    }
    PostCompany({ ..._data })
      .then((resp) => {
        toast.success("Company created successfully!")
        navigate("/company-list")
      })
      .catch((err) => toast.error("Something went wrong!"))
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Company
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createCompany)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="company-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Company Name
            </label>
            <input
              name="company-name"
              placeholder="Enter company name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("company_name", { required: true })}
            />
            {errors.category_name && (
              <p className="text-red-500 font-normal text-sm">
                Company name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Logo
            </label>
            <input
              name="image"
              type="file"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              accept="image/png"
              onChange={handleFileEvent}
              disabled={fileLimit}
              {...register("image", { required: true })}
            />
            {errors.logo && (
              <p className="text-red-500 font-normal text-sm">
                Logo name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createCompany)}
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

export default AddCompany
