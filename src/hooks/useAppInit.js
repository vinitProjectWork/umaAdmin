import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { allBrands, allBrandsDump } from "../redux/slices/brands/brands";
import {
  accessoriesSubCategory,
  allCategory,
  allCategoryDump,
  allSubCategory,
  allSubCategoryDump,
  audioSubCategory,
} from "../redux/slices/category/category";
import { allModels } from "../redux/slices/models/models";
import { allProductList } from "../redux/slices/product/product";
import { allSliderImage } from "../redux/slices/slider/slider";
import {
  GetAllBrandList,
  GetAllCategories,
  GetAllModelsList,
  GetAllProducts,
  GetAllSliderImages,
  GetAllSubCategories,
} from "../services";

const useAppInit = () => {
  const dispatch = useDispatch();

  // const [totalRows, setTotalRows] = useState(1);
  // const [perPage, setPerPage] = useState(10);

  //get all brands
  useLayoutEffect(() => {
    // GetAllBrandList({ totalRows, perPage })
    GetAllBrandList()
      .then((resp) => {
        if (resp.data.length > 0) {
          const _data = resp.data.map((item) => {
            return {
              label: item.name,
              value: item.id,
              options: item.models.map((modelDetail) => {
                return {
                  // label: item.name + " " + modelDetail.name,
                  label: modelDetail.name,
                  value: modelDetail.id,
                  brand: item.id,
                };
              }),
            };
          });
          dispatch(allBrands([..._data]));
          dispatch(allBrandsDump({ ...resp }));
        }
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, []);

  //get all categories and sub categories
  useLayoutEffect(() => {
    GetAllCategories()
      .then((resp) => {
        if (resp.data.length > 0) {
          const _data = resp.data.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
          dispatch(allCategory([..._data]));
          dispatch(allCategoryDump({ ...resp }));
        }
      })
      .catch((err) => toast.error("Something went wrong"));

    GetAllSubCategories()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allSubCategory([...resp.data]));
          dispatch(allSubCategoryDump({ ...resp }));
          dispatch(audioSubCategory([...resp.data].slice(0, 4)));
          dispatch(accessoriesSubCategory([...resp.data].slice(4)));
        }
      })
      .catch((err) => toast.error("Something went wrong"));
  }, []);

  //get all models
  useLayoutEffect(() => {
    GetAllModelsList()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allModels(resp));
        }
      })
      .catch((err) => toast.error("Something went wrong!!"));
  }, []);

  //get all products
  useLayoutEffect(() => {
    GetAllProducts()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allProductList(resp.data));
        }
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, []);

  //get all slider images
  useLayoutEffect(() => {
    GetAllSliderImages()
      .then((resp) => {
        if (resp.data.length > 0) {
          dispatch(allSliderImage(resp.data));
        }
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, []);
};

export default useAppInit;
