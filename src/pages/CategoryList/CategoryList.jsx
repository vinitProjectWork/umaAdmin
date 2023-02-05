import React, { useMemo } from "react"
import DataTable from "react-data-table-component"
import Filters from "../../components/Filters/Filters"
import { useNavigate } from "react-router-dom"
import Table from "../../components/Table/Table"

const CategoryList = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        name: "Category name",
        selector: (row) => row.category_name,
        sortable: true
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
          <span
            className={`${
              row.status === "out_of_stock"
                ? "font-medium text-red-500"
                : "font-medium text-green-500"
            }`}
          >
            {row.status.split("_").join(" ").toUpperCase()}
          </span>
        )
      },
      {
        name: "Images",
        selector: (row) => row.address_1,
        sortable: true,
        cell: (row) => (
          <span>
            <img src="" alt="images" />
          </span>
        )
      },
      {
        name: "Action",
        selector: (row) => row.action
      }
    ],
    []
  )
  const data = [
    {
      id: 1,
      category_name: "Hard case",
      status: "in_stock",
      images: "",
      action: "Edit | Delete"
    },
    {
      id: 2,
      category_name: "Soft case",
      status: "out_of_stock",
      images: "",
      action: "Edit | Delete"
    },
    {
      id: 2,
      category_name: "Glass case",
      status: "out_of_stock",
      images: "",
      action: "Edit | Delete"
    }
  ]

  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Category List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-category")}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>

          <Filters />

          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="shadow-md px-3 my-3">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryList
