import { formToJSON } from "axios"
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
  getAllSubCategory,
  postCategory,
  postProduct,
  postProductMedia,
  updateCategory
} from "../utils/apiRoutes"
import { http } from "../utils/http"

// Get All Categories
export const GetAllCategories = async () => {
  try {
    const { data } = await http.get(getAllCategory.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
export const UpdateCategory = async (id, formdata) => {
  try {
    const { data } = await http.put(
      updateCategory.endPoint + `/${id}`,
      formdata
    )

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
export const DeleteSelectedCategory = async ({ id }) => {
  try {
    const { data } = await http.delete(deleteCategory.endPoint + `/${id}`, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
export const PostCategory = async (formData) => {
  try {
    const { data } = await http.post(postCategory.endPoint, {
      withCredentials: true,
      data: formData
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
export const GetAllSubCategories = async () => {
  try {
    const { data } = await http.get(getAllSubCategory.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
// ?pagination[page]=1&pagination[pageSize]=10
// {
//   perPage, totalRows
// }
export const GetAllModelsList = async () => {
  // const paginationUrl = `?pagination[page]=${totalRows}&pagination[pageSize]=${perPage}`
  try {
    const { data } = await http.get(getAllModels.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Brand
export const GetAllBrandList = async () => {
  try {
    const { data } = await http.get(getAllBrands.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Create Model
export const PostCompany = async (param) => {
  try {
    const { data } = await http.post(createBrand.endPoint, {
      withCredentials: true,
      data: param
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Delete Company
export const DeleteSelectedCompany = async (param) => {
  const { id } = param
  try {
    const { data } = await http.delete(deleteBrand.endPoint + `/${id}`, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Update Company
export const UpdateCompany = async (param) => {
  const { id, value } = param
  try {
    const { data } = await http.put(editBrand.endPoint + `/${id}`, {
      withCredentials: true,
      data: { name: value }
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Create Model
export const PostModel = async (param) => {
  try {
    const { data } = await http.post(editModel.endPoint, {
      withCredentials: true,
      data: param
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Delete Model
export const DeleteSelectedModel = async (param) => {
  const { id } = param
  try {
    const { data } = await http.delete(deleteModel.endPoint + `/${id}`, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Update Model
export const UpdateModel = async (param) => {
  const { id, value } = param
  try {
    const { data } = await http.put(editModel.endPoint + `/${id}`, {
      withCredentials: true,
      data: { name: value }
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Categories
export const CreateProduct = async (details) => {
  try {
    const { data } = await http.post(postProduct.endPoint, {
      withCredentials: true,
      data: { ...details }
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Products
export const GetAllProducts = async () => {
  try {
    const { data } = await http.get(getAllProducts.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Get All Product Media
export const GetAllProductMedia = async () => {
  try {
    const { data } = await http.get(getAllProductMedia.endPoint, {
      withCredentials: true
    })

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}

// Add product media
export const PostProductMedia = async (files) => {
  try {
    const { data } = await http.post(
      postProductMedia.endPoint,
      // withCredentials: true,
      files
    )

    return data
  } catch (err) {
    return Promise.reject(err)
  }
}
