const PriceForm = ({ setData, data }) => {
  return (
    <div className="bg-white py-6 mb-6">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="model_qty"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Qty
          </label>
          <input
            type="number"
            name="model_qty"
            value={data.model_qty}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  model_qty: e.target.value,
                };
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="model_moq"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Enter Model MOQ
          </label>
          <input
            type="number"
            name="model_moq"
            value={data.model_moq}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  model_moq: e.target.value,
                };
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="moq"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Total Listing MOQ
          </label>
          <input
            type="number"
            name="moq"
            value={data.moq}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  moq: e.target.value,
                };
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="price"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Enter Price
          </label>
          <input
            type="number"
            name="originalPrice"
            value={data.originalPrice}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  originalPrice: e.target.value,
                  discountedPrice: e.target.value,
                };
              })
            }
          />
          {data.originalPrice && (
            <div className="mt-2">
              <div className="flex flex-col gap-1">
                <p className="font-medium">GST: 18%</p>
                <p>
                  <span className="font-medium">Total GST: </span>
                  {`${parseFloat((data.originalPrice * 100) / 118).toFixed(2)}`}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="hsnSAC"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
           HSN/SAC
          </label>
          <input
            name="hsnSAC"
            value={data.hsnSAC}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  hsnSAC: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="invoiceProductName"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Invoice Product Name
          </label>
          <input
            name="invoiceProductName"
            value={data.invoiceProductName}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  invoiceProductName: e.target.value,
                };
              })
            }
          />
        </div>
        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="deliveryChargesOffline"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Delivery Charges Offline
          </label>
          <input
            type="number"
            name="deliveryChargesOffline"
            value={data.deliveryChargesOffline}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  deliveryChargesOffline: e.target.value,
                };
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="deliveryChargesOnline"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Delivery Charges Online
          </label>
          <input
            type="number"
            name="deliveryChargesOnline"
            value={data.deliveryChargesOnline}
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  deliveryChargesOnline: e.target.value,
                };
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PriceForm;
