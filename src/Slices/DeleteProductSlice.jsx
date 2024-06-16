import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const DeleteProductPost = createAsyncThunk("DELETE/ PRODUCT", async(id, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/product/remove`,{id})
        console.log("DELETE_PRODUCT_RESPONSE...", response)
        const result = response.data
        return result
    } catch (error) {
        console.log("DELETE/ PRODUCT_Error....", error)
        return error
    }
})

const DeleteProductSlice = createSlice({
    name : "deleteProduct",
    initialState : {
        data : [],
        loading : false,
        error : null,
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(DeleteProductPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(DeleteProductPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
            }
        })
        builder.addCase(DeleteProductPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})


export default DeleteProductSlice.reducer