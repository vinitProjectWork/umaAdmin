import { useSelector } from "react-redux";
import Select from "react-select";
import { DeleteMini } from "../../../../utils/icons";

const ModelsForm = ({ setData, data }) => {
  const { allBrandList } = useSelector(({ brands }) => brands);

  const handleUpdatedData = (value, type, index) => {
    if (type === "delete") {
      let tempData = { ...data };
      let tempModel = [...JSON.parse(tempData?.modelDetailUpdated)].sort((a, b) => a.brand - b.brand);
      tempModel.splice(index, 1);
      setData({
        ...tempData,
        model: tempModel,
        modelDetailUpdated: JSON.stringify(tempModel),
      });
    } else {
      let tempData = { ...data };
      let tempModel = [...JSON.parse(tempData.modelDetailUpdated)].sort((a, b) => a.brand - b.brand);
      let tempCurrentData = tempModel[index];
      tempCurrentData[type] = value;
      tempData.model = tempModel;
      tempData.modelDetailUpdated = tempData.modelDetails =
        JSON.stringify(tempModel);
      setData({ ...tempData });
    }
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <label>Select Model</label>
      <Select
        defaultValue={
          data?.modelDetailUpdated ? JSON.parse(data?.modelDetailUpdated) : []
        }
        options={allBrandList}
        onChange={(value) =>
          setData({
            ...data,
            model: value,
            modelDetails: JSON.stringify(value),
            modelDetailUpdated: JSON.stringify(value),
          })
        }
        isMulti
        placeholder={"Select Model"}
      />
      {data.id && (
        <div className="flex flex-col gap-2">
          <label className="font-medium border-b-2 border-t-2 py-1">
            Selected Models
          </label>
          {data?.id
            ? data?.modelDetailUpdated &&
              JSON.parse(data?.modelDetailUpdated)
                ?.sort((a, b) => a.brand - b.brand)
                .map((model, index) => {
                  return (
                    <div>
                      {index === 0 && (
                        <div className="flex justify-between">
                          <p className="w-1/4 min-w-1/4 font-medium">Model</p>
                          <p className="px-2 w-1/4 font-medium">QTY</p>
                          <p className="px-2 w-1/4 font-medium">Price</p>
                          <p className="px-2 w-1/4 font-medium">MOQ</p>
                          <p className="px-2 w-1/6"></p>
                        </div>
                      )}
                      <div className="flex justify-between gap-2 items-center">
                        <p className="w-1/4 min-w-1/4 text-xs md:text-md">{model.label}</p>
                        <div className="w-1/4">
                          <input
                            type="text"
                            placeholder="Enter moq"
                            value={model.qty ?? data.model_qty}
                            onChange={(e) =>
                              handleUpdatedData(e.target.value, "qty", index)
                            }
                            className="px-2 border-2 h-fit w-full rounded-md text-center"
                          />
                        </div>
                        <input
                          type="text"
                          value={model.price ?? data.originalPrice}
                          onChange={(e) =>
                            handleUpdatedData(e.target.value, "price", index)
                          }
                          placeholder="Enter price"
                          className="px-2 h-fit border-2 w-1/4 rounded-md text-center"
                        />
                        <input
                          type="text"
                          value={model.moq ?? data.model_moq}
                          onChange={(e) =>
                            handleUpdatedData(e.target.value, "moq", index)
                          }
                          placeholder="Enter MOQ"
                          className="px-2 h-fit border-2 w-1/4 rounded-md text-center"
                        />
                        <button
                          onClick={() =>
                            handleUpdatedData("0", "delete", index)
                          }
                          className="px-2 w-1/6 cursor-pointer"
                        >
                          <DeleteMini />
                        </button>
                      </div>
                    </div>
                  );
                })
            : data?.model?.map((item) => item.label).join(", ")}
        </div>
      )}
    </div>
  );
};

export default ModelsForm;
