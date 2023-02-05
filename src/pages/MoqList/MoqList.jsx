import React, { useMemo } from "react"
import DataTable from "react-data-table-component"
import Filters from "../../components/Filters/Filters"
import { useNavigate } from "react-router-dom"
import Table from "../../components/Table/Table"

const MoqList = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        name: "MOQ name",
        selector: (row) => row.moq_name,
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
        name: "Minimum Quantity",
        selector: (row) => row.min_qty,
        sortable: true
      },
      {
        name: "Total Quantity",
        selector: (row) => row.total_qty,
        sortable: true
      },
      {
        name: "Material Type",
        selector: (row) => row.material_type,
        sortable: true
      },
      {
        name: "Visible",
        selector: (row) => row.isVisible,
        sortable: true,
        cell: (row) => <span>{row.isVisible ? "Yes" : "No"}</span>
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
      moq_name: "First MOQ",
      status: "in_stock",
      min_qty: "25",
      total_qty: "100",
      material_type: "soft",
      isVisible: true,
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
                Moq List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-moq")}
                >
                  Add MOQ
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
        <style>
          {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
        </style>
      </div>
    </>
  )
}

export default MoqList
