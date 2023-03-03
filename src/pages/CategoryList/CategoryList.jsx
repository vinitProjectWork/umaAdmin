import React, { useEffect, useMemo } from "react";
import Filters from "../../components/Filters/Filters";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { useSelector } from "react-redux";
import { useState } from "react";
import { DeleteMini, EditMini } from "../../utils/icons";
import Tabs from "../../components/Tabs/Tabs";
import { baseURL } from "../../utils/http";
import Modal from "../../components/Modal/Modal";
import EditCategory from "./Components/EditCategory";
import DeleteCategory from "./Components/DeleteCategory";
import { toast } from "react-toastify";
import { DeleteSelectedCategory, UpdateCategory } from "../../services";

const CategoryList = () => {
  const navigate = useNavigate();
  const { allCategoryDump, allSubCategoryDump } = useSelector(
    ({ category }) => category
  );

  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [columns, setColumns] = useState([]);
  const [totalRows, setTotalRows] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [editedData, setEditedData] = useState({
    name: "",
    image: "",
  });

  const [tabsName, setTabsName] = useState(["Category", "Sub Category"]);
  const [selectedTab, setSelectedTab] = useState("Category");

  const handlePageChange = (page) => {
    setPerPage(page);
    getData(page);
  };

  const handlePerRowsChange = (rows) => {
    setTotalRows(rows);
  };

  useEffect(() => {
    setColumns([
      {
        name:
          selectedTab === "Category" ? "Category name" : "Sub Category Name",
        selector: (row) => row?.name,
        sortable: true,
      },
      {
        name: "Images",
        selector: (row) => row?.image?.url,
        cell: (row) => (
          <span>
            <img
              src={baseURL + row?.image?.url}
              alt={row?.image?.name}
              className="w-10 h-10"
            />
          </span>
        ),
      },
      {
        name: "Action",
        selector: (row) => row.action,
        cell: (row) => (
          <div className="flex justify-between gap-2">
            <span
              onClick={() => handleAction("edit", row)}
              className="cursor-pointer"
            >
              <EditMini />
            </span>
            <span
              onClick={() => handleAction("delete", row)}
              className="cursor-pointer"
            >
              <DeleteMini />
            </span>
          </div>
        ),
      },
    ]);
  }, [selectedTab]);

  const handleAction = (type, row) => {
    setSelectedRow(row);
    if (type === "edit") {
      editCompany(type);
    } else {
      deleteCompany(type);
    }
  };

  const editCompany = (type) => {
    setAction(type);
    setOpen(true);
  };

  const deleteCompany = (type) => {
    setAction(type);
    setOpen(true);
  };

  const handleSaveAction = async (type) => {
    if (type === "edit") {
      const { id } = selectedRow;
      const { name, image } = editedData;
      if (name !== "" && image !== "") {
        const formData = new FormData();
        if (name !== "") {
          formData.append("data", JSON.stringify({ name }));
        }
        if (image !== "") {
          formData.append("files.image", image[0], image[0].name);
        }

        UpdateCategory(id, formData)
          .then((resp) => {
            toast.success("Category updated successfull");
          })
          .catch((err) => {
            toast.error("something went wrong");
          })
          .finally(() => setOpen(false));
      } else {
        setOpen(false);
      }
    } else {
      DeleteSelectedCategory({ id: selectedRow.id })
        .then((resp) => toast.success("Category deleted successfully!"))
        .catch((err) => toast.error("something went wrong"))
        .finally(() => setOpen(false));
    }
  };

  return (
    <>
      <div>
        {open ? (
          <Modal
            open={open}
            setOpen={setOpen}
            title={action === "edit" ? "Edit Category" : "Delete Category"}
            children={
              action === "edit" ? (
                <EditCategory
                  data={selectedRow}
                  selectedTab={selectedTab}
                  setEditedData={setEditedData}
                  editedData={editedData}
                />
              ) : (
                <DeleteCategory data={selectedRow} />
              )
            }
            button={
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-indigo-500 px-4 py-2 text-base font-medium text-gray-100 outline-none shadow-sm hover:bg-indigo-600 duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => handleSaveAction(action)}
              >
                {action === "edit" ? "Save" : "Delete"}
              </button>
            }
          />
        ) : null}
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Category List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() =>
                    navigate(
                      selectedTab === "Category"
                        ? "/add-category"
                        : "/add-sub-category"
                    )
                  }
                >
                  {`Add ${selectedTab}`}
                </button>
              </div>
            </div>
          </div>

          <Filters />

          <div className="py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <Tabs
              tabsName={tabsName}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />
            {selectedTab === "Category" ? (
              <Table
                columns={columns}
                data={allCategoryDump?.data}
                paginationData={allCategoryDump?.meta}
                handlePerRowsChange={(e) => handlePerRowsChange(e)}
                handlePageChange={(e) => handlePageChange(e)}
              />
            ) : (
              <Table
                columns={columns}
                data={allSubCategoryDump?.data}
                paginationData={allSubCategoryDump?.meta}
                handlePerRowsChange={(e) => handlePerRowsChange(e)}
                handlePageChange={(e) => handlePageChange(e)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
