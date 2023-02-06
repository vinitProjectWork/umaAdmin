import Editor from "../../../../components/Editor/Editor"
const AddProductForm = ({ setData, data }) => {
  return (
    <div className="bg-white py-6 mb-6">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="title_name"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Title Name
          </label>
          <input
            name="title_name"
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            value={data?.name}
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  name: e.target.value
                }
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="desc"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Description
          </label>
          <textarea
            name="desc"
            className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            value={data?.description}
            onChange={(e) =>
              setData((state) => {
                return {
                  ...state,
                  description: e.target.value
                }
              })
            }
          />
        </div>

        <div className="sm:col-span-2 mb-2">
          <label
            htmlFor="details"
            className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          >
            Details
          </label>
          <Editor setData={setData} data={data} />
        </div>
      </div>
    </div>
  )
}

export default AddProductForm
