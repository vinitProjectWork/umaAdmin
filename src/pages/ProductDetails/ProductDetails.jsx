import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
// import { intoCart } from "../../redux/slices/cart/cart";
import { GetProductById } from "../../services";
import { baseURL } from "../../utils/http";
import { CaretDownMini, ShareIcon } from "../../utils/Icons";
import ProductSpecification from "./Components/ProductSpecification";
import ReturnPolicy from "./Components/ReturnPolicy";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { cartData } = useSelector(({ cart }) => cart);
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [pincodeChecking, setPincodeChecking] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [addItem, setAddItem] = useState({});
  const [canAddToCart, setCanAddToCart] = useState(false);
  const [totalAddedQty, setTotalAddedQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedModalImage, setSelectedModalImage] = useState("");
  const { id: productId } = useParams();
  const [productDetails, setProductDetails] = useState({
    name: "",
    id: "",
    originalPrice: "",
    discountedPrice: "",
    description: "",
    moq: "",
    modelDetailUpdated: "[{}]",
    groupedModel: {},
    details: "",
    deliveryChargesOnline: "",
    deliveryChargesOffline: "",
    product_medias: [],
  });
  const {
    name,
    id,
    originalPrice,
    discountedPrice,
    description,
    moq,
    modelDetailUpdated,
    details,
    deliveryChargesOnline,
    deliveryChargesOffline,
    product_medias,
    media,
    groupedModel,
  } = productDetails;

  useEffect(() => {
    if (productId) {
      GetProductById(productId)
        .then((resp) => {
          const model = JSON.parse(resp?.data?.modelDetailUpdated);
          let groupedModel = model?.reduce(function (r, a) {
            r[a.brand] = r[a.brand] || [];
            r[a.brand].push(a);
            return r;
          }, Object.create(null));
          const selectedcategory = {
            label: resp?.data.category?.name,
            value: resp?.data?.category?.id,
          };
          const media = resp?.data?.product_medias?.map((item) => {
            return {
              preview: baseURL + item?.media?.url,
              size: item?.media?.size * 1000,
              order: item?.order,
              type: item?.media?.ext,
              id: item?.id,
            };
          });
          // const currentProductCartData = cartData?.items?.filter(
          //   (item) => item.productId == productId
          // );
          // if (currentProductCartData.length > 0) {
          //   let _addItem = {};
          //   groupedModel = currentProductCartData[0]?.model?.reduce(function (
          //     r,
          //     a
          //   ) {
          //     r[a.brand] = r[a.brand] || [];
          //     r[a.brand].push(a);
          //     return r;
          //   },
          //   Object.create(null));
          //   currentProductCartData[0]?.model?.map((item) => {
          //     _addItem[item.value] = parseInt(item.addQty);
          //   });
          //   setAddItem(_addItem);
          // }
          setSelectedImage(media[0].preview);
          setSelectedModalImage(media[0].preview);
          setProductDetails({
            ...resp?.data,
            selectedcategory,
            model,
            groupedModel,
            media: media.sort((a, b) => a.order - b.order),
            product_medias: [],
          });
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    }
  }, [productId]);

  const handleModal = (title) => {
    setOpen(true);
    setModalTitle(title);
  };

  const handleAddItem = (item, type, currValue) => {
    const { value } = item;
    let moq = item.moq ?? productDetails.model_moq;
    let tempAddItem = addItem;
    if (type === 1) {
      if (addItem[value]) {
        tempAddItem[value] =
          (addItem[value] > parseInt(moq) - 1
            ? addItem[value]
            : parseInt(moq)) + 1;
      } else {
        tempAddItem[value] = parseInt(moq);
      }
    } else if (type === 0) {
      tempAddItem[value] =
        addItem[value] && addItem[value] - 1 > parseInt(moq)
          ? (addItem[value] ?? 1) - 1
          : addItem[value] == parseInt(moq)
          ? 0
          : 0;
    } else {
      if (parseInt(moq) - 1 < parseInt(currValue)) {
        tempAddItem[value] = parseInt(currValue);
      } else {
        tempAddItem[value] = parseInt(moq);
      }
    }
    setAddItem({ ...tempAddItem });
  };

  useEffect(() => {
    const sum = Object.values(addItem).reduce(
      (a, b) => parseInt(a) + parseInt(b),
      0
    );

    const _price = originalPrice * sum;
    setTotalPrice(_price);
    setTotalAddedQty(sum);
    if (sum >= moq) {
      setCanAddToCart(true);
    }
  }, [addItem]);

  const handleCheckPincode = () => {
    setPincodeChecking(true);
    setTimeout(() => {
      setPincodeChecking(false);
    }, 1500);
  };

  const handleAddToCart = () => {
    const _parsedData = JSON.parse(modelDetailUpdated);
    const _model = [];

    //preparing model object
    _parsedData.filter((item) => {
      Object.entries(addItem).map((i) => {
        if (parseInt(i[0]) === parseInt(item.value)) {
          _model.push({ ...item, addQty: String(i[1]) });
        }
      });
    });
    const getTotal = (total, num) => {
      const totalPrice =
        parseFloat(num?.price ?? originalPrice) * parseInt(num?.addQty);
      return total + totalPrice;
    };

    const getShippingTotalOffline = (total, num) => {
      const totalPrice =
        parseFloat(deliveryChargesOffline) * parseInt(num?.addQty);
      return total + totalPrice;
    };

    const deliveryChargesOnline = (total, num) => {
      const totalPrice =
        parseFloat(deliveryChargesOnline) * parseInt(num?.addQty);
      return total + totalPrice;
    };

    //preparing data
    const _data = {
      label: name,
      image: media[0]?.preview,
      productPrice: originalPrice,
      productId: id,
      productName: name,
      model: _model,
      totalPrice: _model?.reduce(getTotal, 0),
      shippingOffline: _model?.reduce(getShippingTotalOffline, 0),
      shippingOnline: _model?.reduce(deliveryChargesOnline, 0),
    };

    // dispatch(intoCart(_data));
    toast.success("Product added into cart");
    navigate("/shopping-cart");
  };

  const shareLink = () => {
    if (navigator?.clipboard && window?.isSecureContext) {
      navigator?.clipboard?.writeText(window.location.href);
      toast.success("Linked copied successfully!");
    }
  };

  return (
    <>
      {open ? (
        <Modal
          open={open}
          setOpen={setOpen}
          children={
            modalTitle === "Specification" ? (
              <ProductSpecification data={productDetails} />
            ) : (
              <ReturnPolicy />
            )
          }
          title={modalTitle}
        />
      ) : null}
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          <Slider {...settings} easing="linear">
            {productDetails?.media?.map((image, index) => {
              return (
                <div key={index}>
                  {image.type === ".mp4" ? (
                    <video autoPlay className="h-80 w-full object-contain">
                      <source
                        src={image.preview + "#t=0.001"}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      src={`${image.preview}`}
                      className="h-80 w-full object-contain"
                    />
                  )}
                </div>
              );
            })}
          </Slider>
          <div className="grid md:grid-cols-2 gap-8 mt-5">
            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block text-gray-500 mb-0.5">
                    U & E
                  </span>
                  <span
                    onClick={() => shareLink()}
                    className="cursor-pointer text-gray-600"
                  >
                    <ShareIcon />
                  </span>
                </div>
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

              {/* <div className="font-bold cursor-pointer my-5 flex items-center gap-1">
                <span onClick={() => handleModal("Return Policy")}>
                  7 days Return
                </span>
                <CaretDownMini />
              </div> */}

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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
            </div>
          </div>

          <div className="border-t-4 w-full mt-2"></div>

          {modelDetailUpdated && (
            <div className="flex flex-col gap-3 w-full">
              {[...JSON.parse(modelDetailUpdated)]?.map((item, index) => {
                return (
                  <>
                    <div
                      className="flex justify-between w-full lg:w-1/2 items-center gap-2 my-1"
                      key={index}
                    >
                      <div className="flex gap-2">
                        <div className="rounded-sm overflow-hidden">
                          <img
                            src={selectedModalImage}
                            alt="Photo by Himanshu Dewangan"
                            className="h-14"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-xl font-semibold">{item.label}</p>
                          <p className="text-md font-semibold">
                            Price : ₹{" "}
                            {item.price ?? productDetails.originalPrice}
                          </p>
                          <p className="text-slate-600 text-sm">
                            Min Qty: {item.moq ?? productDetails.model_moq} sets
                          </p>
                          <p className="text-slate-600 text-sm">
                            Total MOQ: {moq} sets
                          </p>
                        </div>
                      </div>
                      {addItem[item.value] && addItem[item.value] > 0 ? (
                        <div className="w-20 h-8 flex border rounded overflow-hidden">
                          <button
                            onClick={() => handleAddItem(item, 0)}
                            className="w-8 p-1 border-r flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={addItem[item.value] + ""}
                            min={item.moq}
                            className="w-full text-center border-r focus:ring ring-inset ring-indigo-300 outline-none transition duration-100 px-2 py-2"
                            onChange={(e) =>
                              handleAddItem(item, 2, e.target.value)
                            }
                          />
                          <button
                            onClick={() => handleAddItem(item, 1)}
                            className="w-8 p-1 flex justify-center items-center flex-1 bg-white hover:bg-gray-100 active:bg-gray-200 leading-none select-none transition duration-100"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-white border-2 text-indigo-500 p-1 w-1/6 lg:w-1/6 rounded-md shadow-md"
                          onClick={() => handleAddItem(item, 1)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                    <div className="border-t-2 w-full"></div>
                  </>
                );
              })}
            </div>
          )}

          <div className="mt-5">
            <div className="my-2">
              <p className="font-bold text-lg my-3">Recommendation</p>
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                {/* <div className="mx-auto max-w-2xl lg:max-w-7xl">
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
                            <p className="font-medium text-md text-gray-900">
                              {product.price ?? "₹ 25"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                {/* /End replace */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed flex justify-between items-center bottom-0 w-full">
        {moq - totalAddedQty <= 0 ? null : (
          <div
            className={`${
              totalAddedQty !== 0
                ? "fixed bottom-12 bg-slate-700 w-full flex justify-center text-slate-50 py-1"
                : "fixed bottom-0 bg-slate-700 w-full flex justify-center text-slate-50 py-1"
            }`}
          >
            {`Add ${moq - totalAddedQty} pcs to proceed`}
          </div>
        )}

        {totalAddedQty !== 0 ? (
          <div className="fixed w-full items-center border-t-2 bottom-0 flex justify-between bg-slate-50 px-5">
            <p className="font-semibold text-lg">{totalPrice} ₹</p>
            <button
              className={`${
                moq <= totalAddedQty
                  ? "bg-red-500 cursor-pointer"
                  : "bg-slate-500 cursor-not-allowed"
              } my-2 mx-4 float-right px-5 py-2  text-white text-sm font-bold tracking-wide rounded-full focus:outline-none`}
              disabled={moq >= totalAddedQty}
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetails;
