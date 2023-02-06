import { useEffect } from "react"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { baseURL } from "../../../utils/http"
import { DeleteMini } from "../../../utils/icons"

const EditCategory = ({ data, setEditedData, selectedTab, editedData }) => {
  const { name } = data.attributes
  const { url } = data?.attributes?.image?.data?.attributes

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
      setEditedData((state) => {
        return {
          ...state,
          isEdited: true,
          image: _files
        }
      })
    }
  })

  const handleRemoveImage = () => setUploadedImage(null)

  return (
    <div className="flex flex-col gap-2">
      <div className="border-2 w-full rounded-md">
        <input
          type="text"
          value={editedData.name || name}
          className="outline-none w-full p-2"
          onChange={(e) =>
            setEditedData((state) => {
              return {
                ...state,
                isEdited: true,
                name: e.target.value
              }
            })
          }
        />
      </div>
      <div className="border-2 w-full rounded-md">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="cursor-pointer p-2"
        >
          <input {...getInputProps()} className="outline-none w-full p-2" />
          <p>Choose another image</p>
        </div>
      </div>
      <div className="border-t-2 flex">
        {/* image preview section */}
        <div className="flex-col">
          <div className="flex gap-4 items-center">
            <p className="font-medium mt-1">{`${
              uploadedImage ? `Selected Image` : `Uploaded image`
            }`}</p>
            {uploadedImage ? (
              <span
                className="cursor-pointer"
                onClick={() => handleRemoveImage()}
              >
                <DeleteMini />
              </span>
            ) : null}
          </div>

          {uploadedImage ? (
            uploadedImage.map((file, index) => {
              return (
                <img
                  src={file.preview}
                  key={index}
                  alt="text"
                  className="w-24 h-24"
                />
              )
            })
          ) : (
            <img src={baseURL + url} alt={name} className="w-24 h-24" />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditCategory
