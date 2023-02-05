import React, { useMemo } from "react"
import DataTable from "react-data-table-component"
import Filters from "../../components/Filters/Filters"
import { useNavigate } from "react-router-dom"
import Table from "../../components/Table/Table"

const FAQ = () => {
  const navigate = useNavigate()
  const columns = useMemo(
    () => [
      {
        name: "Question",
        selector: (row) => row.question,
        sortable: true
      },
      {
        name: "Answer",
        selector: (row) => row.answer,
        sortable: true
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true
      },
      {
        name: "Action",
        selector: (row) => row.action,
        sortable: true
      }
    ],
    []
  )
  const data = [
    {
      id: 1,
      question: "FAQ question?",
      answer: "faq answer",
      status: "active",
      action: "Edit | Delete"
    },
    {
      id: 1,
      question: "FAQ question?",
      answer: "faq answer",
      status: "inactive",
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
                FAQ List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-faq")}
                >
                  Add FAQ
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

export default FAQ
