import React, { useMemo } from "react"
import DataTable from "react-data-table-component"
import Filters from "../../components/Filters/Filters"
import { useNavigate } from "react-router-dom"
import Table from "../../components/Table/Table"

const UserList = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        name: "User name",
        selector: (row) => row.user_name,
        sortable: true
      },
      {
        name: "Shop name",
        selector: (row) => row.shop_name,
        sortable: true
      },
      {
        name: "Mobile",
        selector: (row) => row.mobile_number,
        sortable: true
      },
      {
        name: "Address",
        selector: (row) => row.address_1,
        sortable: true,
        cell: (row) => (
          <span>
            {row.address_1},{row.address_2}, {row.city}, {row.state},{" "}
            {row.pincode}
          </span>
        )
      },
      {
        name: "GST Number",
        selector: (row) => row.gst_number,
        sortable: true
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
      user_name: "Rameshbhai Patel",
      shop_name: "Krishna Mobile Accessiory Hub",
      mobile_number: "+91-9456210281",
      address_1: "Dr. yagnik road, opp. Imperial place",
      address_2: "Jagnath plot",
      city: "Rajkot",
      state: "Gujarat",
      pincode: "360001",
      gst_number: "24AABCU9603R1ZT",
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
                User List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-user")}
                >
                  Add User
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

export default UserList
