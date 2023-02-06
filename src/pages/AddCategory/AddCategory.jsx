import { useEffect } from "react"
import { Fragment } from "react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { PostCategory } from "../../services"

const AddCategory = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [uploadedImage, setUploadedImage] = useState(null)

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      uploadedImage?.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [uploadedImage])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": []
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const _files = acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          order: index + 1
        })
      )
      setUploadedImage(_files)
    }
  })

  const createCategory = (data) => {
    const formData = new FormData()
    const { name } = data
    formData.append("data", JSON.stringify({ name }))
    formData.append("files.image", uploadedImage[0], uploadedImage[0].name)

    PostCategory(formData)
      .then((resp) => {
        toast.success("Category Added Successfully")
        navigate("/category-list")
      })
      .catch((err) => toast.error("Something went wrong"))
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
              {...register("name", { required: true })}
            />
            {errors.category_name && (
              <p className="text-red-500 font-normal text-sm">
                Category name is required
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
            <div className="border-2 w-full rounded-md">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="cursor-pointer p-2"
              >
                <input
                  {...getInputProps()}
                  className="outline-none w-full p-2"
                />
                <p>Choose image</p>
              </div>
            </div>
          </div>

          {uploadedImage
            ? uploadedImage.map((file, index) => {
                return (
                  <div className="flex flex-col gap-2" key={index}>
                    <p>Selected image</p>
                    <img
                      src={file.preview}
                      key={index}
                      alt="text"
                      className="w-24 h-24"
                    />
                  </div>
                )
              })
            : null}

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
