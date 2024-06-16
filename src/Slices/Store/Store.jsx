import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "../Auth"
import AddProductSlice from '../AddProductSlice'
import AllProductsSlice from '../AllProductsSlice'
import DeleteProductSlice from '../DeleteProductSlice'
import ProductDetailsSlice from '../ProductDetailsSlice'
import UpdateProductSlice from "../ProductUpdateSlice"

export const store = configureStore({
  reducer: {
    auth : AuthSlice,
    addproduct : AddProductSlice,
    allproduct : AllProductsSlice,
    deleteproduct : DeleteProductSlice,
    productdetails : ProductDetailsSlice,
    updateproduct : UpdateProductSlice,
  },
})