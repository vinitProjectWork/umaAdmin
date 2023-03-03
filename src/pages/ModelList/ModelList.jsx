import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Filters from "../../components/Filters/Filters";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import { allBrands, allBrandsDump } from "../../redux/slices/brands/brands";
import { allModels } from "../../redux/slices/models/models";
import {
  UpdateModel,
  DeleteSelectedModel,
  GetAllBrandList,
  GetAllModelsList,
} from "../../services";
import { EditMini, DeleteMini } from "../../utils/icons";
import DeleteModel from "./Components/DeleteModel";
import EditModel from "./Components/EditModel";

const ModelList = () => {
  const navigate = useNavigate();

  const { allBrandList } = useSelector(({ brands }) => brands);

  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedData, setEditedData] = useState("");
  const [allModelList, setAllModelList] = useState([]);
  const [totalRows, setTotalRows] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    let tempModels = [...allBrandList.map((item) => item.options)].flat();
    setAllModelList(tempModels);
  }, [allBrandList]);

  const handlePageChange = (page) => {
    setPerPage(page);
  };

  const handlePerRowsChange = (rows) => {
    setTotalRows(rows);
  };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row.label,
        grow: 2,
      },
      {
        name: "Status",
        cell: () => <span>Active</span>,
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
    ],
    [allBrandList]
  );

  const handleAction = (type, row) => {
    setSelectedRow(row);
    if (type === "edit") {
      editCategory(type);
    } else {
      deleteCategory(type);
    }
  };

  const editCategory = (type) => {
    setAction(type);
    setOpen(true);
  };

  const deleteCategory = (type) => {
    setAction(type);
    setOpen(true);
  };

  const handleSaveAction = () => {
    if (action === "edit") {
      UpdateModel({ id: selectedRow.value, value: editedData })
        .then((resp) => {
          setOpen(false);
          toast.success("Model updated successfully!");
        })
        .catch((err) => toast.error("something went wrong"));
    } else {
      DeleteSelectedModel({ id: selectedRow.value })
        .then((resp) => {
          setOpen(false);
          toast.success("Model deleted successfully!");
        })
        .catch((err) => toast.error("something went wrong"));
    }
  };

  return (
    <>
      {open ? (
        <Modal
          open={open}
          setOpen={setOpen}
          title={action === "edit" ? "Edit Model" : "Delete Model"}
          children={
            action === "edit" ? (
              <EditModel data={selectedRow} setEditedData={setEditedData} />
            ) : (
              <DeleteModel data={selectedRow} />
            )
          }
          button={
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-indigo-500 px-4 py-2 text-base font-medium text-gray-100 outline-none shadow-sm hover:bg-indigo-600 duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleSaveAction()}
            >
              {action === "edit" ? "Save" : "Delete"}
            </button>
          }
        />
      ) : null}
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Model List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-model")}
                >
                  Add Model
                </button>
              </div>
            </div>
          </div>

          <Filters />
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="shadow-md px-3 my-3">
              <Table
                columns={columns}
                data={allModelList}
                paginationData={allModelList?.length}
                handlePerRowsChange={(e) => handlePerRowsChange(e)}
                handlePageChange={(e) => handlePageChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelList;
