import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router";

//layout
import BlockLayout from "../layout/BlockLayout";
import NonAuthLayout from "../layout/NonAuthLayout";
import ProductDetails from "./ProductDetails/ProductDetails";
import SliderConfig from "./SliderConfig/SliderConfig";

//components
const Login = lazy(() => import("./Login/Login"));
const VerifyOtp = lazy(() => import("./Otp/Otp"));
const ProductListing = lazy(() => import("./ProductListing/ProductListing"));
const OrderList = lazy(() => import("./OrderList/OrderList"));
const UserList = lazy(() => import("./UserList/UserList"));
const CategoryList = lazy(() => import("./CategoryList/CategoryList"));
const MOQList = lazy(() => import("./MOQList/MOQList"));
const CompanyList = lazy(() => import("./CompanyList/CompanyList"));
const ModelList = lazy(() => import("./ModelList/ModelList"));
const ModelMOQList = lazy(() => import("./ModelMOQList/ModelMOQList"));
const FAQ = lazy(() => import("./FAQ/FAQ"));
const AboutUs = lazy(() => import("./AboutUs/AboutUs"));
const TermsAndCondition = lazy(() =>
  import("./TermsAndCondition/TermsAndCondition")
);
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy/PrivacyPolicy"));

//page not found page
const PageNotFound = lazy(() => import("./PageNotFound/PageNotFound"));

//componnets to add items
const AddProduct = lazy(() => import("./AddProduct/AddProduct"));
const AddUser = lazy(() => import("./AddUser/AddUser"));
const AddCategory = lazy(() => import("./AddCategory/AddCategory"));
const AddCompany = lazy(() => import("./AddCompany/AddCompany"));
const AddModel = lazy(() => import("./AddModel/AddModel"));
const AddMoq = lazy(() => import("./AddMoq/AddMoq"));
const AddModelMoq = lazy(() => import("./AddModelMoq/AddModelMoq"));
const AddFAQ = lazy(() => import("./AddFAQ/AddFAQ"));
const AddSubCategory = lazy(() => import("./AddSubCategory/AddSubCategory"));

const App = () => {
  return (
    <Routes>
      <Route element={<BlockLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route element={<NonAuthLayout />}>
        <Route path="/products" element={<ProductListing />} />
        {/* <Route path="/product-details" element={<ProductDetails />} /> */}
        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/order-list" element={<OrderList />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/moq-list" element={<MOQList />} />
        <Route path="/company-list" element={<CompanyList />} />
        <Route path="/model-list" element={<ModelList />} />
        <Route path="/model-moq-list" element={<ModelMOQList />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/slider-config" element={<SliderConfig />} />
        <Route path="/about-us-editor" element={<AboutUs />} />
        <Route path="/terms-condition-editor" element={<TermsAndCondition />} />
        <Route path="/privacy-policy-editor" element={<PrivacyPolicy />} />

        <Route path="/product" element={<AddProduct />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-sub-category" element={<AddSubCategory />} />
        <Route path="/add-moq" element={<AddMoq />} />
        <Route path="/add-model" element={<AddModel />} />
        <Route path="/add-model-moq" element={<AddModelMoq />} />
        <Route path="/add-company" element={<AddCompany />} />
        <Route path="/add-faq" element={<AddFAQ />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
