import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const AllProductPost = createAsyncThunk("ALL/ PRODUCT", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/product/list`,data)
        console.log("ALL_PRODUCT_RESPONSE...", response)
        const result = response.data
        return result
    } catch (error) {
        console.log("ALL/ PRODUCT_Error....", error)
        return error
    }
})

const AllProductSlice = createSlice({
    name : "allProduct",
    initialState : {
        data : [],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(AllProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AllProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(AllProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})


export default AllProductSlice.reducer