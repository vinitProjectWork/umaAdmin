import { useForm } from "react-hook-form"

const PriceForm = ({ setData, data }) => {
  console.log(data)
  // createdAt: "2023-02-03T11:39:29.596Z"
  // description: "test"
  // details: null
  // discountedPrice: null
  // modelDetailUpdated: null
  // modelDetails: null
  // moq: null
  // name: "test"
  // originalPrice: null
  // publishedAt: "2023-02-03T11:39:29.589Z"
  // tax: null
  // updatedAt: "2023-02-03T11:39:29.596Z"
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <div className="bg-white py-6 mb-6">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="model_qty"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Total Modal Qty
          </label>
          <input
            type="number"
            name="model_qty"
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  model_qty: e.target.value
                }
              })
            }
            // {...register("model_qty", { required: true })}
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
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  model_moq: e.target.value
                }
              })
            }
            // {...register("model_moq", { required: true })}
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="moq"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Enter Product MOQ
          </label>
          <input
            type="number"
            name="moq"
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  moq: e.target.value
                }
              })
            }
            // {...register("moq", { required: true })}
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
            name="price"
            onWheel={(e) => e.target.blur()}
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  price: e.target.value
                }
              })
            }
            // {...register("price", { required: true })}
          />
          <div className="mt-2">
            <div className="flex flex-col gap-1">
              <p className="font-medium">GST: 18%</p>
              <p>
                <span className="font-medium">Total GST: </span>
                {`${data.price * 0.18}`}
              </p>
              <p>
                <span className="font-medium">Price without GST: </span>
                {`${data.price - data.price * 0.18}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceForm
