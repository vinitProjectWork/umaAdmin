// import jsPDF from "jspdf";
import React, { Fragment, useEffect, useState } from "react";
import { GetOrdersWithUser } from "../../../services";

const ref = React.createRef();

const InvoiceJSPDF = ({ buttonRef, setSelectedRowId, selectedRowId }) => {

  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    getInvoiceData();
  }, [selectedRowId]);


  // const elementHandler = {
  //   '#ignorePDF': function (element, renderer) {
  //     return true;
  //   }
  // };
  useEffect(() => {
    if (invoiceData) {
      const source = document.getElementById(invoiceData?.id)
      // const doc = new jsPDF();
      // doc.addHTML(
      //   source,
      //   15,
      //   { 'width': '100%', 'elementHandlers': elementHandler },);

      html2pdf(source)
      // doc.save(invoiceData?.id + ".pdf");
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
    <div ref={ref} className="w-full text-xs" id={invoiceData?.id}>
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
        <div className="p-4 w-full">
          <table className="border w-full border-slate-900">
            <thead className="border border-slate-900 text-xs h-1">
              <tr>
                <th className="border border-slate-900">Item</th>
                <th className="border border-slate-900">Unit</th>
                <th className="border border-slate-900">Price/Qty</th>
                <th className="border border-slate-900">Remaining Qty</th>
                {/* <th className="border border-slate-900">Total</th> */}
              </tr>
            </thead>
            <tbody>
              {invoiceData?.orderDetails &&
                [...JSON.parse(invoiceData?.orderDetails)].map(
                  (item, index) => {
                    return (
                      <Fragment key={index}>
                        <tr className="text-center w-full">
                          <td className="font-medium text-left text-base" colSpan={3}>{item.label}</td>
                        </tr>
                        {item.model.map((subItem, subIndex) => {
                          // const _UnitPrice = parseFloat(
                          //   ((subItem.price ?? item.productPrice) * 100) / 118
                          // ).toFixed(2);
                          // const _ModelTotalPrice = parseFloat(
                          //   subItem.addQty * _UnitPrice
                          // ).toFixed(2);
                          // total += parseFloat(_ModelTotalPrice);
                          return (
                            <tr key={subIndex}>
                              <td className="border border-slate-900 pl-4">
                                {subItem.label}
                              </td>
                              <td className="border border-slate-900 text-right pr-4">
                                {subItem.addQty}
                              </td>
                             <td className="border border-slate-900 text-right pr-4">
                                {/* {_UnitPrice} */}
                                {subItem.price ?? item.productPrice}
                              </td>
                              <td className="border border-slate-900 text-right pr-4">

                              </td>
                              {/* <td className="border border-slate-900 text-right pr-4">
                                {_ModelTotalPrice}
                              </td> */}
                            </tr>
                          );
                        })}
                      </Fragment>
                    );
                  }
                )}
              {/* <tr className="text-right row-span-6 w-full">
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
              </tr> */}
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};
export default InvoiceJSPDF;
