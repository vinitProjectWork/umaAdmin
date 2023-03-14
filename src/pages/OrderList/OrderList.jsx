import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../../components/Table/Table";
import { GetAllOrders, ModifyOrderStatus } from "../../services";
import { toast } from "react-toastify";
import Tabs from "../../components/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersDump } from "../../redux/slices/orders/orders";
import Label from "./Component/Label";
import PPS from "./Component/PPS";
import { DownloadTag, InvoiceDocument, PackingSlip } from "../../utils/icons";
import Invoice from "./Component/Invoice";
import Modal from "../../components/Modal/Modal";

const FormatLabel = ({ setLableObj, labelObj }) => {
  const handleChange = (inputVal, e) => {
    const { name } = e.target;
    setLableObj((state) => {
      return {
        ...state,
        [name]: inputVal,
      };
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="-space-y-px rounded-md shadow-sm">
        <label htmlFor="weight" className="font-semibold">
          Weight
        </label>
        <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <input
            id="weight"
            name="weight"
            type="text"
            autoComplete="new-password"
            inputMode="numeric"
            value={labelObj?.weight}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, "");
              handleChange(inputVal, e);
            }}
            placeholder="Enter weight"
            className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="-space-y-px rounded-md shadow-sm">
        <label htmlFor="height" className="font-semibold">
          Height
        </label>
        <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <input
            id="height"
            name="height"
            type="text"
            autoComplete="new-password"
            inputMode="numeric"
            value={labelObj?.height}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, "");
              handleChange(inputVal, e);
            }}
            placeholder="Enter height"
            className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="-space-y-px rounded-md shadow-sm">
        <label htmlFor="length" className="font-semibold">
          Length
        </label>
        <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <input
            id="length"
            name="length"
            type="text"
            autoComplete="new-password"
            inputMode="numeric"
            value={labelObj?.length}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, "");
              handleChange(inputVal, e);
            }}
            placeholder="Enter length"
            className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="-space-y-px rounded-md shadow-sm">
        <label htmlFor="width" className="font-semibold">
          Width
        </label>
        <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <input
            id="width"
            name="width"
            type="text"
            autoComplete="new-password"
            inputMode="numeric"
            value={labelObj?.width}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, "");
              handleChange(inputVal, e);
            }}
            placeholder="Enter width"
            className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="-space-y-px rounded-md shadow-sm">
        <label htmlFor="pices" className="font-semibold">
          Pices (boxes)
        </label>
        <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <input
            id="pices"
            name="pices"
            type="text"
            autoComplete="new-password"
            inputMode="numeric"
            value={labelObj?.pices}
            onChange={(e) => {
              const inputVal = e.target.value.replace(/\D/g, "");
              handleChange(inputVal, e);
            }}
            placeholder="Enter pices"
            className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

const OrderList = () => {
  const buttonRef = React.createRef();
  const buttonRefLabel = React.createRef();

  const dispatch = useDispatch();
  const { allOrders } = useSelector(({ orders }) => orders);

  const [tabsName, setTabsName] = useState([
    "cart",
    "Pending",
    "Placed",
    "Confirmed",
    "InProgress",
  ]);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowIdLabel, setSelectedRowIdLabel] = useState(null);
  const [selectedRowIdInvoice, setSelectedRowIdInvoice] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [printLable, setPrintLable] = useState(false);
  const [labelObj, setLableObj] = useState({
    weight: "",
    height: "",
    length: "",
    pices: "",
    width: "",
  });

  useEffect(() => {
    fileterOrders();
  }, [selectedTab]);

  const columns = useMemo(
    () => [
      {
        name: "Id",
        grow: 0,
        selector: (row) => row.id,
      },
      {
        name: "Details",
        grow: 1,
        selector: (row) => row.orderDetails,
        cell: (row) => format_OrderDetails(row),
      },
      {
        name: "Product Price",
        selector: (row) => row.productAmount,
      },
      {
        name: "Order Price",
        selector: (row) => row.orderAmount,
      },
      {
        name: "Delivery Price",
        selector: (row) => row.deliveryCharges,
      },
      {
        name: "Action",
        cell: (row) => (
          <div>
            <select
              className="border-2 rounded-md shadow-sm border-indigo-500 p-1"
              onChange={(e) => handleStatusChange(e.target.value, row.id)}
              value={selectedTab}
            >
              <option value="cart">cart</option>
              <option value="Pending">Pending</option>
              <option value="Placed">Placed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="InProgress">InProgress</option>
            </select>
          </div>
        ),
      },
      {
        name: "Label",
        cell: (row) => (
          <div className="flex gap-2 w-full">
            <div className="tooltip">
              <button
                className="border-2 border-green-500 font-medium"
                onClick={() => setSelectedRowId(row.id)}
              >
                <PackingSlip />
              </button>
              <span className="tooltiptext">Print Packing Slip</span>
            </div>
            <div className="tooltip">
              <button
                className="border-2 border-green-500 font-medium"
                onClick={() => setSelectedRowIdInvoice(row.id)}
              >
                <InvoiceDocument />
              </button>
              <span className="tooltiptext">Invoice</span>
            </div>
            <div className="tooltip">
              <button
                className="border-2 border-green-500 font-medium"
                onClick={() => handleLableClick(row.id)}
              >
                <DownloadTag />
              </button>
              <span className="tooltiptext">Label</span>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const format_OrderDetails = (row) => {
    const _parsedData = JSON.parse(row?.orderDetails);
    return (
      <div className="flex flex-col gap-1 p-1">
        <p className="text-xs font-medium">{_parsedData[0]?.label}</p>
      </div>
    );
  };

  const handleLableClick = (id) => {
    setSelectedRowIdLabel(id);
    setIsOpen(true);
  };

  const handlePrintLabel = () => {
    setPrintLable(true);
  };

  const fileterOrders = useCallback(() => {
    GetAllOrders(selectedTab)
      .then((resp) => {
        dispatch(allOrdersDump(resp));
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [selectedTab]);

  const handleStatusChange = (status, id) => {
    const data = {
      id,
      status,
    };
    ModifyOrderStatus(data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isOpen ? (
        <Modal
          open={isOpen}
          setOpen={setIsOpen}
          title={"Configure Lable"}
          children={
            <FormatLabel setLableObj={setLableObj} labelObj={labelObj} />
          }
          button={
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-indigo-300 bg-indigo-500 px-4 py-2 text-base font-medium text-gray-100 outline-none shadow-sm hover:bg-indigo-600 duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handlePrintLabel()}
            >
              {"Print Label"}
            </button>
          }
        />
      ) : null}
      {selectedRowId !== null && (
        <PPS
          buttonRef={buttonRef}
          setSelectedRowId={setSelectedRowId}
          selectedRowId={selectedRowId}
        />
      )}
      {printLable && (
        <Label
          buttonRef={buttonRefLabel}
          setSelectedRowId={setSelectedRowIdLabel}
          selectedRowId={selectedRowIdLabel}
          labelObj={labelObj}
          setLableObj={setLableObj}
          setPrintLable={setPrintLable}
          setIsOpen={setIsOpen}
        />
      )}
      {selectedRowIdInvoice !== null && (
        <Invoice
          buttonRef={buttonRefLabel}
          setSelectedRowId={setSelectedRowIdInvoice}
          selectedRowId={selectedRowIdInvoice}
        />
      )}
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Order List
              </p>
            </div>
          </div>

          <div className="w-full mx-5">
            <Tabs
              tabsName={tabsName}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
            />
          </div>

          {/* <Filters /> */}
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="shadow-md px-3 my-3">
              <Table
                columns={columns}
                data={allOrders?.data}
                isSelectableRows={true}
              />
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

export default OrderList;
