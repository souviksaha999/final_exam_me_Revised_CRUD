import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const ProductDetailsFetch = createAsyncThunk("DETAILED/ PRODUCT", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/product/detail/${id}`)
        console.log("PRODUCT_DETAILS_RESPONSE...", response)
        const result = response.data
        return result
    } catch (error) {
        console.log("PRODUCT_DETAILS_Error....", error)
        return error
    }
})

const ProductDetailsSlice = createSlice({
    name : "ProductDetails",
    initialState : {
        data : [],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(ProductDetailsFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(ProductDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(ProductDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})


export default ProductDetailsSlice.reducer