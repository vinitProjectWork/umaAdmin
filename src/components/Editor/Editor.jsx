import React from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const Editor = ({ setData, data }) => {
  return (
    <div className="bg-white">
      <CKEditor
        editor={ClassicEditor}
        data={data.details ?? ""}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({ event, editor, data })
          setData((state) => {
            return {
              ...state,
              details: data
            }
          })
        }}
      />
    </div>
  )
}

export default Editor
