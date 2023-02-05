import { useState } from "react"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import useAppInit from "../hooks/useAppInit"

const NonAuthLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  //load all requied apis
  useAppInit()
  return (
    <>
      <Header
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
      <Outlet />
      <Footer />
    </>
  )
}

export default NonAuthLayout
