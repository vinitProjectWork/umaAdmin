import { useState } from "react";
import { useSelector } from "react-redux";
import Previews from "../../components/DropZone/DropZone";
import { baseURL } from "../../utils/http";

const SliderConfig = () => {
  const { sliderImage } = useSelector(({ slider }) => slider);

  const [data, setData] = useState({});

  return (
    <div className="sm:px-6 w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Slider Config
          </p>
        </div>
        <div className="mt-5">
          <h3 className="font-medium my-1">Slider Images</h3>
          <div className="flex gap-2">
            {sliderImage.map((image, index) => {
              return (
                <img
                  className="w-48 h-48 border-2 p-1 shadow-md rounded-md"
                  src={`${baseURL + image.sliderImage.url}`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <h3 className="font-medium my-1">Upload Images</h3>
          <Previews data={data} setData={setData} />
        </div>
        {data?.media?.length > 0 ? (
          <div className="mt-5 float-right">
            <button className="bg-indigo-500 text-slate-50 rounded-md p-2 shadow-md">
              Upload
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SliderConfig;
