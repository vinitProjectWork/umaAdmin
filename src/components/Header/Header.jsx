import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Logo from "../../asset/images/logo.png";

const PAGES = [
  { label: "Users", href: "/user-list" },
  { label: "Orders", href: "/order-list" },
  { label: "Company", href: "/company-list" },
  { label: "Model", href: "/model-list" },
  { label: "Category", href: "/category-list" },
  { label: "products", href: "/products" },
  { label: "Slider", href: "/slider-config" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about-us-editor" },
  { label: "Terms & Condition", href: "/terms-condition-editor" },
  { label: "Privacy Policy", href: "/privacy-policy-editor" },
];

const Header = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const [selectedLink, setSelectedLink] = useState(
    window.location.pathname !== "/product" ? "" : "/user-list"
  );

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
      const _parsedData = JSON.parse(localStorage.getItem("user"));
      setUser(_parsedData);
    } else {
      setIsLoggedIn(false);
      setUser({});
    }
  }, [localStorage.getItem("access_token")]);

  useEffect(() => {
    if (
      localStorage.getItem("selected") &&
      window.location.pathname !== "/product"
    ) {
      const _link = localStorage.getItem("selected");
      setSelectedLink(_link);
    }
  }, [selectedLink]);

  const handleMenuClick = (link) => {
    navigate(link);
    setMobileMenuOpen(false);
    setSelectedLink(link);
    localStorage.setItem("selected", link);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("You have successfully logout!");
    window.location.href = window.location.origin + "/";
  };

  return (
    <div className="px-6 py-3 lg:px-8 z-50 sticky top-0 shadow-md bg-white">
      <div>
        <nav
          className="flex h-9 items-center justify-between"
          aria-label="Global"
        >
          <div className="flex" aria-label="Global">
            <a
              href="/"
              className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
              aria-label="logo"
            >
              <img
                src={Logo}
                width="60"
                height="60"
                className="aspect-auto object-fit object-center"
              />
            </a>
          </div>

          <div
            className="hidden lg:flex lg:gap-2 xl:gap-10 gap-10 justify-center"
            aria-label="Global"
          >
            {PAGES.map((page, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleMenuClick(page.href)}
                  className={`text-gray-600 ${
                    selectedLink === page.href
                      ? "border-b-2 border-indigo-500"
                      : ""
                  } hover:text-indigo-500 active:text-indigo-700 font-semibold transition duration-100`}
                >
                  {page.label}
                </button>
              );
            })}
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                onClick={() => setMobileMenuOpen(true)}
                className="h-6 w-6"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:w-max lg:justify-between items-center">
            {isLoggedIn ? (
              <span className="flex px-1 items-center">
                <button
                  onClick={() => handleLogout()}
                  className="mx-3 block border-2 rounded-md border-slate-600 shadow-md py-1 px-1 text-base font-semibold leading-6 text-gray-900"
                >
                  Logout
                </button>
              </span>
            ) : (
              <Fragment>
                <button
                  onClick={() => navigate("/login")}
                  className="mx-3 block rounded-lg py-1 px-1 text-base font-semibold leading-6 text-gray-900"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="inline-block rounded-lg text-base font-semibold leading-3 text-gray-900 shadow-sm"
                >
                  Register
                </button>
              </Fragment>
            )}
          </div>
        </nav>
        <Transition appear show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" onClose={() => setMobileMenuOpen(false)}>
            <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex h-9 items-center justify-between">
                <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                  <a
                    href="/"
                    className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
                    aria-label="logo"
                  >
                    <img
                      src={Logo}
                      width="60"
                      height="60"
                      className="aspect-auto object-fit object-center"
                    />
                  </a>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                {PAGES.map((page, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleMenuClick(page.href)}
                      className={`${
                        selectedLink === page.href
                          ? "border-b-2 border-indigo-500"
                          : ""
                      } flex flex-col text-gray-600 my-2 hover:text-indigo-500 active:text-indigo-700 font-semibold transition duration-100`}
                    >
                      {page.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6">
                    {isLoggedIn ? (
                      <span className="flex px-1 items-center">
                        <button
                          onClick={() => handleLogout()}
                          className="block rounded-lg py-1 px-1 text-base font-semibold leading-6 text-gray-900"
                        >
                          Logout
                        </button>
                      </span>
                    ) : (
                      <Fragment>
                        <button
                          onClick={() => navigate("/login")}
                          className="mx-3 block rounded-lg py-1 px-1 text-base font-semibold leading-6 text-gray-900"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => navigate("/register")}
                          className="inline-block rounded-lg text-base font-semibold leading-3 text-gray-900 shadow-sm"
                        >
                          Register
                        </button>
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Header;
