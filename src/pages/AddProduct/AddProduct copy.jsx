import { Fragment, useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import SelectComponent from "../../components/Select/Select"
import { CreateProduct, GetProductById, PostProductMedia } from "../../services"
import { Details, Media, Mobile, Money } from "../../utils/icons"
import AddProductForm from "./Components/AddProductForm/AddProductForm"
import ModelsForm from "./Components/ModelsForm/ModelsForm"
import PriceForm from "./Components/PriceForm/PriceForm"
import UploadForm from "./Components/UploadForm/UploadForm"

const STEPS = [
  { label: "Media", icon: Media },
  { label: "Details", icon: Details },
  { label: "Models", icon: Mobile },
  { label: "Price", icon: Money }
]

const AddProduct = () => {

  const { allCategoryList } = useSelector(({ category }) => category)
  const { productMedia } = useSelector(({ product }) => product)

  const [data, setData] = useState({})
  const [search, setSearch] = useSearchParams();
  const id = search.get("id")

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (id) {
      GetProductById(id).then((resp) => {
        const model = [...JSON.parse(resp?.data?.attributes?.modelDetailUpdated)]?.map(item => {return {
          ...item,
          value:item?.id,
          label: item?.name
        }})
        setData({
          ...resp?.data?.attributes, category: resp?.data?.attributes?.category?.data?.id, model
        })
        setSelectedCategory(parseInt(resp?.data?.attributes?.category?.data?.id))
      })
        .catch(() => toast.error("Something went wrong"))

    }
  }, [id])


  const handleNext = () => {
    setCurrentIndex((old) => old + 1)
  }

  //next step
  const handlePrevious = () => {
    setCurrentIndex((old) => old - 1)
  }

  const productMediaUpload = (id) => {
    const mediaData = []
    let error = false
    productMedia.map(async (media) => {
      const formData = new FormData()
      formData.append("files.media", media, media.name)
      formData.append(
        "data",
        JSON.stringify({ order: media.order, product: id })
      )
      await PostProductMedia(formData)
        .then(function (values) {
          mediaData.push(values?.data?.id)
          toast.success(`${media.name} uploaded successfully`)
        })
        .catch(() => {
          error = true
          toast.error("Something went wrong!")
        })
    })
  }

  // //create product
  const createProduct = () => {
    if (productMedia.length > 0) {
      data.modelDetails = data.modelDetailUpdated = JSON.stringify(
        data.model.map((item) => {
          return {
            name: item.label,
            id: item.value,
            moq: item.moq ?? data.moq,
            price: item.price ?? data.price
          }
        })
      )
      data.originalPrice = data.price
      data.category = selectedCategory
      CreateProduct(data)
        .then((resp) => {
          productMediaUpload(resp.data.id)
          resetForm()
        })
        .catch(() => toast.error("Something went wrong"))
    } else {
      toast.error("Media is not selected.")
    }
  }

  //reset form
  const resetForm = () => {
    setSelectedCategory(null)
    setCurrentIndex(0)
  }

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
          <SelectComponent
            isStatic={true}
            data={allCategoryList}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        {selectedCategory ? (
          <div className="p-2">
            <div className="mx-4 p-4">
              <div className="flex items-center">
                {STEPS.map((step, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="flex items-center text-white relative">
                        <div
                          className={`rounded-full text-center flex justify-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${index === currentIndex
                              ? "text-white-600"
                              : "text-indigo-800"
                            } border-indigo-600 ${index === currentIndex
                              ? "bg-indigo-600"
                              : "bg-white"
                            }`}
                        >
                          <span>{step.icon}</span>
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 flex justify-center text-xs font-medium uppercase text-indigo-600">
                          {step.label}
                        </div>
                      </div>
                      {index === STEPS.length - 1 ? null : (
                        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </div>
            <div className="mt-8 p-4">
              {currentIndex === 0 ? (
                <UploadForm setData={setData} data={data} />
              ) : currentIndex === 1 ? (
                <AddProductForm setData={setData} data={data} />
              ) : currentIndex === 2 ? (
                <ModelsForm setData={setData} data={data} />
              ) : (
                <PriceForm setData={setData} data={data} />
              )}

              <div className="flex p-2 mt-4">
                {currentIndex === 0 ? null : (
                  <button
                    onClick={() => handlePrevious()}
                    className="text-base focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-blue-500 bg-blue-500 text-gray-100 border duration-200 ease-in-out border-blue-400 transition"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-auto flex flex-row-reverse">
                  {currentIndex === STEPS.length - 1 ? (
                    <button
                      onClick={() => createProduct()}
                      className="text-base ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-indigo-600 bg-indigo-600 text-indigo-100 border duration-200 ease-in-out border-indigo-600 transition"
                    >
                      Add Product
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNext()}
                      className="text-base ml-2 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-indigo-600 bg-indigo-600 text-indigo-100 border duration-200 ease-in-out border-indigo-600 transition"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default AddProduct
