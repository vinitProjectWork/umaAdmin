import { CancelIconMini, CheckIconMini } from "../../../utils/Icons"

const ReturnPolicy = () => {
  return (
    <div className="flex flex-col">
      <div className="accepted flex flex-col justify-start">
        <div className="border-t-4"></div>
        <div className="flex flex-col justify-start items-start py-2">
          <h2 className="text-green-600 font-medium text-lg">
            What returns are accepted?
          </h2>
          <h5 className="text-green-600 font-medium text-xs">
            Returns are approved only after internal review
          </h5>
        </div>
        <div className="border-b-4"></div>
        <div className="flex flex-col items-start justify-start my-2">
          <h2 className="font-medium my-1">Under Brand Warranty</h2>
          <div className="flex items-center gap-2">
            <CheckIconMini />
            <p className="text-sm">Defective Items with DOA certificate</p>
          </div>
          <div className="flex items-center gap-3 mt-1 border-b pb-2">
            <button className="bg-slate-200 p-1 text-sm font-medium rounded-md">
              DOA certificate required
            </button>
            <button className="bg-slate-200 p-1 text-sm font-medium rounded-md">
              within warranty period
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start mb-2">
          <h2 className="font-medium">Under General Policy</h2>
          <div className="flex items-center gap-2">
            <CheckIconMini />
            <p className="text-sm">Damaged Items</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIconMini />
            <p className="text-sm">Wrong Items</p>
          </div>
          <div className="flex items-center gap-2">
            <CheckIconMini />
            <p className="text-sm">Missing Items</p>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <button className="bg-slate-200 p-1 text-sm font-medium rounded-md">
              With Photo Proof
            </button>
            <button className="bg-slate-200 p-1 text-sm font-medium rounded-md">
              7 days from delivery
            </button>
          </div>
        </div>
        <div className="border-b-4"></div>
      </div>
      <div className="rejected">
        <div className="flex flex-col justify-start items-start py-2">
          <h2 className="text-red-600 font-medium text-lg">
            What returns are not accepted?
          </h2>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center gap-2">
            <CancelIconMini />
            <p className="text-sm">
              Defective Items{" "}
              <span className="text-red-600">without DOA certificate</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CancelIconMini />
            <p className="text-sm">Qaulity issues</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy