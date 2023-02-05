import Select from "../../components/Select/Select"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/Pagination/Pagination"
import Filters from "../../components/Filters/Filters"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "/product-details",
    material: "Matt finish",
    colors: ["#1abc9c", "#e74c3c", "#34495e"],
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper."
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "/product-details",
    material: "Glass finish",
    colors: ["#0984e3", "#d63031", "#e84393"],
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top."
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "/product-details",
    material: "Silicon",
    colors: ["#009432", "#1B1464", "#5758BB"],
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card."
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "/product-details",
    material: "Normal",
    colors: ["#6F1E51", "#ED4C67", "#FFC312", "#006266", "#EE5A24"],
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top."
  }
]

const Menu_Items = [
  { label: "Popular" },
  { label: "Price - Low to High" },
  { label: "Price - High to Low" },
  { label: "Newest First" }
]

export default function ProductListing() {
  const navigate = useNavigate()
  return (
    <div className="bg-white">
      <div className="mx-auto flex justify-between max-w-2xl mt-4 py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="w-1/2 md:w-1/3">
          <Select placeHolder="Search..." />
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
              Sort By
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {Menu_Items.map((item, index) => {
                  return (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {item.label}
                        </a>
                      )}
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="mx-auto flex justify-between sm:py-4 sm:px-6">
        <Filters />
      </div>
      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative shadow-md p-5 ring-1 ring-gray-900/10 hover:ring-gray-900/20 rounded-md"
              onClick={() => navigate(product.href)}
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-center items-start flex-col px-1 w-full gap-3">
                <div className="flex justify-center flex-col items-center w-full gap-2">
                  <h3 className="text-sm text-gray-700 font-normal">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.material}
                  </h3>
                  <h3 className="text-gray-700 font-bold text-md">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                  <p className="font-medium text-md text-gray-900 blur-sm">
                    {product.price ?? "₹ 25"}
                  </p>
                </div>
                <div className="flex flex-col content-end items-center w-full">
                  <div className="flex justify-between gap-3 items-center">
                    {product.colors.slice(0, 4).map((color, index) => {
                      return (
                        <div
                          key={index}
                          className={`ring-1 ring-black ring-opacity-5 rounded-full h-4 w-4`}
                          style={{ backgroundColor: `${color}` }}
                        ></div>
                      )
                    })}
                    {product.colors.length > 4 ? (
                      <p className="font-medium text-xs subpixel-antialiased">
                        +{product.colors.length - 4}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  )
}
