import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../asset/images/logo.png";
import { LoginUser, RegisterUser } from "../../services";
import { EyeIcon } from "../../utils/Icons";

const Login = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    identifier: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisibility((old) => !old);
  };

  const handleSubmit = () => {
    setProcessing(true);
    setTimeout(() => {
      LoginUser({ userDetails })
        .then((resp) => {
          if (resp.flag) {
            toast.success("OTP sent successfully!");
            navigate("/verify-otp", {
              state: { mobileNumber: userDetails?.identifier },
            });
          }
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
      setProcessing(false);
    }, 1000);
  };

  return (
    <div className="flex items-center bg-gradient-to-r from-red-100 via-purple-100 to-pink-100 justify-center px-4 h-screen sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-lg p-11 rounded-md bg-slate-100">
        <div>
          <div
            className="flex justify-center lg:min-w-0 lg:flex-1"
            aria-label="Global"
          >
            <a
              href="/"
              className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
              aria-label="logo"
            >
              <img
                src={Logo}
                width="90"
                height="90"
                className="aspect-auto object-fit object-center"
              />
            </a>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex w-full justify-center flex-col items-center gap-3">
            <div className="text-3xl font-bold">Login</div>
          </div>

          <div className="-space-y-px rounded-md shadow-sm">
            <label htmlFor="mobile_number" className="font-semibold">
              Enter Mobile Number
            </label>
            <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <input
                id="mobile_number"
                name="mobile_number"
                type="text"
                autoComplete="new-password"
                inputMode="numeric"
                value={userDetails?.mobile_number}
                onChange={(e) =>
                  setUserDetails((state) => {
                    return {
                      ...state,
                      identifier: e.target.value.replace(/[^\d,]/g, ""),
                    };
                  })
                }
                placeholder="Enter mobile number"
                className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="-space-y-px rounded-md shadow-sm">
            <label htmlFor="password" className="font-semibold">
              Enter Password
            </label>
            <div className="relative flex justify-between gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <input
                id="password"
                name="password"
                type={passwordVisibility ? "text" : "password"}
                autoComplete="new-password"
                inputMode="numeric"
                value={userDetails?.pin}
                onChange={(e) =>
                  setUserDetails((state) => {
                    return {
                      ...state,
                      password: e.target.value,
                    };
                  })
                }
                placeholder="Enter Password"
                className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              <div
                onClick={() => toggleVisibility()}
                className="cursor-pointer"
              >
                <EyeIcon />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
            onClick={() => handleSubmit()}
          >
            {processing ? (
              <>
                <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
              </>
            ) : null}
            <div className="grid-2 my-auto -mx-1">
              {processing ? "Please wait..." : "Login"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
