import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useAppInit from "../hooks/useAppInit";

const NonAuthLayout = () => {
  const navigate = useNavigate();

  //load all requied apis
  useAppInit();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      return;
    } else {
      navigate("/");
    }
  }, [localStorage.getItem("access_token")]);
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default NonAuthLayout;
