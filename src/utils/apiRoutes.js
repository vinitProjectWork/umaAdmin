// export const BASE_URL = "https://1f5d-2405-201-2024-d030-5c0e-1e9d-88d3-7100.in.ngrok.io"

import { baseURL } from "./http";

// export const BASE_URL = "http://localhost:1337";
export const BASE_URL = "https://api.umaenterpriseindia.com";
// export const BASE_URL = "https://0a43-42-106-14-153.in.ngrok.io/api/v1/users";

export const requestMethodTypes = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const PRODUCT = `${BASE_URL}/api/products`;

const appAPI = {
  registerUser: {
    endPoint: `${BASE_URL}/api/auth/local/register`,
    method: requestMethodTypes.POST,
  },
  loginUser: {
    endPoint: `${BASE_URL}/api/auth/local`,
    method: requestMethodTypes.POST,
  },
  verifyOtp: {
    endPoint: `${BASE_URL}/api/verify-otp`,
    method: requestMethodTypes.POST,
  },
  resendOtp: {
    endPoint: `${BASE_URL}/api/send-otp`,
    method: requestMethodTypes.GET,
  },
  approveUserAction: {
    endPoint: `${BASE_URL}/api/users-permissions/approve`,
    method: requestMethodTypes.POST,
  },
  blockUserAction: {
    endPoint: `${BASE_URL}/api/users-permissions/block`,
    method: requestMethodTypes.POST,
  },
  getUser: {
    endPoint: `${BASE_URL}/api/users`,
    method: requestMethodTypes.GET,
  },
  getAllCategory: {
    endPoint: `${BASE_URL}/api/categories?populate=*`,
    method: requestMethodTypes.GET,
  },
  getAllOrders: {
    endPoint: `${BASE_URL}/api/orders`,
    method: requestMethodTypes.GET,
  },
  getOrdersWithUser: {
    endPoint: `${BASE_URL}/api/orders/`,
    method: requestMethodTypes.GET,
  },
  getAllSubCategory: {
    endPoint: `${BASE_URL}/api/sub-categories?populate=*`,
    method: requestMethodTypes.GET,
  },
  getAllModels: {
    endPoint: `${BASE_URL}/api/models?populate=*`,
    method: requestMethodTypes.GET,
  },
  getAllBrands: {
    endPoint: `${BASE_URL}/api/brands?populate=deep,3`,
    // endPoint: `${BASE_URL}`,
    method: requestMethodTypes.GET,
  },
  getAllProducts: {
    endPoint: `${BASE_URL}/api/products?sort=id:desc&populate=deep,3`,
    method: requestMethodTypes.GET,
  },
  deleteProductMediaById: {
    endPoint: `${BASE_URL}/api/upload/files/`,
    method: requestMethodTypes.DELETE,
  },
  getProductById: {
    endPoint: `${BASE_URL}/api/products`,
    method: requestMethodTypes.GET,
  },
  getAllProductMedia: {
    endPoint: `${BASE_URL}/api/product-medias?populate=*`,
    method: requestMethodTypes.GET,
  },
  getProductMediaById: {
    endPoint: `${BASE_URL}/api/product-medias/`,
    method: requestMethodTypes.GET,
  },
  createBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.POST,
  },
  editBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.PUT,
  },
  deleteBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.DELETE,
  },
  editModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.PUT,
  },
  createModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.POST,
  },
  deleteModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.DELETE,
  },
  postProductMedia: {
    endPoint: `${BASE_URL}/api/product-medias`,
    method: requestMethodTypes.POST,
  },
  postProduct: {
    endPoint: `${BASE_URL}/api/products`,
    method: requestMethodTypes.POST,
  },
  deleteProduct: {
    endPoint: `${BASE_URL}/api/products`,
    method: requestMethodTypes.DELETE,
  },
  updateCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.PUT,
  },
  deleteCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.DELETE,
  },
  postCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.POST,
  },
  getAllSliderImages: {
    endPoint: `${BASE_URL}/api/slider-image?populate=*`,
    method: requestMethodTypes.GET,
  },
  updateOrderStatus: {
    endPoint: `${BASE_URL}/api/orders`,
    method: requestMethodTypes.PUT,
  },
  updateUser: {
    endPoint: `${baseURL}/api/users`,
    method: requestMethodTypes.PUT,
  },
};

export const {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  approveUserAction,
  blockUserAction,
  updateUser,
  getUser,
  getAllCategory,
  getAllOrders,
  getAllSubCategory,
  postProduct,
  getAllModels,
  editModel,
  deleteModel,
  getAllBrands,
  editBrand,
  deleteBrand,
  createBrand,
  postProductMedia,
  getAllProducts,
  deleteProductMediaById,
  getProductMediaById,
  getProductById,
  getAllProductMedia,
  updateCategory,
  deleteCategory,
  postCategory,
  getAllSliderImages,
  deleteProduct,
  updateOrderStatus,
  getOrdersWithUser,
} = appAPI;
