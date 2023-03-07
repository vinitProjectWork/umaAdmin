import React, { useCallback, useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import {
  GetAllOrders,
  ModifyOrderStatus,
} from "../../services";
import { toast } from "react-toastify";
import Tabs from "../../components/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { allOrdersDump } from "../../redux/slices/orders/orders";
import Label from "./Component/Label";
import PPS from "./Component/PPS";
import { DownloadTag, InvoiceDocument, PackingSlip } from "../../utils/icons";
import Invoice from "./Component/Invoice";

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

  useEffect(() => {
    fileterOrders();
  }, [selectedTab]);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Details",
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
      cell: (row) => <div className="flex gap-2 w-full">
        <div className="tooltip">
          <button className="border-2 border-green-500 p-1 font-medium"
            onClick={() => setSelectedRowId(row.id)}>
            <PackingSlip />
          </button>
          <span className="tooltiptext">Print Packing Slip</span>
        </div>
        <div className="tooltip">
          <button className="border-2 border-green-500 p-1 font-medium"
            onClick={() => setSelectedRowIdInvoice(row.id)}>
            <InvoiceDocument />
          </button>
          <span className="tooltiptext">Invoice</span>
        </div>
        <div className="tooltip">
          <button className="border-2 border-green-500 p-1 font-medium"
            onClick={() => setSelectedRowIdLabel(row.id)}>
            <DownloadTag />
          </button>
          <span className="tooltiptext">Label</span>
        </div>
      </div>
    }
  ];

  const format_OrderDetails = (row) => {
    const _parsedData = JSON.parse(row?.orderDetails);
    return (
      <div className="flex flex-col gap-1 p-1">
        <img src={_parsedData?.image} className="w-8 h-8 border-2" />
        <p className="text-xs">{_parsedData?.label}</p>
        <p>Per pcs price:{_parsedData?.productPrice}</p>
      </div>
    );
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
      {selectedRowId !== null && (
        <PPS
          buttonRef={buttonRef}
          setSelectedRowId={setSelectedRowId}
          selectedRowId={selectedRowId}
        />
      )}
      {selectedRowIdLabel !== null && (
        <Label
          buttonRef={buttonRefLabel}
          setSelectedRowId={setSelectedRowIdLabel}
          selectedRowId={selectedRowIdLabel}
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
