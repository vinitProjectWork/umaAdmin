import { useState, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import {
  allCategory,
  allSubCategory
} from "../../redux/slices/category/category"
import { GetAllCategories, GetAllSubCategories } from "../../services"
import { baseURL } from "../../utils/http"

const Category = () => {
  const dispatch = useDispatch()
  const { allCategoryList } = useSelector(({ category }) => category)

  const [productCategory, setProductCategory] = useState("Mobile Cover")
  const [productSubCategory, setProductSubCategory] = useState("")
  const [audioSubCategory, setAudioSubCategory] = useState([])
  const [accessoriesSubCategory, setAccessoriesSubCategory] = useState([])

  useLayoutEffect(() => {
    GetAllCategories()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allCategory([...resp.data]))
        }
      })
      .catch((err) => toast.error("Something went wrong"))

    GetAllSubCategories()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allSubCategory([...resp.data]))
          setAudioSubCategory([...resp.data].slice(0, 4))
          setAccessoriesSubCategory([...resp.data].slice(4))
        }
      })
      .catch((err) => toast.error("Something went wrong"))
  }, [])

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <p className="font-bold text-sm">Categories</p>
        <div className="grid grid-cols-4 xl:grid-cols-4 gap-12 xl:gap-16">
          {allCategoryDump?.data?.map((category, index) => {
            return (
              <div
                className="flex flex-col items-center"
                key={index}
                onClick={() => setProductCategory(category.name)}
              >
                <div
                  className={`w-14 h-14 flex justify-center items-center p-2 mb-2 sm:mb-4 ${
                    productCategory === category?.attributes?.name
                      ? "shadow-md rounded-full bg-indigo-400 text-white"
                      : "text-indigo-500"
                  }`}
                >
                  <img
                    src={`${
                      baseURL + category?.image?.url
                    }`}
                    alt={category?.image?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>

                <h3 className="text-sm font-semibold text-center mb-2">
                  {category?.name}
                </h3>
              </div>
            )
          })}
        </div>
        <div className="mt-5">
          {productCategory !== "Mobile Cover" &&
          productCategory !== "Tempered Glass" ? (
            <p className="font-bold text-lg">Sub Categories</p>
          ) : null}
          <div className="grid grid-cols-4 xl:grid-cols-4 gap-12 xl:gap-16">
            {productCategory === "Audio"
              ? audioSubCategory?.map((subCategory, index) => {
                  return (
                    <div
                      className="flex flex-col items-center"
                      key={index}
                      onClick={() =>
                        setProductSubCategory(subCategory.attributes.name)
                      }
                    >
                      <div
                        className={`w-14 h-14 flex justify-center items-center p-2 mb-2 sm:mb-4 ${
                          productSubCategory === subCategory.attributes.name
                            ? "shadow-md rounded-full bg-indigo-500 text-white"
                            : "text-indigo-500"
                        }`}
                      >
                        {/* <img
                          src={`${
                            baseURL +
                            subCategory?.attributes?.image?.data?.[0]?.attributes?.url ?? ""
                          }`}
                          alt={
                            subCategory?.attributes?.image?.data?.[0]?.attributes?.name ?? ""
                          }
                          className="w-12 h-12 rounded-full"
                        /> */}
                      </div>

                      <h3 className="text-sm font-semibold text-center mb-2">
                        {subCategory?.attributes?.name}
                      </h3>
                    </div>
                  )
                })
              : productCategory === "Accessories"
              ? accessoriesSubCategory?.map((subCategory, index) => {
                  return (
                    <div
                      className="flex flex-col items-center"
                      key={index}
                      onClick={() =>
                        setProductSubCategory(subCategory.attributes.name)
                      }
                    >
                      <div
                        className={`w-14 h-14 flex justify-center items-center p-2  mb-2 sm:mb-4 ${
                          productSubCategory === subCategory.attributes.name
                            ? "shadow-md rounded-full bg-indigo-500 text-white"
                            : "text-indigo-500"
                        }`}
                      >
                        {/* <img
                          src={`${
                            baseURL +
                            subCategory.attributes.image.data.attributes.url
                          }`}
                          alt={
                            subCategory.attributes.image.data.attributes.name
                          }
                          className="w-12 h-12 rounded-full"
                        /> */}
                      </div>

                      <h3 className="text-sm font-semibold text-center mb-2">
                        {subCategory.attributes.name}
                      </h3>
                    </div>
                  )
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
