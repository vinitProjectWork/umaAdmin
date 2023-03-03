import { useEffect } from "react";
import { useState } from "react";
import { baseURL } from "../../../utils/http";

const EditCompany = ({ data, setEditedData }) => {
  const {
    name,
    logo: { url },
  } = data;

  const [updatedName, setUpdatedName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setUpdatedName(name);
    setSelectedImage(baseURL + url);
  }, [name, url]);

  const updateName = (value) => {
    setEditedData((state) => {
      return {
        ...state,
        name: value,
      };
    });
    setUpdatedName(value);
  };

  const handleImageSelect = (file) => {
    const _preview = URL.createObjectURL(file);
    setSelectedImage(file);
    setImagePreview(_preview);
    setEditedData((state) => {
      return {
        ...state,
        logo: file,
      };
    });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        type="text"
        value={updatedName}
        className="border-2 w-full p-2 rounded-md"
        onChange={(e) => updateName(e.target.value)}
      />
      <div className="border-2 rounded-md p-1 w-max flex gap-2">
        <img src={imagePreview ?? selectedImage} className="w-12 h-12" />
        <input
          type="file"
          className="border-2 w-full p-2 rounded-md"
          onChange={(event) => {
            handleImageSelect(event.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};

export default EditCompany;
