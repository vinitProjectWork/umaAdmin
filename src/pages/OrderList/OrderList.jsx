import React, { useState } from "react"
import DataTable from "react-data-table-component"
import Modal from "../../components/Modal/Modal"
import Filters from "../../components/Filters/Filters"
import Table from "../../components/Table/Table"

const OrderList = () => {
  const [open, setOpen] = useState(false)
  const columns = [
    {
      name: "Description",
      selector: (row) => row.title
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity
    },
    {
      name: "Date",
      selector: (row) => row.date
    },
    {
      name: "Action",
      selector: (row) => row.action
    }
  ]

  const data = [
    {
      id: 1,
      title: "Pixel 4a soft case",
      quantity: "24",
      date: "23/01/2022",
      action: "View Summary"
    },
    {
      id: 1,
      title: "Oneplus 9RT glass back case",
      quantity: "50",
      date: "01/01/2022",
      action: "View Summary"
    }
  ]

  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Order List
              </p>
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

export default OrderList
