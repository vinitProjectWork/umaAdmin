import React, { Fragment, useEffect, useState } from "react";
import Pdf from "react-to-pdf";
import { GetOrdersWithUser } from "../../../services";

const ref = React.createRef();

const Invoice = ({ buttonRef, setSelectedRowId, selectedRowId }) => {
  const options = {
    unit: "in",
    format: [8, 11]
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
          targetRef={ref}
          filename={`Invoice ${invoiceData?.id}.pdf`}
          onComplete={() => setSelectedRowId(null)}
          options={options}
        >
          {({ toPdf }) => (
            <button ref={buttonRef} onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
        <div ref={ref} className="w-1/2">
          <Fragment>
            <div className="w-full flex justify-evenly mt-4">
              <p>{new Date().toLocaleDateString()}</p>
              <p>Welcome to Uma Enterprise</p>
              <p></p>
            </div>
            <div className="w-full text-center mt-4">
              <p>OrderId: {invoiceData?.id}</p>
              <p>
                <span>{invoiceData?.users_permissions_user?.shop_name}</span> -
                <span>{invoiceData?.users_permissions_user?.username}</span>
              </p>
              <p className="text-xs">
                {invoiceData?.users_permissions_user?.address1},<br />
                {invoiceData?.users_permissions_user?.address2},<br />
                {invoiceData?.users_permissions_user?.city},
                {invoiceData?.users_permissions_user?.states} -
                {invoiceData?.users_permissions_user?.zipcode}
              </p>
            </div>
            <div className="mt-4 m-10">
              <table className="w-full border border-slate-900">
                <tr className="border border-slate-900">
                  <th className="border border-slate-900">Item</th>
                  <th className="border border-slate-900">Unit</th>
                  <th className="border border-slate-900">Price/Qty</th>
                  <th className="border border-slate-900">Total</th>
                </tr>
                {invoiceData?.orderDetails &&
                  [...JSON.parse(invoiceData?.orderDetails)].map(
                    (item, index) => {
                      return (
                        <Fragment key={index}>
                          <tr className="text-center row-span-6 w-full">
                            <td className="font-medium">{item.label}</td>
                          </tr>
                          {item.model.map((subItem, subIndex) => {
                            const _UnitPrice = parseFloat(
                              ((subItem.price ?? item.productPrice) * 100) / 118
                            ).toFixed(2);
                            const _ModelTotalPrice = parseFloat(
                              subItem.addQty * _UnitPrice
                            ).toFixed(2);
                            total += parseFloat(_ModelTotalPrice);
                            return (
                              <tr key={subIndex}>
                                <td className="border border-slate-900 pl-4">
                                  {subItem.label}
                                </td>
                                <td className="border border-slate-900 text-right pr-4">
                                  {subItem.addQty}
                                </td>
                                <td className="border border-slate-900 text-right pr-4">
                                  {_UnitPrice}
                                </td>
                                <td className="border border-slate-900 text-right pr-4">
                                  {_ModelTotalPrice}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      );
                    }
                  )}
                <tr className="text-right row-span-6 w-full">
                  <td
                    className="font-medium border border-slate-900 pr-4"
                    colSpan={3}
                  >
                    Total
                  </td>
                  <td className="font-medium border border-slate-900 pr-4">
                    {total}
                  </td>
                </tr>
                <tr className="text-right row-span-6 w-full">
                  <td
                    className="font-medium border border-slate-900 pr-4"
                    colSpan={3}
                  >
                    Total GST (CGST+SGST)
                  </td>
                  <td className="font-medium border border-slate-900 pr-4">
                    {parseFloat(total * 0.18).toFixed(2)}
                  </td>
                </tr>
                <tr className="text-right row-span-6 w-full">
                  <td
                    className="font-medium border border-slate-900 pr-4"
                    colSpan={3}
                  >
                    Delivery Charges
                  </td>
                  <td className="font-medium border border-slate-900 pr-4">
                    {parseFloat(invoiceData?.deliveryCharges).toFixed(2)}
                  </td>
                </tr>
                <tr className="text-right row-span-6 w-full">
                  <td
                    className="font-medium border border-slate-900 pr-4"
                    colSpan={3}
                  >
                    Grand Total
                  </td>
                  <td className="font-medium border border-slate-900 pr-4">
                    {parseFloat(invoiceData?.orderAmount).toFixed(2)}
                  </td>
                </tr>
              </table>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};
export default Invoice;
