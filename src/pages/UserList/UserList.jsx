import React, { useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import Filters from "../../components/Filters/Filters";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { approveUser, blockUser, getUserDetails } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { allUsersDump } from "../../redux/slices/users/users";
import { toast } from "react-toastify";
import {
  ApproveIconMini,
  BlockIcon,
  DeleteMini,
  EditMini,
} from "../../utils/icons";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allUsers } = useSelector(({ users }) => users);

  console.log("==>", allUsers);

  useEffect(() => {
    getUserDetails()
      .then((resp) => {
        dispatch(allUsersDump(resp));
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "Shop Name",
        selector: (row) => row.shop_name,
        sortable: true,
        grow: 1,
        cell: (row) => (
          <span className="font-medium">
            {row.shop_name !== "" ? row.shop_name : "N/A"}
          </span>
        ),
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        grow: 1,
        wrap: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.username,
        sortable: true,
        grow: 1,
      },
      {
        name: "Address",
        selector: (row) => row.address_1,
        sortable: true,
        wrap: true,
        grow: 2,
        cell: (row) => (
          <span>
            {row.address1 !== "" &&
            row.address2 !== "" &&
            row.city !== "" &&
            row.states !== "" &&
            row.zipcode !== ""
              ? `${row.address1},
                  ${row.address2},
                  ${row.city},
                  ${row.states},
                  ${row.zipcode}`
              : "N/A"}
          </span>
        ),
      },
      {
        name: "GST Number",
        selector: (row) => row.gstin,
        cell: (row) => <span>{row.gstin ? row.gstin : "N/A"}</span>,
        sortable: true,
        grow: 1,
        wrap: true,
      },
      {
        name: "Shop Act",
        selector: (row) => row.shop_act,
        cell: (row) => <span>{row.shop_act ? row.shop_act : "N/A"}</span>,
        sortable: true,
        grow: 1,
        wrap: true,
      },
      {
        name: "Blocked",
        selector: (row) => row.blocked,
        grow: 0,
        center: true,
        cell: (row) => (
          <span
            className={`border-2 font-medium p-1 shadow-md rounded-md ${
              row.blocked
                ? "text-white bg-red-600 border-red-500 cursor-pointer"
                : "text-white bg-green-600 border-green-600 cursor-pointer"
            }`}
          >
            {row.blocked ? "Yes" : "No"}
          </span>
        ),
        sortable: true,
      },
      {
        name: "Confirmed",
        selector: (row) => row.confirmed,
        grow: 1,
        center: true,
        cell: (row) => (
          <span
            className={`border-2 font-medium p-1 rounded-md shadow-md ${
              row.confirmed
                ? "text-white border-green-600 bg-green-600 cursor-pointer"
                : "text-red-500 border-red-500 cursor-pointer"
            }`}
          >
            {row.confirmed ? "Yes" : "No"}
          </span>
        ),
        sortable: true,
      },
      {
        name: "Action",
        grow: 1,
        center: true,
        cell: (row) => (
          <div className="flex gap-2 items-center">
            {/* <p className="cursor-pointer" onClick={() => handleEditUser(row)}>
              <EditMini />
            </p>
            <p
              className="cursor-pointer text-red-600"
              onClick={() => handleDeleteUser(row.id)}
            >
              <DeleteMini />
            </p> */}
            <p
              className="cursor-pointer text-green-800"
              onClick={() => handleApproveUser(row.id)}
            >
              <ApproveIconMini />
            </p>
            <p
              className="cursor-pointer text-green-800"
              onClick={() => handleBlockUser(row.id)}
            >
              <BlockIcon />
            </p>
          </div>
        ),
      },
    ],
    []
  );

  const handleApproveUser = (userId) => {
    approveUser(userId)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  const handleBlockUser = (userId) => {
    blockUser(userId)
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = () => {};

  const handleEditUser = (row) => {
    navigate("/edit-user", { state: { ...row } });
  };

  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                User List
              </p>

              {/* <div className="float-right mb-5">
                <button
                  className="ring-1 ring-black ring-opacity-5 rounded-md px-2 py-2 shadow-sm text-sm font-medium"
                  onClick={() => navigate("/add-user")}
                >
                  Add User
                </button>
              </div> */}
            </div>
          </div>

          <Filters />

          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="shadow-md px-3 my-3">
              <Table columns={columns} data={allUsers} />
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
  );
};

export default UserList;
