const BASE_URL = "http://localhost:1337"

export const requestMethodTypes = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
}

export const PRODUCT = `${BASE_URL}/api/products`

const appAPI = {
  getAllCategory: {
    endPoint: `${BASE_URL}/api/categories?populate=*`,
    method: requestMethodTypes.GET
  },
  getAllSubCategory: {
    endPoint: `${BASE_URL}/api/sub-categories?populate=*`,
    method: requestMethodTypes.GET
  },
  getAllModels: {
    endPoint: `${BASE_URL}/api/models?populate=*`,
    method: requestMethodTypes.GET
  },
  getAllBrands: {
    endPoint: `${BASE_URL}/api/brands?populate=*`,
    method: requestMethodTypes.GET
  },
  getAllProducts: {
    endPoint: `${BASE_URL}/api/products?populate=deep,3`,
    method: requestMethodTypes.GET
  },
  getAllProductMedia: {
    endPoint: `${BASE_URL}/api/product-medias?populate=*`,
    method: requestMethodTypes.GET
  },
  createBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.POST
  },
  editBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.PUT
  },
  deleteBrand: {
    endPoint: `${BASE_URL}/api/brands`,
    method: requestMethodTypes.DELETE
  },
  editModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.PUT
  },
  createModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.POST
  },
  deleteModel: {
    endPoint: `${BASE_URL}/api/models`,
    method: requestMethodTypes.DELETE
  },
  postProductMedia: {
    endPoint: `${BASE_URL}/api/product-medias`,
    method: requestMethodTypes.POST
  },
  postProduct: {
    endPoint: `${BASE_URL}/api/products`,
    method: requestMethodTypes.POST
  },
  updateCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.PUT
  },
  deleteCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.DELETE
  },
  postCategory: {
    endPoint: `${BASE_URL}/api/categories`,
    method: requestMethodTypes.POST
  }
}

export const {
  getAllCategory,
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
  getAllProductMedia,
  updateCategory,
  deleteCategory,
  postCategory
} = appAPI
