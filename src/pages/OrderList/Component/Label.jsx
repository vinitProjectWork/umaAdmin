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
      setSelectedRowId(null)
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
    <div ref={ref} className="w-full p-8 text-sm" id={invoiceData?.id}>
      <Fragment>
        <div className="w-full flex justify-center">
          <p>Welcome to Uma Enterprise</p>
        </div>
        <div className="flex justify-center h-36">
          <Barcode value="AWB322746384740" />
        </div>
        <div className="flex w-full border-y-2 py-2 my-2 justify-between">
          <div className="text-mediumSmall font-bold">
            <p>Order Id: 2023030600001{invoiceData?.id}</p>
            <p>Ship Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex w-1/2 flex-col justify-center text-center">
            <div className="border-2 border-slate-700 p-2 font-bold text-mediumSmall">
              COD <br />
              Amount To Collect : 50000
            </div>
          </div>

        </div>
        <div className="w-full text-left mt-4 text-xs">
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
        
        <div className="w-full text-right mt-4 border-t-2 pt-2 text-xs">
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
