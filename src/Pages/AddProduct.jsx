import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LoginPost, regLogout } from '../Slices/Auth';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout'
import { AddProductPost } from '../Slices/AddProductSlice';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();


export default function AddProduct() {

    const [image,setImage] = useState()

    const imageChange = (e)=>{
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const {loading,data, error, redirectToAllProducts} = useSelector((state)=>{
        console.log("ADD_PRODUCT_STATE....." , state?.addproduct)
        return state?.addproduct
    })

    const {register,watch,handleSubmit,formState:{errors},reset} = useForm()

    console.log(watch(["title","description"]))

    const dispatch = useDispatch()

    const onsubmit = async(data)=>{
        console.log("DATAAA...", data)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("image", image)

       await dispatch(AddProductPost(formData))
       reset()
    }

    const navigate = useNavigate()

    useEffect(()=>{
        const RegisterUser = ()=>{
            let name = localStorage.getItem("prodName")
            let isInLogInPage = window.location.pathname.toLowerCase() === "/addproduct"
            if (name!== null && name!== undefined && name!== "") {
                isInLogInPage && navigate("/allproducts")
            }
        }
        RegisterUser()
    },[redirectToAllProducts])



const prodNameRemove = ()=>{

}

if (loading) {
    return <h1>Loading.....</h1>
}

  return (
    <Layout>
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Add product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>


              <Grid item xs={12}>
                <TextField required  fullWidth id="title"  label="Title" type="text" {...register("title", { required: true })} />
                <br />
                {errors.title?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>

              <Grid item xs={12}>
                <TextField required  fullWidth label="Description" type="text" id="description" {...register("description", { required: true })} />
                <br />
                {errors.description?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth type="file" id="image" {...register("image", { required: true })} name='image' accept="image/*" onChange={imageChange} />
                <br />
                {errors.image?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
                {
                    image!=="" && image!== null && image!== undefined ? (<>
                    <img src={URL.createObjectURL(image)}  height='100px' />
                    </>) : (<>{image==="" && <p>Drag and Drop Image</p>}</>)
                }
              </Grid>
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </Layout>
  )
}
