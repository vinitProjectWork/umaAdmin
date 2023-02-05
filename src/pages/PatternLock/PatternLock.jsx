import { useEffect, useState } from "react"
import PatternLock from "react-pattern-lock"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Logo from "../../asset/images/logo.png"

const verifiedPattern = ["0", "1", "2"]

const VerifyPatternLock = () => {
  const navigate = useNavigate()
  const [pattern, setPattern] = useState([])
  const [patternStatus, setPatternStatus] = useState(false)
  const [processing, setProcessing] = useState(false)

  const checkPattern = () => {
    const _pattern =
      verifiedPattern.sort().toString() === pattern.sort().toString()
    if (_pattern) {
      setPatternStatus(true)
    } else {
      setPatternStatus(false)
    }
  }

  const verifyPattern = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      toast.success("Verified successfully!")
      navigate("/user-list")
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
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <p className="text-lg font-medium">Please enter pattern</p>
        </div>
        <div className="w-full flex justify-center">
          <PatternLock
            className="bg-indigo-400 rounded-md shadow-sm shadow-indigo-800"
            width="100%"
            pointSize={10}
            size={3}
            path={pattern}
            success={patternStatus}
            error={pattern.length > 0 && !patternStatus}
            allowOverlapping={true}
            connectorRoundedCorners={true}
            onChange={(pattern) => {
              setPattern([...pattern])
            }}
            onFinish={() => {
              checkPattern()
            }}
          />
        </div>
        <div className="w-full flex justify-center">
          {/* <button
            onClick={() => verifyPattern()}
            className="w-full bg-indigo-500 cursor-pointer text-slate-100 px-2 py-2 rounded-md shadow-md shadow-slate-400"
            // className={`w-full ${
            //   pattern.length === 0
            //     ? "bg-slate-500 cursor-not-allowed"
            //     : "bg-indigo-500 cursor-pointer"
            // } text-slate-100 px-2 py-2 rounded-md shadow-md shadow-slate-400`}
            // disabled={pattern.length === 0}
          >
            Submit
          </button> */}
          <button
            type="button"
            className="w-full flex justify-center bg-indigo-500 cursor-pointer text-slate-100 px-2 py-2 rounded-md shadow-md shadow-slate-400"
            onClick={() => verifyPattern()}
          >
            {processing ? (
              <>
                <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
              </>
            ) : null}
            <div className="grid-2 my-auto -mx-1">
              {processing ? "Verifying..." : "Submit"}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyPatternLock
