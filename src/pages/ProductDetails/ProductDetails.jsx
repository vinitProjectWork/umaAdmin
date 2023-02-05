import { useCallback } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Modal from "../../components/Modal/Modal"
import { baseURL } from "../../utils/http"
import { CaretDownMini } from "../../utils/Icons"
import ProductSpecification from "./Components/ProductSpecification"
import ReturnPolicy from "./Components/ReturnPolicy"

// import ProductSpecification from "./Components/ProductSpecification"
// import ReturnPolicy from "./Components/ReturnPolicy"

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "/product-details",
    material: "Matt finish",
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
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top."
  }
]

const ProductDetails = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [pincodeChecking, setPincodeChecking] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [addItem, setAddItem] = useState(false)
  const location = useLocation()
  const productDetails = location.state
  const {
    name,
    originalPrice,
    discountedPrice,
    description,
    moq,
    modelDetailUpdated,
    details
  } = productDetails.attributes

  useEffect(() => {
    if (qty === 0) {
      setIsAdded(false)
      setQty(0)
    }
  }, [qty])

  const handleModal = (title) => {
    setOpen(true)
    setModalTitle(title)
  }

  const handleAddProduct = () => {
    setQty((old) => old + 1)
  }

  const handleDecProduct = () => {
    setQty((old) => old - 1)
  }

  const handleAddItem = () => {
    setAddItem(true)
    setQty(1)
  }

  const handleCheckPincode = () => {
    setPincodeChecking(true)
    setTimeout(() => {
      setPincodeChecking(false)
    }, 1500)
  }

  console.log(productDetails.attributes)

  return (
    <>
      {open ? (
        <Modal
          open={open}
          setOpen={setOpen}
          children={
            modalTitle === "Specification" ? (
              <ProductSpecification data={productDetails.attributes} />
            ) : (
              <ReturnPolicy />
            )
          }
          title={modalTitle}
        />
      ) : null}
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="grid lg:grid-cols-5 gap-4">
              <div className="flex lg:flex-col order-last lg:order-none gap-4">
                {productDetails?.attributes.product_medias.data.map((media) => (
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    {media.attributes.media.data.attributes.ext === ".mp4" ? (
                      <video
                        src={
                          baseURL + media.attributes.media.data.attributes.url
                        }
                        onClick={() =>
                          setSelectedImage(
                            baseURL + media.attributes.media.data.attributes.url
                          )
                        }
                        // autoPlay
                      />
                    ) : (
                      <img
                        src={
                          baseURL + media.attributes.media.data.attributes.url
                        }
                        loading="lazy"
                        alt="Photo by U&E"
                        className="w-full h-full object-cover object-center"
                        onClick={() =>
                          setSelectedImage(
                            baseURL + media.attributes.media.data.attributes.url
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 bg-gray-100 rounded-lg overflow-hidden relative">
                {(
                  selectedImage ||
                  baseURL +
                    productDetails?.attributes.product_medias.data[0]
                      ?.attributes.media.data.attributes.url
                ).includes(".mp4") ? (
                  <video
                    src={
                      selectedImage ||
                      baseURL +
                        productDetails?.attributes.product_medias.data[0]
                          ?.attributes.media.data.attributes.url
                    }
                    autoPlay
                  />
                ) : (
                  <img
                    src={
                      selectedImage ||
                      baseURL +
                        productDetails?.attributes.product_medias.data[0]
                          ?.attributes.media.data.attributes.url
                    }
                    loading="lazy"
                    alt="Photo by Himanshu Dewangan"
                    className="w-full h-full object-cover object-center"
                  />
                )}

                <span className="bg-red-500 text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5">
                  sale
                </span>

                <a
                  href="#"
                  className="inline-block bg-white hover:bg-gray-100 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 border text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 absolute right-4 top-4 px-3.5 py-3"
                >
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg> */}
                </a>
              </div>
            </div>

            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <span className="inline-block text-gray-500 mb-0.5">U & E</span>
                <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
                  {name}
                </h2>
              </div>

              <div className="flex items-center gap-3 mb-2 md:mb-3">
                <div className="h-7 flex items-center bg-indigo-500 text-white rounded-full gap-1 px-2">
                  <span className="text-sm">4.2</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <span className="text-gray-500 text-sm transition duration-100">
                  56 ratings
                </span>
              </div>

              <div className="font-bold cursor-pointer my-5 flex items-center gap-1">
                <span onClick={() => handleModal("Specification")}>
                  Specifications
                </span>
                <CaretDownMini />
              </div>

              <div className="font-bold cursor-pointer my-5 flex items-center gap-1">
                <span onClick={() => handleModal("Return Policy")}>
                  7 days Return
                </span>
                <CaretDownMini />
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-gray-800 text-xl md:text-2xl font-bold">
                    ₹ {discountedPrice ?? originalPrice}
                  </span>
                  {discountedPrice && (
                    <span className="text-red-500 line-through mb-0.5">
                      ₹ {originalPrice}
                    </span>
                  )}
                </div>

                <span className="text-gray-500 text-sm">
                  incl. VAT plus shipping
                </span>
              </div>

              <div className="flex items-center text-gray-500 gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                  />
                </svg>

                <span className="text-sm">2-4 day shipping</span>
              </div>

              <div className="w-full md:w-10/12 lg:w-1/2 hover:border-indigo-500 duration-300 my-3 border-b-2 flex justify-between px-3">
                <input
                  type="text"
                  className="outline-none text-slate-500"
                  placeholder="Enter pincode"
                />
                {pincodeChecking ? (
                  <div className="grid-1 my-auto h-5 w-5 mx-3 border-t-transparent border-solid animate-spin rounded-full border-indigo-500 border-2"></div>
                ) : (
                  <button
                    onClick={() => handleCheckPincode()}
                    className="text-indigo-400 hover:text-indigo-500 font-bold cursor-pointer"
                  >
                    Check
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-slate-700">Compatible Models</p>
                {JSON.parse(modelDetailUpdated).map((item, index) => {
                  return (
                    <div className="flex flex-col" key={index}>
                      {item.name}
                    </div>
                  )
                })}
                <div></div>
              </div>
            </div>
          </div>

          <div className="border-t-4 w-full mt-2"></div>

          <div className="flex flex-col w-full">
            {JSON.parse(modelDetailUpdated).map((item, index) => {
              return (
                <div
                  className="flex justify-between w-1/2 items-center gap-2 my-2"
                  key={index}
                >
                  <div className="flex gap-2">
                    {/* <div className="bg-gray-100 rounded-sm overflow-hidden">
                      <img
                        src="https://images.unsplash.com/flagged/photo-1571366992999-47669b775ef6?auto=format&q=75&fit=crop&w=80"
                        loading="lazy"
                        alt="Photo by Himanshu Dewangan"
                        className="w-full h-full object-cover object-center"
                      />
                    </div> */}
                    <div>
                      <p>{item.name}</p>
                      <p className="text-slate-600">Min Qty: {item.moq}pc</p>
                      <p className="font-medium">Price : ₹ {item.price}</p>
                    </div>
                  </div>

                  {addItem && qty > 0 ? (
                    <div className="w-20 h-8 flex border rounded overflow-hidden">
                      <input
                        type="text"
                        value={qty}
                        min={0}
                        className="w-full focus:ring ring-inset ring-indigo-300 outline-none transition duration-100 px-4 py-2"
                      />
                      <div className="flex flex-col border-l divide-y">
                        <button
                          onClick={() => handleAddProduct()}
                          className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleDecProduct()}
                          className="w-6 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="bg-indigo-500 p-1 w-1/6 lg:w-1/12  text-slate-50 rounded-md"
                      onClick={() => handleAddItem()}
                    >
                      Add
                    </button>
                  )}
                </div>
              )
            })}
            <div className="flex justify-end mt-5">
              <button
                className="bg-slate-500 p-1 w-1/4 lg:w-1/12 text-slate-50 rounded-md cursor-not-allowed"
                disabled
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="mt-5">
            <div className="border-2"></div>
            <div className="my-2">
              <p className="font-bold text-lg my-3">Recommendation</p>
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="mx-auto max-w-2xl lg:max-w-7xl">
                  <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="group relative flex lg:block shadow-md p-2 ring-1 ring-gray-900/10 hover:ring-gray-900/20 rounded-md"
                      >
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-56">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-fit object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-center items-start flex-col px-1 w-full gap-3">
                          <div className="flex justify-center flex-col items-center w-full gap-2">
                            <h3 className="text-sm text-gray-700 font-normal">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {product.material}
                            </h3>
                            <h3 className="text-gray-700 text-center font-bold text-md text-ellipsis">
                              <a href={product.href}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.name}
                              </a>
                            </h3>
                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                            <p className="font-medium text-md text-gray-900">
                              {product.price ?? "₹ 25"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetails
