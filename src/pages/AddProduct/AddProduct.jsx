import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  CreateProduct,
  GetProductById,
  GetProductMediaById,
  PostProductMedia,
  PostProductMediaWithOutImage,
  UpdateProduct,
} from "../../services";
import { baseURL } from "../../utils/http";
import { Details, Media, Mobile, Money } from "../../utils/icons";
import AddProductForm from "./Components/AddProductForm/AddProductForm";
import ModelsForm from "./Components/ModelsForm/ModelsForm";
import PriceForm from "./Components/PriceForm/PriceForm";
import UploadForm from "./Components/UploadForm/UploadForm";

const STEPS = [
  { label: "Media" },
  { label: "Details" },
  { label: "Price" },
  { label: "Models" },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const { allCategoryList } = useSelector(({ category }) => category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({});
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");

  useEffect(() => {
    if (id) {
      GetProductById(id)
        .then((resp) => {
          const model = resp?.data?.modelDetailUpdated;
          const selectedcategory = {
            label: resp?.data.category?.name,
            value: resp?.data?.category?.id,
          };
          const media = resp?.data?.product_medias?.map((item) => {
            return {
              preview: baseURL + item?.media?.url,
              size: item?.media?.size * 1000,
              order: item?.order,
              type: item?.media?.ext,
              id: item?.id,
            };
          });
          const _sortedMedia = [...media].sort((a, b) => a.order - b.order);
          // setData({ ...data, media: _sortedMedia });
          setData({
            ...resp?.data,
            selectedcategory,
            model,
            media: _sortedMedia,
          });
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  }, [id]);

  const productMediaUpload = async (id) => {
    let medias = [];
    data?.media?.map(async (media, index) => {
      if (media instanceof File) {
        const formData = new FormData();
        formData.append("files.media", media, media.name);
        formData.append(
          "data",
          JSON.stringify({ order: media.order, product: id })
        );
        await PostProductMedia(formData)
          .then(async function (values) {
            if (values) {
              await GetProductMediaById(values?.data?.id).then((value) => {
                medias.push({
                  preview: baseURL + value?.data?.media?.url,
                  size: value?.data?.media?.size * 1000,
                  order: value?.data?.order,
                  type: value?.data?.media?.ext,
                  id: value?.data?.id,
                });
              });
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      } else {
        medias.push({ ...media });
      }
      if (index + 1 === data?.media?.length) {
        setData({ ...data, media: medias, id });
      }
    });
  };

  const checkProductMedia = () => {
    const _sortedMedia = [...data?.media].sort((a, b) => a.order - b.order);
    if (_sortedMedia[0].type === ".mp4") {
      return false;
    }
    return true;
  };

  const createProduct = () => {
    if (checkProductMedia()) {
      CreateProduct({ category: data.category, media: data.media })
        .then((resp) => {
          productMediaUpload(resp.data.id);
        })
        .catch(() => toast.error("Something went wrong"));
    } else {
      toast.info("Video can't be at first place");
    }
  };

  const updateProduct = () => {
    if (checkProductMedia()) {
      UpdateProduct(data)
        .then((resp) => {})
        .catch(() => toast.error("Something went wrong"));
    } else {
      toast.info("Video can't be at first place");
    }
  };

  const handleNextStep = async (currentIndex) => {
    if (checkProductMedia()) {
      if (currentIndex === 0 && data.id === undefined) {
        createProduct();
      } else {
        const oldData = data?.media.filter((item) => !(item instanceof File));
        if (oldData.length > 0) {
          oldData.map(async (item) => {
            await PostProductMediaWithOutImage(item.order, item.id)
              .then(async function (values) {})
              .catch(() => {
                toast.error("Something went wrong!");
              });
          });
        }
        const newMedia = data?.media.filter((item) => item instanceof File);
        if (newMedia.length > 0) {
          await productMediaUpload(id);
        }
        updateProduct();
      }
      if (currentIndex + 1 < STEPS.length) {
        setCurrentIndex((old) => old + 1);
      } else {
        setCurrentIndex(0);
        setData({});
        navigate("/products");
        toast.success(`Product added successfully`);
      }
    } else {
      toast.info("Video can't be at first place");
    }
  };

  const handlePrevStep = () => {
    setCurrentIndex((old) => old - 1);
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add Product
          </h2>
        </div>

        <div className="mx-4 p-4">
          <p className="mb-2">Select Category</p>
          <Select
            value={data.selectedcategory}
            options={allCategoryList}
            onChange={(value) =>
              setData({
                ...data,
                category: value.value,
                selectedcategory: value,
              })
            }
            placeholder={"Select Category"}
          />
        </div>
        {data?.selectedcategory?.value && (
          <div className="p-2">
            <div className="mx-4 p-4">
              <div className="flex items-center">
                {STEPS.map((step, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="flex items-center text-white relative">
                        <div
                          className={`rounded-full text-center flex justify-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                            index === currentIndex
                              ? "text-white-600"
                              : "text-indigo-800"
                          } border-indigo-600 ${
                            index === currentIndex
                              ? "bg-indigo-600"
                              : "bg-white"
                          }`}
                        ></div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 flex justify-center text-xs font-medium uppercase text-indigo-600">
                          {step.label}
                        </div>
                      </div>
                      {index === STEPS.length - 1 ? null : (
                        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className="mt-8 p-4">
              {currentIndex === 0 ? (
                <UploadForm data={data} setData={setData} />
              ) : currentIndex === 1 ? (
                <AddProductForm data={data} setData={setData} />
              ) : currentIndex === 2 ? (
                <PriceForm data={data} setData={setData} />
              ) : (
                <ModelsForm data={data} setData={setData} />
              )}

              <div className="flex p-2 mt-4">
                {currentIndex === 0 ? null : (
                  <button
                    onClick={() => handlePrevStep()}
                    className="text-base focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-blue-500 bg-blue-500 text-gray-100 border duration-200 ease-in-out border-blue-400 transition"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-auto flex flex-row-reverse">
                  <button
                    onClick={() => handleNextStep(currentIndex)}
                    className="text-base ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-indigo-600 bg-indigo-600 text-indigo-100 border duration-200 ease-in-out border-indigo-600 transition"
                  >
                    {currentIndex === STEPS.length - 1 ? "Add Product" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
