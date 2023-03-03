import Previews from "../../../../components/DropZone/DropZone"

const UploadForm = ({ setData }) => {
  return (
    <div>
      <div className="my-2">
        <p className="my-1">Upload Media</p>
        <Previews />
      </div>
    </div>
  )
}

export default UploadForm
