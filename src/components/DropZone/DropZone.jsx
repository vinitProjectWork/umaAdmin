import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { addMedia, addMediaId } from "../../redux/slices/product/product"
import { PostProductMedia } from "../../services"
import { baseURL } from "../../utils/http"
import { DeleteMini } from "../../utils/icons"
import Modal from "../Modal/Modal"

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
}

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
}

const img = {
  display: "block",
  width: "100%",
  height: "100%"
}

const Previews = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location?.state) {
      const _files = location?.state?.attributes.product_medias.data.map(
        (media) => {
          return {
            preview: baseURL + media.attributes.media.data.attributes.url,
            size: media.attributes.media.data.attributes.size * 1000,
            order: media.attributes.order,
            type: media.attributes.media.data.attributes.ext
          }
        }
      )

      dispatch(addMedia(_files))
    }
  }, [location?.state])
  const { productMedia } = useSelector(({ product }) => product)

  console.log(productMedia)

  // const [files, setFiles] = useState([])

  // useEffect(() => {
  //   if (files.length > 0 && isConfrim) {
  //     dispatch(addMedia(files))
  //     PostProductMedia(files)
  //       .then((resp) => {
  //         if (resp.length > 0) {
  //           dispatch(addMediaId(resp[0].id))
  //           toast.success("Media uploaded successfully")
  //         }
  //       })
  //       .catch((err) => toast.error("Something went wrong!"))
  //   }
  // }, [files, isConfrim])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": []
    },
    onDrop: (acceptedFiles) => {
      const _files = acceptedFiles.map((file, index) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          order: index + 1
        })
      )
      // setFiles(_files)
      dispatch(addMedia(_files))
    }
  })

  const handleReorderIndex = (value, index) => {
    let _files = productMedia
    let _currentFile = _files[index]
    _currentFile.order = value
    const _sortedMedia = [..._files].sort((a, b) => a.order - b.order)
    dispatch(addMedia(_sortedMedia))
  }

  const removeImages = (index) => {
    const _files = productMedia
  }

  const thumbs = productMedia.map((file, index) => (
    <div
      className="flex flex-col mx-1 justify-center gap-2 border-2 border-indigo-500 p-2 rounded-md shadow-md"
      key={file.name}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={file.order}
          className="border-2 px-6 outline-none w-20 rounded-md"
          onChange={(e) =>
            handleReorderIndex(
              e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"),
              index
            )
          }
        />
        {location?.state !== "" ? (
          <span onClick={() => removeImages(index)}>
            <DeleteMini />
          </span>
        ) : null}
      </div>
      <div style={thumb}>
        <div style={thumbInner} className="flex flex-col">
          {["video/mp4", ".mp4"].includes(file.type) ? (
            <video
              src={file.preview}
              style={img}
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          ) : (
            <img
              src={file.preview}
              style={img}
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
            />
          )}
        </div>
      </div>
      <p className="text-slate-500 text-xs">{`${
        file.type === "video/mp4" ? "Video: " : "Image: "
      } ${(file.size / (1024 * 1024)).toFixed(2)} MB`}</p>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      productMedia.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <>
      <section className="border-2 border-dashed rounded-md cursor-pointer border-slate-400 p-5 h-40 flex justify-center items-center flex-col">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="text-lg text-slate-400">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
      </section>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  )
}

export default Previews
