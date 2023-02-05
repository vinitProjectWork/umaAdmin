const DATA = [
  {
    label: "Material",
    value: "Glass"
  },
  {
    label: "Country of Origin",
    value: "India"
  },
  {
    label: "Type",
    value: "HD"
  },
  {
    label: "Compatible Mobile",
    value: "Redmi 9A, Redmi 9C, Redmi 11 Pro"
  },
  {
    label: "Pacaging Type",
    value: "Loose / Poly Packing"
  },
  {
    label: "Manufacturing Type",
    value: "N/A"
  },
  {
    label: "Pack of",
    value: "1"
  },
  {
    label: "Device Type",
    value: "Mobiles"
  },
  {
    label: "Features",
    value: "Cureved Glass"
  },
  {
    label: "Screen Guard Colour",
    value: "Black"
  },
  {
    label: "Applied on",
    value: "Front"
  }
]

const ProductSpecification = ({ data }) => {
  console.log(data)
  return (
    <div className="flex flex-col">
      <div dangerouslySetInnerHTML={{ __html: data?.details }} />
      {/* {DATA.map((item, index) => {
        return (
          <div className="border flex" key={index}>
            <div className="text-sm font-medium lg:text-md border-r-2 w-1/2 py-1 px-2">
              {item.label}
            </div>
            <div className="text-sm w-1/2 py-1 px-2">{item.value}</div>
          </div>
        )
      })} */}
    </div>
  )
}

export default ProductSpecification
