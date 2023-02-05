import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Logo from "../../asset/images/logo.png"

const PAGES = [
  { label: "Users", href: "/user-list" },
  { label: "Orders", href: "/order-list" },
  { label: "Company", href: "/company-list" },
  { label: "Category", href: "/category-list" },
  { label: "MOQ", href: "/moq-list" },
  { label: "Model MOQ", href: "/model-moq-list" },
  { label: "Model", href: "/model-list" },
  { label: "FAQ", href: "/faq" },
  { label: "About Us", href: "/about-us-editor" },
  { label: "Terms & Condition", href: "/terms-condition-editor" },
  { label: "Privacy Policy", href: "/privacy-policy-editor" }
]

const Header = ({ mobileMenuOpen = false, setMobileMenuOpen }) => {
  const navigate = useNavigate()

  const [selectedLink, setSelectedLink] = useState(
    window.location.pathname !== "/add-product" ? "" : "/user-list"
  )

  useEffect(() => {
    if (
      localStorage.getItem("selected") &&
      window.location.pathname !== "/add-product"
    ) {
      const _link = localStorage.getItem("selected")
      setSelectedLink(_link)
    }
  }, [selectedLink])

  const handleMenuClick = (link) => {
    navigate(link)
    setMobileMenuOpen((old) => !old)
    setSelectedLink(link)
    localStorage.setItem("selected", link)
  }

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

          {window.location.pathname === "/products" ? null : (
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
                )
              })}
            </div>
          )}

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:w-max lg:justify-between">
            <button
              onClick={() => navigate("/login")}
              className="mx-3 block rounded-lg py-1 px-1 text-base font-semibold leading-6 text-gray-900"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/")}
              className="inline-block rounded-lg px-2 py-0.5 text-sm font-semibold leading-3 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Register
            </button>
          </div>
        </nav>
        
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel
            focus="true"
            className="fixed inset-0 z-50 overflow-y-auto bg-white px-6 py-6 lg:hidden"
          >
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
            {window.location.pathname === "/products" ? null : (
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
                  )
                })}
              </div>
            )}

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <button
                    onClick={() => navigate("/login")}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
  )
}

export default Header
