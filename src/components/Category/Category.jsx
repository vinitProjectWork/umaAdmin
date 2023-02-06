import { useState } from "react"
import { useSelector } from "react-redux"
import { baseURL } from "../../utils/http"

const Category = () => {
  const { allCategoryDump, audioSubCategory, accessoriesSubCategory } =
    useSelector(({ category }) => category)

  const [productCategory, setProductCategory] = useState("Mobile Cover")
  const [productSubCategory, setProductSubCategory] = useState("")

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <p className="font-bold text-sm">Categories</p>
        <div className="grid grid-cols-4 xl:grid-cols-4 gap-12 xl:gap-16">
          {allCategoryDump.data?.map((category, index) => {
            return (
              <div
                className="flex flex-col items-center"
                key={index}
                onClick={() => setProductCategory(category.attributes.name)}
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
                      baseURL + category.attributes.image.data.attributes.url
                    }`}
                    alt={category.attributes.image.data.attributes.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>

                <h3 className="text-sm font-semibold text-center mb-2">
                  {category.attributes.name}
                </h3>
              </div>
            )
          })}
        </div>
        <div className="mt-5">
          {productCategory !== "Mobile Cover" &&
          productCategory !== "Tempered Glass" ? (
            <p className="font-bold text-sm">Sub Categories</p>
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
                        <img
                          src={`${
                            baseURL +
                            subCategory.attributes.image.data[0].attributes.url
                          }`}
                          alt={
                            subCategory.attributes.image.data[0].attributes.name
                          }
                          className="w-12 h-12 rounded-full"
                        />
                      </div>

                      <h3 className="text-sm font-semibold text-center mb-2">
                        {subCategory.attributes.name}
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
                        <img
                          src={`${
                            baseURL +
                            subCategory.attributes.image.data[0].attributes.url
                          }`}
                          alt={
                            subCategory.attributes.image.data[0].attributes.name
                          }
                          className="w-12 h-12 rounded-full"
                        />
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
