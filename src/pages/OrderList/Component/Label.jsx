// import jsPDF from "jspdf";
import React, { Fragment, useEffect, useState } from "react";
import Barcode from "react-barcode";
import { GetOrdersWithUser } from "../../../services";

const ref = React.createRef();

const PPS = ({ buttonRef, setSelectedRowId, selectedRowId }) => {

  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    getInvoiceData();
  }, [selectedRowId]);

  useEffect(() => {
    if (invoiceData) {
      var opt = {
        jsPDF: { unit: 'in', format: 'A6', orientation: 'portrait', userUnit: 300 },
        filename: 'AWB-' + invoiceData?.id + '.pdf',
      };
      const source = document.getElementById(invoiceData?.id)
      html2pdf(source, opt)
      // setSelectedRowId(null)
    }
  }, [invoiceData]);

  const getInvoiceData = async () => {
    const _data = await GetOrdersWithUser(selectedRowId);
    if (_data?.data) {
      setInvoiceData(_data?.data);
    }
  };


  var total = 0;
  return (
    <div ref={ref} className="w-full p-8 text-sm font-arial" id={invoiceData?.id}>
      <Fragment>
        <div className="flex justify-center w-full">
          <p>Welcome to Uma Enterprise</p>
        </div>
        <div className="flex justify-center h-36">
          <Barcode value="AWB322746384740" />
        </div>
        <div className="flex justify-between w-full py-2 my-2 border-y-2">
          <div className="font-bold text-mediumSmall">
            <p>Order Id: 2023030600001{invoiceData?.id}</p>
            <p>Ship Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex flex-col justify-center w-1/2 text-center">
            <div className="p-2 font-bold border-2 border-slate-700 text-mediumSmall">
              COD <br />
              Amount To Collect : 50000
            </div>
          </div>

        </div>
        <div className="w-full mt-4 text-xs text-left">
          <p className="font-medium">Ship To:</p>
          <p>
            <span>{invoiceData?.users_permissions_user?.shop_name}</span> - 
            <span>{invoiceData?.users_permissions_user?.username}</span>
          </p>
          <p>
            {invoiceData?.users_permissions_user?.address1},<br />
            {invoiceData?.users_permissions_user?.address2},<br />
            {invoiceData?.users_permissions_user?.city},&nbsp;
            {invoiceData?.users_permissions_user?.states} - &nbsp;
            {invoiceData?.users_permissions_user?.zipcode}
          </p>
        </div>
        
        <div className="w-full pt-2 mt-4 text-xs text-right border-t-2">
          <p className="font-medium">Ship From:</p>
          <p>
            Uma Enterprise - 6354666868<br />
            Shivam Industrial Zone-3, Kalawad Road,<br />
            Opposite Sopan Hardware, Chhapara, Rajkot<br />
            Gujarat - 360021.
          </p>
        </div>
      </Fragment>
    </div>
  );
};
export default PPS;
