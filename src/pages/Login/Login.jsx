import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Logo from "../../asset/images/logo.png"

const Login = () => {
  const navigate = useNavigate()
  const [mobileNumber, setMobileNumber] = useState("")
  const [processing, setProcessing] = useState(false)

  const handleMobileNumber = (val) => {
    const newVal = val.replace(/[^\d,]/g, "")
    setMobileNumber(newVal)
  }

  const handleRegister = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      toast.success("Registration successfull!")
      navigate("/verify-pattern")
    }, 1500)
  }

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
        <div className="mt-8 space-y-6">
          <div className="flex w-full justify-center flex-col items-center gap-3">
            <div className="text-xl font-bold">Enter Mobile Number</div>
            <div className="text-center text-md font-normal text-slate-500">
              Enter your 10-digit mobile number to receive the verification
              code.
            </div>
          </div>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="mobile-number">Mobile Number</label>
              <div className="relative flex gap-2 w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <div className="text-lg from-neutral-500">+91</div>
                <input
                  id="mobile-number"
                  name="mobile-number"
                  type="text"
                  autoComplete="email"
                  value={mobileNumber}
                  required
                  className="bg-transparent focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => handleMobileNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
            onClick={() => handleRegister()}
          >
            {processing ? (
              <>
                <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
              </>
            ) : null}
            <div className="grid-2 my-auto -mx-1">
              {processing ? "Processing..." : "Login"}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
