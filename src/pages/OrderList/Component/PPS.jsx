// import jsPDF from "jspdf";
import React, { Fragment, useEffect, useState } from "react";
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
        margin: [10, 0, 10, 0],
        filename: 'PPS-' + invoiceData?.id + '.pdf',
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
    <div ref={ref} className="w-full text-xs px-2" id={invoiceData?.id}>
      <Fragment>
        <div className="w-full flex justify-evenly">
          <p>Welcome to Uma Enterprise</p>
        </div>
        <div className="w-full text-center mt-4 flex justify-around">
          <p>OrderId: {invoiceData?.id}</p>
          <p>
            <span>{invoiceData?.users_permissions_user?.shop_name}</span> -
            <span>{invoiceData?.users_permissions_user?.username}</span>
          </p>
          <p>
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="p-4 w-full">
          <table className="border w-full border-slate-700">
            <thead className="text-xs h-1">
              <tr>
                <th className="border border-b-0 border-r-0 border-slate-700">Item</th>
                <th className="border border-b-0 border-r-0 border-slate-700">Qty</th>
                <th className="border border-b-0 border-r-0 border-slate-700">Price/Qty</th>
                <th className="border border-b-0 border-r-0 border-slate-700">Remaining Qty</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData?.orderDetails &&
                [...JSON.parse(invoiceData?.orderDetails)].map(
                  (item, index) => {
                    return (
                      <Fragment key={index}>
                        {item.model.map((subItem, subIndex) => {
                          total += parseFloat(subItem.addQty);
                          return (
                            <tr key={subIndex} className="py-2">
                              <td className="border border-b-0 border-r-0 border-slate-700 pl-4 py-2">
                                {item.label} - <span className="font-bold">{subItem.label}</span>
                              </td>
                              <td className="border border-b-0 border-r-0 border-slate-700 text-right pr-4 py-2">
                                {subItem.addQty}
                              </td>
                              <td className="border border-b-0 border-r-0 border-slate-700 text-right pr-4 py-2">
                                {parseFloat(subItem.price ?? item.productPrice).toFixed(2)}
                              </td>
                              <td className="border border-b-0 border-r-0 border-slate-700 text-right pr-4 py-2">

                              </td>
                            </tr>
                          );
                        })}
                      </Fragment>
                    );
                  }
                )
              }
              <tr className="text-right w-full text-lg">
                <td className="font-medium border border-b-0 border-r-0 border-slate-700 text-center py-2">
                  Total Unit Qty
                </td>
                <td className="font-medium border border-b-0 border-r-0 border-slate-700 pr-4 py-2">
                  {total}
                </td>
                <td className="font-medium border border-b-0 border-r-0 border-slate-700 pr-4 py-2">

                </td>
                <td className="font-medium border border-b-0 border-r-0 border-slate-700 pr-4 py-2">

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};
export default PPS;
