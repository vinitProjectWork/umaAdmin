import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Filters from "../../components/Filters/Filters";
import Modal from "../../components/Modal/Modal";
import Table from "../../components/Table/Table";
import {
  DeleteSelectedCompany,
  GetAllBrandList,
  UpdateCompany,
} from "../../services";
import { baseURL } from "../../utils/http";
import { DeleteMini, EditMini } from "../../utils/icons";
import DeleteCompany from "../ModelList/Components/DeleteModel";
import EditCompany from "./Components/EditCompany";

const CompanyList = () => {
  const navigate = useNavigate();

  const { allBrandsDump } = useSelector(({ brands }) => brands);

  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedData, setEditedData] = useState({});

  useLayoutEffect(() => {
    getData(perPage, totalRows)
  }, [])

  const getData = () => {
    GetAllBrandList()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allBrands(resp))
        }
      })
      .catch((err) => toast.error("Something went wrong!"))
  }

  const handlePageChange = (page) => {
    setPerPage(page);
    // loadData();
  };

  const handlePerRowsChange = (rows) => {
    setTotalRows(rows);
    // loadData();
  };

  // const loadData = () => {
  //   GetAllBrandList({ totalRows, perPage });
  // };

  const columns = useMemo(
    () => [
      {
        name: "Name",
        selector: (row) => row?.name,
      },
      {
        name: "Logo",
        selector: (row) => row?.logo?.formats?.thumbnail?.url,
        cell: (row) => (
          <img
            src={baseURL + row?.logo?.formats?.thumbnail?.url}
            alt={row?.logo?.name}
            className="w-12 h-12 object-center object-contain"
          />
        ),
      },
      {
        name: "Added At",
        selector: (row) =>
          new Date(row?.publishedAt).toLocaleDateString("es-CL"),
      },
      {
        name: "Action",
        selector: (row) => row.action,
        cell: (row) => (
          <div className="flex justify-between gap-2">
            <span onClick={() => handleAction("edit", row)}>
              <EditMini />
            </span>
            <span onClick={() => handleAction("delete", row)}>
              <DeleteMini />
            </span>
          </div>
        ),
      },
    ],
    []
  );

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

  const handleSaveAction = () => {
    if (action === "edit") {
      const formData = new FormData();
      const _url = selectedRow?.url;
      if (editedData?.logo) {
        formData.append("files.logo", editedData?.logo, editedData?.logo?.name);
      }
      formData.append(
        "data",
        JSON.stringify({ name: editedData.name, logo: selectedRow?.logo })
      );
      UpdateCompany({ id: selectedRow.id, value: formData })
        .then((resp) => {
          setOpen(false);
          toast.success("Company updated successfully!");
        })
        .catch((err) => toast.error("something went wrong"))
        .finally(() => {
          // GetAllBrandList({ totalRows, perPage });
          GetAllBrandList();
        });
    } else {
      DeleteSelectedCompany({ id: selectedRow.id })
        .then((resp) => {
          setOpen(false);
          toast.success("Company deleted successfully!");
        })
        .catch((err) => toast.error("something went wrong"))
        .finally(() => {
          // GetAllBrandList({ totalRows, perPage });
          GetAllBrandList();
        });
    }
  };

  return (
    <>
      {open ? (
        <Modal
          open={open}
          setOpen={setOpen}
          title={action === "edit" ? "Edit Company" : "Delete Company"}
          children={
            action === "edit" ? (
              <EditCompany data={selectedRow} setEditedData={setEditedData} />
            ) : (
              <DeleteCompany data={{ name: selectedRow.name }} />
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
                Company List
              </p>

              <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-company")}
                >
                  Add Company
                </button>
              </div>
            </div>
          </div>

          <Filters />
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="shadow-md px-3 my-3">
              <Table
                columns={columns}
                data={allBrandList?.data}
                paginationData={allBrandList?.meta}
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

export default CompanyList;
