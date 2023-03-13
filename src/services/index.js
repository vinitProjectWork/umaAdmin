import { formToJSON } from "axios";
import {
  createBrand,
  deleteBrand,
  deleteCategory,
  deleteModel,
  editBrand,
  editModel,
  getAllBrands,
  getAllCategory,
  getAllModels,
  getAllProductMedia,
  getAllProducts,
  getProductById,
  getAllSubCategory,
  postCategory,
  postProduct,
  postProductMedia,
  updateCategory,
  getProductMediaById,
  deleteProductMediaById,
  getAllOrders,
  getAllSliderImages,
  deleteProduct,
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  getUser,
  approveUserAction,
  updateOrderStatus,
  getOrdersWithUser,
  blockUserAction,
  updateUser,
} from "../utils/apiRoutes";
import { http } from "../utils/http";

//register user
export const RegisterUser = async (_payload) => {
  const { email, password, mobile_number } = _payload?.preparedData;
  try {
    const { data } = await http.post(registerUser.endPoint, {
      email,
      password,
      username: mobile_number,
      ..._payload?.preparedData,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//login user
export const LoginUser = async (_payload) => {
  const { identifier, password } = _payload?.userDetails;
  try {
    const { data } = await http.post(loginUser.endPoint, {
      identifier,
      password,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//verify otp
export const VerifyOtp = async (_payload) => {
  try {
    const { data } = await http.post(verifyOtp.endPoint, { ..._payload });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//resend otp
export const ResendOtp = async () => {
  try {
    const { data } = await http.get(resendOtp.endPoint, {});

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//approve user
export const approveUser = async (userId) => {
  try {
    const { data } = await http.post(
      approveUserAction.endPoint + `/${userId}`,
      {}
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//block user
export const blockUser = async (userId) => {
  try {
    const { data } = await http.post(
      blockUserAction.endPoint + `/${userId}`,
      {}
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//update user details
export const updateUserDetails = async (_payload) => {
  const { details } = _payload;
  try {
    const { data } = await http.put(updateUser.endPoint + `/${details?.id}`, {
      ...details,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//get user
export const getUserDetails = async () => {
  try {
    const { data } = await http.get(getUser.endPoint, {});

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const GetAllCategories = async () => {
  try {
    const { data } = await http.get(getAllCategory.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const GetAllOrders = async (_payload) => {
  //
  try {
    const { data } = await http.get(
      getAllOrders.endPoint + `?filters[OrderStatus][$eq]=${_payload}`,
      {}
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const UpdateCategory = async (id, formdata) => {
  try {
    const { data } = await http.put(
      updateCategory.endPoint + `/${id}`,
      formdata
    );
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const DeleteSelectedCategory = async ({ id }) => {
  try {
    const { data } = await http.delete(deleteCategory.endPoint + `/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const PostCategory = async (formData) => {
  try {
    const { data } = await http.post(postCategory.endPoint, formData);

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
export const GetAllSubCategories = async () => {
  try {
    const { data } = await http.get(getAllSubCategory.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Categories
// ?pagination[page]=1&pagination[pageSize]=10
// {
//   perPage, totalRows
// }
export const GetAllModelsList = async () => {
  // const paginationUrl = `?pagination[page]=${totalRows}&pagination[pageSize]=${perPage}`
  try {
    const { data } = await http.get(getAllModels.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Brand
export const GetAllBrandList = async () => {
  // const _pagination = `&pagination[page]=${totalRows}&pagination[pageSize]=${perPage}`;
  try {
    const { data } = await http.get(getAllBrands.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Create Model
export const PostCompany = async (param) => {
  try {
    const { data } = await http.post(createBrand.endPoint, param);

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete Company
export const DeleteSelectedCompany = async (param) => {
  const { id } = param;
  try {
    const { data } = await http.delete(deleteBrand.endPoint + `/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update Company
export const UpdateCompany = async (param) => {
  const {
    id,
    value: { name, logo },
  } = param;
  try {
    const { data } = await http.put(editBrand.endPoint + `/${id}`, {
      withCredentials: true,
      data: { name: name, logo: logo },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Create Model
export const PostModel = async (param) => {
  try {
    const { data } = await http.post(editModel.endPoint, {
      withCredentials: true,
      data: param,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete Model
export const DeleteSelectedModel = async (param) => {
  const { id } = param;
  try {
    const { data } = await http.delete(deleteModel.endPoint + `/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update Model
export const UpdateModel = async (param) => {
  const { id, value } = param;
  try {
    const { data } = await http.put(editModel.endPoint + `/${id}`, {
      withCredentials: true,
      data: { name: value },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Create Categories
export const CreateProduct = async (details) => {
  try {
    const { data } = await http.post(postProduct.endPoint, {
      // withCredentials: true,
      data: { ...details },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update Produce
export const UpdateProduct = async (details) => {
  try {
    const { data } = await http.put(postProduct.endPoint + `/${details.id}`, {
      // withCredentials: true,
      data: { ...details },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//delete product
export const DeleteSelectedProduct = async ({ id }) => {
  try {
    const { data } = await http.delete(deleteProduct.endPoint + `/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Products
export const GetAllProducts = async () => {
  try {
    const { data } = await http.get(getAllProducts.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Products
export const GetOrdersWithUser = async (_payload) => {
  try {
    const { data } = await http.get(
      getOrdersWithUser.endPoint + `${_payload}?populate=deep,3`
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get Product By Id
export const GetProductById = async (id) => {
  try {
    const { data } = await http.get(
      getProductById.endPoint + `/${id}?populate=deep,3`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Products
export const GetProductMediaById = async (id) => {
  try {
    const { data } = await http.get(
      getProductMediaById.endPoint + id + "?populate[0]=media",
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Delete Product Media
export const DeleteProductMediaById = async (id) => {
  try {
    const { data } = await http.delete(deleteProductMediaById.endPoint + id, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Get All Product Media
export const GetAllProductMedia = async () => {
  try {
    const { data } = await http.get(getAllProductMedia.endPoint, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Add product media
export const PostProductMedia = async (files) => {
  try {
    const { data } = await http.post(
      postProductMedia.endPoint,
      // withCredentials: true,
      files
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Update Model
export const PostProductMediaWithOutImage = async (order, id) => {
  try {
    const { data } = await http.put(postProductMedia.endPoint + `/${id}`, {
      withCredentials: true,
      data: { order },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//Get all slider images
export const GetAllSliderImages = async () => {
  try {
    const { data } = await http.get(
      getAllSliderImages.endPoint
      // withCredentials: true,
    );

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//modify order status
export const ModifyOrderStatus = async (_payload) => {
  const { id, status } = _payload;
  try {
    const { data } = await http.put(updateOrderStatus.endPoint + `/${id}`, {
      data: { OrderStatus: status },
    });

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
