// import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { GetOrdersWithUser } from "../../../services";
import _ from 'lodash';
import Sign from "../../../asset/images/sign.jpeg";

const ref = React.createRef();

const Invoice = ({ buttonRef, setSelectedRowId, selectedRowId }) => {

  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getInvoiceData();
  }, [selectedRowId]);

  useEffect(() => {
    if (invoiceData) {
      var opt = {
        jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
        filename: 'INVOICE-' + invoiceId + '.pdf',
      };
      const source = document.getElementById(invoiceId)
      html2pdf(source, opt)
      setSelectedRowId(null)
    }
  }, [invoiceData]);

  const getInvoiceData = async () => {
    const _data = await GetOrdersWithUser(selectedRowId);
    if (_data?.data) {
      setInvoiceId(_data?.data.id)
      setData({
        user: _data?.data?.users_permissions_user,
        deliveryCharges: _data?.data?.deliveryCharges,
        orderAmount: _data?.data?.orderAmount,
        productAmount: _data?.data?.productAmount,
        createdAt: _data?.data?.createdAt
      })
      const formatedModalData = []
      JSON.parse(_data?.data.orderDetails).map((item, index) => {
        item.model.map(subItem => {
          formatedModalData.push({
            hsnSAC: item?.hsnSAC,
            invoiceProductName: item?.invoiceProductName,
            price: item?.productPrice + "",
            ...subItem
          });
        })
      })

      const grouppedModelData = _.groupBy(formatedModalData, (item) => {
        return [item['hsnSAC'], item['price']];
      });

      const finalData = []
      Object.keys(grouppedModelData).map((item) => {
        const data = {
          qty: 0
        }
        grouppedModelData[item].map((subItem, subIndex) => {
          if (subIndex === 0) {
            data.hsnSAC = subItem.hsnSAC
            data.invoiceProductName = subItem.invoiceProductName
            data.price = subItem.price
          }
          data.qty += parseInt(subItem.addQty);
        })
        finalData.push(data)
      })
      setInvoiceData(finalData);
    }
  };


  const withOutGSTDeliveryCharges = parseFloat((parseFloat(data?.deliveryCharges) * 100) / 118).toFixed(2)
  var total = withOutGSTDeliveryCharges;
  return (
    <div ref={ref} className="w-fullborder-2 border-slate-700 text-sm px-8 py-8" id={invoiceId}>
      <div>
        <div className="w-full flex justify-center bg-slate-300 text-lg">
          <p>UMA ENTERPRISE</p>
        </div>
        <div className="flex justify-center text-center text-extraSmall">
          SR NO 223,224,225, PLOT NO 13,14/3, SHIVAM IND ZONE 3,<br />
          CHHAPARA, LODHIKA, Rajkot, Gujarat, 360021.<br />
          GSTIN :24AEVPV2976D1ZW
        </div>
        <div className="flex w-full justify-center mt-1 border-t-2 text-base border-slate-700 ">
          <p>TAX INVOICE</p>
        </div>
        <div className="flex w-full justify-center text-sm">
          <div className="w-3/5 flex flex-row border-2 p-2 border-l-0 pb-1 border-slate-700 ">
            <div>M/S :&nbsp;</div>
            <div>{data?.user?.shop_name},<br />
              {data?.user?.address1},<br />
              {data?.user?.address2},<br />
              {data?.user?.city}, {data?.user?.states}, {data?.user?.zipcode}<br />
              {
                data?.user?.gstin ? <p className="font-bold">GSTIN : {data?.user?.gstin} <br /> </p> : null
              }
              {
                data?.user?.shop_act ? <p className="font-bold">Shop ACT : {data?.user?.shop_act} </p> : null
              }
            </div>
          </div>
          <div className="w-2/5 border-2 border-x-0 text-sm border-slate-700 ">
            <div className="bg-slate-300 w-full flex flex-wrap p-1">
              <p className="w-1/2">INVOICE NO.</p>
              <p className="w-1/2">: 20230305000001</p>
              <p className="w-1/2">DATE</p>
              <p className="w-1/2">: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="w-full flex flex-wrap p-1">
              <p className="w-1/2">TRANSPORT</p>
              <p className="w-1/2">: </p>
              <p className="w-1/2">LR.NO.</p>
              <p className="w-1/2">: </p>
              <p className="w-1/2">CASES</p>
              <p className="w-1/2">: </p>
            </div>
          </div>
        </div>
        <table className="w-full h-96 border-t-1 mt-2 text-xs">
          <thead className="border h-1">
            <tr className="w-full">
              <th className="border border-b-0 border-r-0 border-slate-700 w-2 py-1 px-2">Sr.No.</th>
              <th className="border border-b-0 border-r-0 border-slate-700 w-64 py-1 px-2">Product Name</th>
              <th className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-1">HSN/SAC</th>
              <th className="border border-b-0 border-r-0 border-slate-700 w-8 py-1 px-2">Qty</th>
              <th className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-2">Rate</th>
              <th className="border border-b-0 border-r-0 border-slate-700 w-4 py-1 px-2">GST(%)</th>
              <th className="border border-b-0 border-slate-700 w-10 py-1 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              invoiceData && invoiceData.map((item, index) => {
                const withOutGSTPrice = parseFloat((parseFloat(item.price) * 100) / 118).toFixed(2);
                const withOutGSTTotalPrice = parseFloat(parseFloat(withOutGSTPrice) * parseFloat(item.qty)).toFixed(2);
                total = parseFloat(parseFloat(total) + parseFloat(withOutGSTTotalPrice)).toFixed(2);
                return <tr>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-2 py-1 px-2 text-center">{index + 1}</td>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-64  py-1 px-2">{item.invoiceProductName}</td>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-1 text-center">{item.hsnSAC}</td>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-8 py-1 px-2 text-right">{item.qty}</td>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-2 text-right">{withOutGSTPrice}</td>
                  <td className="border border-b-0 border-r-0 border-slate-700 w-4 py-1 px-2 text-right">18%</td>
                  <td className="border border-b-0 border-slate-700 w-10 py-1 px-2 text-right">{withOutGSTTotalPrice}</td>
                </tr>
              })
            }
            <tr>
              <td className="border border-b-0 border-r-0 border-slate-700 w-2 py-1 px-2 text-center">{invoiceData?.length + 1 ?? 1}</td>
              <td className="border border-b-0 border-r-0 border-slate-700 w-64  py-1 px-2">Delivery Charges</td>
              <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-1 text-center">-</td>
              <td className="border border-b-0 border-r-0 border-slate-700 w-8 py-1 px-2 text-right">-</td>
              <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-2 text-right">{withOutGSTDeliveryCharges}</td>
              <td className="border border-b-0 border-r-0 border-slate-700 w-4 py-1 px-2 text-right">18%</td>
              <td className="border border-b-0 border-slate-700 w-10 py-1 px-2 text-right">{withOutGSTDeliveryCharges}</td>
            </tr>
            {Array.from(Array((19 - (invoiceData?.length ?? 0))).keys()).map((item, index) => {
              return <tr>
                <td className="border border-b-0 border-r-0 border-slate-700 w-2 py-1 px-2 text-center">{index + 2 + invoiceData?.length}</td>
                <td className="border border-b-0 border-r-0 border-slate-700 w-64  py-1 px-2"></td>
                <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-1 text-center"></td>
                <td className="border border-b-0 border-r-0 border-slate-700 w-8 py-1 px-2 text-right"></td>
                <td className="border border-b-0 border-r-0 border-slate-700 w-16 py-1 px-2 text-right"></td>
                <td className="border border-b-0 border-r-0 border-slate-700 w-4 py-1 px-2 text-right"></td>
                <td className="border border-b-0 border-slate-700 w-10 py-1 px-2 text-right"></td>
              </tr>
            })}
            <tr className="w-full">
              <td className="font-medium border border-r-0 border-slate-700 text-left pl-2" colSpan={4}>
                <div>
                  <p className="text-lg">U&E</p>
                  <p className="text-md">www.umaenterpriseindia.com</p>
                  <p className="text-extraSmall">email: admin@umaenterpriseindia.com</p>
                </div>
                <div className="mt-4">
                  <p className="text-extraSmall font-bold">Terms & Condition:</p>
                  <p className="text-extraSmall">1. Goods once sold will not be taken back.</p>
                  <p className="text-extraSmall">2. Interest @18% p.a. will be charged if payment is not made within due date.</p>
                  <p className="text-extraSmall">3. Our risk and responsibility ceases as soon as the goods leave our premises.</p>
                  <p className="text-extraSmall">4. Subject to Rajkot- 30021 Jurisdiction only. E.&.O.E</p>
                </div>
              </td>
              <td className="font-medium border border-slate-700 text-left" colSpan={4}>
                <div className="flex justify-between border-slate-700 bg-slate-300 px-2 border-b-2">
                  <p>Sub Total</p>
                  <p>{parseFloat(total).toFixed(2)}</p>
                </div>
                <div className="flex justify-between px-2">
                  <p>Taxable Amount</p>
                  <p>{parseFloat(total).toFixed(2)}</p>
                </div>
                {(data?.user?.zipcode > 360000 && data?.user?.zipcode < 400000) ?  <><div className="flex justify-between px-2">
                    <p>CGST 9.00%</p>
                    <p>{parseFloat(total * 0.09).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between px-2">
                    <p>SGST 9.00%</p>
                      <p>{parseFloat(total * 0.09).toFixed(2)}</p>
                  </div></> : <>
                  <div className="flex justify-between px-2">
                    <p>IGST 18.00%</p>
                    <p>{parseFloat(total * 0.18).toFixed(2)}</p>
                  </div> </>}
                <div className="flex justify-between px-2 border-slate-700 bg-slate-300 border-y-2">
                  <p>Grand Total</p>
                  <p>{parseFloat(data?.orderAmount).toFixed(2)}</p>
                </div>
                <div className="px-2 text-extraSmall text-right">
                  For, Uma Enterprise
                  <img
                    src={Sign}
                    height="25"
                    className="aspect-auto object-fit object-center"
                  />
                  (Authorised Signatory)
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Invoice;
