import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const BlockLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/products");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default BlockLayout;
