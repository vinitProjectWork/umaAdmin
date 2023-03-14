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
  const [errMessage, setErrMessage] = useState({
    identifier: "",
    password: "",
  });

  const toggleVisibility = () => {
    setPasswordVisibility((old) => !old);
  };

  const verifyForm = async () => {
    //for mobile number
    if (userDetails.identifier === "" || userDetails.identifier.length !== 10) {
      setErrMessage((state) => {
        return {
          ...state,
          identifier: "Please enter valid mobile number",
        };
      });
      return false;
    } else {
      setErrMessage((state) => {
        return {
          ...state,
          identifier: "",
        };
      });
    }

    //for password
    if (userDetails.password === "" || userDetails.password.length !== 6) {
      setErrMessage((state) => {
        return {
          ...state,
          password: "Password must be of 6 digit",
        };
      });
      return false;
    } else {
      setErrMessage((state) => {
        return {
          ...state,
          password: "",
        };
      });
    }
    return true;
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (await verifyForm()) {
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
    }
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
                value={userDetails?.identifier}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/\D/g, "");
                  if (userDetails.identifier.length < 10) {
                    setUserDetails((state) => {
                      return {
                        ...state,
                        identifier: inputVal,
                      };
                    });
                  }
                }}
                placeholder="Enter mobile number"
                className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {errMessage.identifier !== "" ? (
            <span className="text-red-500 text-xs font-medium">
              {errMessage.identifier}
            </span>
          ) : null}

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
                value={userDetails?.password}
                onChange={(e) => {
                  const inputVal = e.target.value.replace(/\D/g, "");
                  setUserDetails((state) => {
                    return {
                      ...state,
                      password: inputVal,
                    };
                  });
                }}
                onKeyUp={(e) => handleEnterKey(e)}
                pattern="[0-9]{6}"
                maxLength={6}
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
          {errMessage.password !== "" ? (
            <span className="text-red-500 text-xs font-medium">
              {errMessage.password}
            </span>
          ) : null}

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
