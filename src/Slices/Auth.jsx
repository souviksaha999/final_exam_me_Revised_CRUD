import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../AxiosInstance/Api";
import { toast } from "react-toastify";


export const RegisterPost = createAsyncThunk("Register / user", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/user/signup`, data)
        console.log("REGISTER_RESPONSE........", response)
        const result = response?.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const LoginPost = createAsyncThunk("Login / user", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/user/signin`, data)
        console.log("LOGIN_RESPONSE........", response)
        const result = response?.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const ProfileDetailsFetch = createAsyncThunk("Profile_Details / user", async (arg, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/user/profile-details`)
        console.log("PROFILE_DETAILS_RESPONSE........", response)
        const result = response?.data
        return result
    } catch (error) {
        console.log("ProfileDetails ERror...", error)
        return rejectWithValue(error)
    }
})

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        data: [],
        loading: false,
        error: null,
        redirectToLogin : null,
        redirectToHome : null,
        logoutToggle : false
    },
    reducers : {
        logout : (state,action)=>{
            localStorage.removeItem("name")
            localStorage.removeItem("token")
            state.logoutToggle = false
        },
        regLogout : (state)=>{
            localStorage.removeItem("name")
        },

        check_token : (state,action)=>{
            let token = localStorage.getItem("token")
            if (token!==null && token!==undefined && token!== ""){
                state.logoutToggle = true
            }
        },
        navigateToLogin : (state,action)=>{
            state.redirectToLogin = action.payload
        },    
        navigateToHome : (state,action)=>{
            state.redirectToHome = action.payload
        }
        
    },

    extraReducers : (builder)=>{
        builder.addCase(RegisterPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(RegisterPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
                localStorage.setItem("name", action?.payload?.data?.first_name )
                state.redirectToLogin = "/login"
            }
        })
        builder.addCase(RegisterPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })



        builder.addCase(LoginPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(LoginPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                toast.success(action?.payload?.message)
                localStorage.setItem("name", action?.payload?.data?.first_name )
                localStorage.setItem("token", action?.payload?.token )
                state.redirectToHome = "/"
                state.logoutToggle = true
            }
        })
        builder.addCase(LoginPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })



        builder.addCase(ProfileDetailsFetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(ProfileDetailsFetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action.payload
            if (action?.payload?.status === 200) {
                // toast.success(action?.payload?.message)
            }
        })
        builder.addCase(ProfileDetailsFetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
            if (action?.payload) {
                toast.success(action?.payload?.message)
            }
        })
    }
})

export const {logout, regLogout, check_token, NavigateToLogin, NavigateToHome} = AuthSlice.actions

export default AuthSlice.reducer