import React, { useState } from "react"
import DataTable from "react-data-table-component"
import { Navigate, useNavigate } from "react-router-dom"
import Filters from "../../components/Filters/Filters"
import Table from "../../components/Table/Table"

const ModelMOQList = () => {
  const navigate = useNavigate()
  const columns = [
    {
      name: "MOQ Name",
      selector: (row) => row.name
    },
    {
      name: "MOQ ID",
      selector: (row) => row.moq_id
    },
    {
      name: "Model ID",
      selector: (row) => row.model_id
    },
    {
      name: "Minimum Quantity",
      selector: (row) => row.min_qty
    },
    {
      name: "Action",
      selector: (row) => row.action
    }
  ]

  const data = [
    {
      id: 1,
      name: "MOQ name",
      moq_id: "#1234",
      model_id: "#569",
      min_qty: "25",
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
                Model MOQ List
              </p>

              {/* <div className="hidden md:w-1/3 md:block lg:w-1/5">
                <Select placeHolder="Search..." />
              </div> */}

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-model-moq")}
                >
                  Add Model MOQ
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

export default ModelMOQList
