const Tabs = ({ tabsName, setSelectedTab, selectedTab }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      {tabsName.map((tab, index) => {
        return (
          <li className="mr-2" key={index}>
            <button
              aria-current="page"
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? "inline-block p-4 text-white bg-gray-400 rounded-t-lg active"
                  : "inline-block p-4 text-slate-600 bg-white rounded-t-lg active"
              }`}
            >
              {tab}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Tabs
