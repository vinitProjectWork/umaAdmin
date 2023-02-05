import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Logo from "../../asset/images/logo.png"

const Otp = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    fourth: "",
    fifth: "",
    sixth: ""
  })
  const [verification, setVerification] = useState(false)

  const handleInputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    } else {
      const next = elmnt.target.tabIndex
      if (next < 5) {
        elmnt.target.form.elements[next].focus()
      }
    }
  }

  const verifyOtp = () => {
    setVerification(true)
    setTimeout(() => {
      setVerification(false)
      toast.success("Otp verified successfully!")
      navigate("/products")
    }, 1500)
  }

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
                  {/* <svg
                width="95"
                height="94"
                viewBox="0 0 95 94"
                className="w-6 h-auto text-indigo-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96 0V47L48 94H0V47L48 0H96Z" />
              </svg>
              Uma Enterprise */}
                </a>
              </div>
            </div>
            <div className="font-semibold text-3xl">
              <p>OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your mobile number</p>
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <form>
              <div className="flex flex-row items-center justify-center gap-5 mx-auto w-full max-w-xs">
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="1"
                    value={otp.one}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, one: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="2"
                    value={otp.second}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, second: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="3"
                    value={otp.third}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, third: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="4"
                    value={otp.fourth}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, fourth: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="5"
                    value={otp.fifth}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, fifth: e.target.value }
                      })
                    }
                  />
                </div>
                <div className="w-12 h-12">
                  <input
                    className="w-full h-full font-bold flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    autoComplete="no-password"
                    maxLength="1"
                    tabIndex="6"
                    value={otp.sixth}
                    onKeyUp={(e) => handleInputfocus(e)}
                    onChange={(e) =>
                      setOtp((state) => {
                        return { ...state, sixth: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </form>

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
                    {verification ? "Verifying..." : "Verify Mobile Number"}
                  </div>
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  className="flex flex-row items-center text-blue-600"
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Otp
