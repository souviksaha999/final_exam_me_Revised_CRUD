import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";
import { reset_redirectToAllProducts } from "./AddProductSlice";


export const UpdateProductPost = createAsyncThunk("UPDATE/ PRODUCT", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/product/update`,data)
        console.log("UPDATE_PRODUCT_RESPONSE...", response)
        const result = response.data
        return result
    } catch (error) {
        console.log("UPDATE/ PRODUCT_Error....", error)
        return error
    }
})

const UpdateProductSlice = createSlice({
    name : "updateProduct",
    initialState : {
        data : [],
        loading : false,
        error : null,
        redirectToAllProducts : null
    },
    reducers : {
        reset__redirectToAllProducts : (state,action)=>{
            state.redirectToAllProducts = null;
        }
    },

    extraReducers : (builder)=>{
        builder.addCase(UpdateProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(UpdateProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
                state.redirectToAllProducts = "/allproducts"
                localStorage.setItem("prodName", action?.payload?.data?.title)
            }
        })
        builder.addCase(UpdateProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})


export const {reset__redirectToAllProducts} = UpdateProductSlice.actions

export default UpdateProductSlice.reducer