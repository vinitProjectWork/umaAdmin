import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ setData, data }) => {
  const [value, setValue] = useState("");
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={data?.details} onChange={(value) =>
        setData({
          ...data,
          details: value
        })
      } />
    </div>
  );
};

export default Editor;
