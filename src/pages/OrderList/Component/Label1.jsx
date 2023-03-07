import React, { Fragment, useEffect, useState } from "react";
import Barcode from "react-barcode";
import Pdf from "react-to-pdf";
import { GetOrdersWithUser } from "../../../services";

const refLabel = React.createRef();

const Label = ({ buttonRef, setSelectedRowId, selectedRowId }) => {
  const options = {
    unit: "in",
    format: [4, 6],
  };

  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    getInvoiceData();
  }, [selectedRowId]);

  useEffect(() => {
    if (invoiceData) {
      buttonRef?.current?.click();
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
    <>
      <div
        className="App"
        style={{
          height: "0px",
          maxHeight: "0px",
          overflow: "hidden",
          minHeight: "0px",
        }}
      >
        <Pdf
          targetRef={refLabel}
          filename={`AWB322746384740.pdf`}
          onComplete={() => setSelectedRowId(null)}
          options={options}
        >
          {({ toPdf }) => (
            <button ref={buttonRef} onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
        <div ref={refLabel} className="w-1/4">
          <Fragment>
            <div className="w-full flex justify-evenly mt-4">
              <p>{new Date().toLocaleDateString()}</p>
              <p>Welcome to Uma Enterprise</p>
            </div>
            <div className="flex justify-center w-full">
              <Barcode value="AWB322746384740" />
            </div>
            <div className="w-full text-left mt-4 pl-5">
              <p className="font-medium">Ship To:</p>
              <p>OrderId: {invoiceData?.id}</p>
              <p>
                <span>{invoiceData?.users_permissions_user?.shop_name}</span> - 
                <span>{invoiceData?.users_permissions_user?.username}</span>
              </p>
              <p>
                {invoiceData?.users_permissions_user?.address1}, <br/> 
                {invoiceData?.users_permissions_user?.address2}, <br/>
                {invoiceData?.users_permissions_user?.city}, <br/>
                {invoiceData?.users_permissions_user?.states}, <br/>
                {invoiceData?.users_permissions_user?.zipcode}
              </p>
            </div>
            <div className="w-full text-right mt-4 pr-5">
              <p className="font-medium">Ship From:</p>
              <p>
                Uma Enterprise, <br />
                Shivam Industrial Zone-3, <br />
                Rajkot, Gujrat - 360021.
              </p>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};
export default Label;
