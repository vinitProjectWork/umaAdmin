import { useForm } from "react-hook-form"

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const createUser = (data) => {
    console.log(data)
  }
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Add User
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(createUser)}
          className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto"
        >
          <div className="sm:col-span-2">
            <label
              htmlFor="full-name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Full Name
            </label>
            <input
              name="full-name"
              placeholder="Enter full name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 font-normal text-sm">
                Full name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Shop Name
            </label>
            <input
              name="company"
              placeholder="Enter shop name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("shop_name", { required: true })}
            />
            {errors.shop_name && (
              <p className="text-red-500 font-normal text-sm">
                Shop name is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="mobile_number"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Enter mobile number"
              name="mobile_number"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("mobile_number", { required: true, pattern: /\d+/ })}
            />
            {errors.mobile_number && (
              <p className="text-red-500 font-normal text-sm">
                Mobile number is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address_line_1"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Address Line 1
            </label>
            <input
              name="address_line_1"
              type="text"
              placeholder="Enter address line 1"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("address_line_1", {
                required: true
              })}
            />
            {errors.address_line_1 && (
              <p className="text-red-500 font-normal text-sm">
                Address line 1 is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address_line_2"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Address Line 2
            </label>
            <input
              name="address_line_2"
              type="text"
              placeholder="Enter address line 2"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("address_line_2", {
                required: true
              })}
            />
            {errors.address_line_2 && (
              <p className="text-red-500 font-normal text-sm">
                Address line 2 is required
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              City/District
            </label>
            <input
              name="city"
              type="text"
              placeholder="Enter city/district"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("city", {
                required: true
              })}
            />
            {errors.city && (
              <p className="text-red-500 font-normal text-sm">
                City/District is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              State
            </label>
            <input
              name="state"
              type="text"
              placeholder="Enter state"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("state", {
                required: true
              })}
            />
            {errors.state && (
              <p className="text-red-500 font-normal text-sm">
                State is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Pincode
            </label>
            <input
              name="pincode"
              type="text"
              placeholder="Enter pincode"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("pincode", {
                required: true
              })}
            />
            {errors.pincode && (
              <p className="text-red-500 font-normal text-sm">
                Pincode is required
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="gstin"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Gst Number
            </label>
            <input
              name="gstin"
              type="text"
              placeholder="Enter GST number"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              {...register("gstin", {
                required: true
              })}
            />
            {errors.gstin && (
              <p className="text-red-500 font-normal text-sm">
                GST number is required
              </p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="submit"
              onClick={() => handleSubmit(createUser)}
              className={`inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3`}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
