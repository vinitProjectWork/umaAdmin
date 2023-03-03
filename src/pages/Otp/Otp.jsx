import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../asset/images/logo.png";
import { ResendOtp, VerifyOtp } from "../../services";

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [verification, setVerification] = useState(false);

  const verifyOtp = () => {
    setVerification(true);
    setTimeout(() => {
      VerifyOtp({ otp, mobileNumber: location?.state?.mobileNumber })
        .then((resp) => {
          setVerification(false);
          const { jwt, user } = resp;
          localStorage.setItem("access_token", jwt);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Otp verified successfully!");
          navigate("/products");
        })
        .catch((error) => {
          toast.error("Something went wrong!");
        });
    }, 1500);
  };

  // const handleResendOTP = () => {
  //   ResendOtp()
  //     .then((resp) => console.log(resp))
  //     .catch((error) => console.log(error));
  // };

  return (
    <div className="flex items-center bg-gradient-to-r from-red-100 via-purple-100 to-pink-100 justify-center px-4 h-screen sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 shadow-lg p-11 rounded-md bg-white">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
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
            <div className="font-semibold text-3xl">
              <p>OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{`We have sent a code to your mobile number`}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="-space-y-px rounded-md shadow-sm">
              <label htmlFor="otp" className="font-semibold">
                OTP
              </label>
              <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  autoComplete="new-password"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="bg-transparent w-full focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button
                  type="button"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={(e) => verifyOtp()}
                >
                  {verification ? (
                    <>
                      <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                    </>
                  ) : null}
                  <div className="grid-2 my-auto -mx-1">
                    {verification ? "Verifying..." : "Verify OTP"}
                  </div>
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 cursor-pointer">
                <p>Didn't recieve code?</p>{" "}
                <div
                  className="font-semibold text-indigo-500"
                  onClick={() => handleResendOTP()}
                >
                  Resend
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
