import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserDetails } from "../../services";

const AddUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (location.state) {
      setUserDetails({ ...location.state });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleEditUser = () => {
    updateUserDetails({ details: userDetails })
      .then((res) => {
        navigate("/user-list");
        toast.success("User details updated successfully!");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Edit User
          </h2>
        </div>

        <div className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
              value={userDetails.email}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="shop_name"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Shop Name
            </label>
            <input
              name="shop_name"
              value={userDetails.shop_name}
              type="text"
              placeholder="Enter shop name"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
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
              inputMode="numeric"
              value={userDetails.username}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="alternate_mobile_number"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Alternate Mobile Number
            </label>
            <input
              type="text"
              value={userDetails.alternate_mobile_number}
              placeholder="Enter alternate mobile number"
              name="alternate_mobile_number"
              inputMode="numeric"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address1"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Address Line 1
            </label>
            <input
              name="address1"
              type="text"
              value={userDetails.address1}
              placeholder="Enter address line 1"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address2"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Address Line 2
            </label>
            <input
              name="address2"
              type="text"
              value={userDetails.address2}
              placeholder="Enter address line 2"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
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
              value={userDetails.city}
              placeholder="Enter city/district"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="states"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              State
            </label>
            <input
              name="states"
              type="text"
              value={userDetails.states}
              placeholder="Enter state"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="zipcode"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Zipcode
            </label>
            <input
              name="zipcode"
              type="text"
              value={userDetails.zipcode}
              placeholder="Enter zipcode"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
            />
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
              value={userDetails.gstin}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="shop_act"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Shop Act
            </label>
            <input
              name="shop_act"
              type="text"
              placeholder="Enter shop act number"
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              onChange={(e) => handleChange(e)}
              value={userDetails.shop_act}
            />
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => handleEditUser()}
              className={`inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 cursor-pointer focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3`}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
