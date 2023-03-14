import React, { useEffect, useMemo } from "react";
import Filters from "../../components/Filters/Filters";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import { approveUser, blockUser, getUserDetails } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { allUsersDump } from "../../redux/slices/users/users";
import { toast } from "react-toastify";
import { ApproveIconMini, BlockIcon } from "../../utils/icons";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

const BlockUser = ({ data }) => {
  const { shop_name } = data;
  return (
    <div className="font-medium text-red-500">{`Are you sure you want to block ${shop_name}?`}</div>
  );
};

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allUsers } = useSelector(({ users }) => users);

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    getUserDetails()
      .then((resp) => {
        dispatch(allUsersDump(resp));
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const columns = useMemo(
    () => [
      {
        name: "Shop Name",
        selector: (row) => row.shop_name,
        sortable: true,
        grow: 1.5,
        wrap: true,
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
        grow: 1.5,
        wrap: true,
      },
      {
        name: "Mobile",
        selector: (row) => row.username,
        sortable: true,
        grow: 1,
        wrap: true,
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
        grow: 1.5,
        wrap: true,
      },
      {
        name: "Shop Act",
        selector: (row) => row.shop_act,
        cell: (row) => <span>{row.shop_act ? row.shop_act : "N/A"}</span>,
        sortable: true,
        grow: 1.5,
        wrap: true,
      },
      {
        name: "Blocked",
        selector: (row) => row.blocked,
        grow: 0,
        center: true,
        cell: (row) => (
          <span
            className={`font-medium p-1 rounded-md ${
              row.blocked
                ? "text-white border-2 bg-red-600 border-red-500 shadow-red-500 cursor-pointer"
                : "text-green-600 shadow-green-800 cursor-pointer"
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
            className={`font-medium p-1 rounded-md ${
              row.blocked
                ? "text-white border-2 bg-red-600 border-red-500 shadow-red-500 cursor-pointer"
                : "text-green-600 shadow-green-800 cursor-pointer"
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
            <div className="tooltip">
              <button
                className="cursor-pointer text-green-800"
                onClick={() => handleApproveUser(row.id)}
              >
                <ApproveIconMini />
              </button>
              <span className="tooltiptext">Approve User</span>
            </div>
            <div className="tooltip">
              <button
                className="cursor-pointer text-green-800"
                onClick={() => handleBlockUser(row)}
              >
                <BlockIcon />
              </button>
              <span className="tooltiptext">Block User</span>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const handleApproveUser = (userId) => {
    approveUser(userId)
      .then((resp) => toast.success(resp.message))
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        getUserData();
      });
  };

  const handleBlockUser = (user) => {
    setIsOpen(true);
    setUser(user);
  };

  const handleSaveAction = () => {
    blockUser(user.id)
      .then((resp) => toast.success(resp.message))
      .catch((error) => toast.error("Something went wrong"))
      .finally(() => {
        getUserData();
        setIsOpen(false);
        setUser(null);
      });
  };

  // const handleDeleteUser = () => {};

  // const handleEditUser = (row) => {
  //   navigate("/edit-user", { state: { ...row } });
  // };

  return (
    <>
      {isOpen ? (
        <Modal
          open={isOpen}
          setOpen={setIsOpen}
          title={"Block User"}
          children={<BlockUser data={user} />}
          button={
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-indigo-500 px-4 py-2 text-base font-medium text-gray-100 outline-none shadow-sm hover:bg-indigo-600 duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleSaveAction()}
            >
              {"Block"}
            </button>
          }
        />
      ) : null}
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
