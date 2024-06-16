import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AddProductPost = createAsyncThunk("ADD/ PRODUCT", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/product/create`,data)
        console.log("ADD_PRODUCT_RESPONSE...", response)
        const result = response.data
        return result
    } catch (error) {
        console.log("ADD/ PRODUCT_Error....", error)
        return error
    }
})

const AddProductSlice = createSlice({
    name : "addProduct",
    initialState : {
        data : [],
        loading : false,
        error : null,
        redirectToAllProducts: null
    },
    reducers : {
        reset_redirectToAllProducts : (state,action)=>{
            state.redirectToAllProducts = null;
        }
    },

    extraReducers : (builder)=>{
        builder.addCase(AddProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AddProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
                localStorage.setItem("prodName", action?.payload?.data?.title )
                state.redirectToAllProducts = "/allproducts"
            }
        })
        builder.addCase(AddProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})

export const {reset_redirectToAllProducts} = AddProductSlice.actions

export default AddProductSlice.reducer