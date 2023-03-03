import { useState } from "react"
import Previews from "../../../../components/DropZone/DropZone"

const UploadForm = ({ data,setData}) => {
  return (
    <div>
      <div className="my-2">
        <p className="my-1">Upload Media</p>
        <Previews data={data} setData={setData} />
      </div>
    </div>
  )
}

export default UploadForm
