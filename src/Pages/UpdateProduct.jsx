import * as React from 'react';
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../Common/Layout';
import { UpdateProductPost } from '../Slices/ProductUpdateSlice';
import axiosInstance from '../AxiosInstance/Api';
import axios from 'axios';
import { ProductDetailsFetch } from '../Slices/ProductDetailsSlice';

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





export default function UpdateProduct() {
    const { id } = useParams()

    const prodData = { id: "", title: "", description: "" }

    let [prod, setProd] = React.useState(prodData)

    const [image, setimage] = React.useState()

    const imageChange = (e) => {
        setimage(e.target.files[0])
        console.log(e.target.files)
    }



   
    // React.useEffect(() => {
    //     // if (ProdDetailsData && id) {
    //         reset({
    //             id: id,
    //             title: ProdDetailsData?.data?.data?.title,
    //             description: ProdDetailsData?.data?.data?.description,
    //             image: ProdDetailsData?.data?.data?.image,
    //         })
    //     // }
    // }, [id])





    const { loading, data, error, redirectToAllProducts } = useSelector((state) => {
        // console.log("UPDATE_PRODUCT_STATE.....", state?.updateproduct)
        return state?.updateproduct
    })

    const { register, watch, reset, formState: { errors }, handleSubmit,setValue } = useForm()

    // console.log(watch(["id","title","description"]))

    const dispatch = useDispatch()

    const onsubmit = async (data, e) => {
        e.preventDefault()
        // console.log("DATA....", data)
        const formData = new FormData()
        formData.append("id", id)
        formData.append("title", data.title)
        formData.append("email", data.email)
        formData.append("description", data.description)
        formData.append("image", image)

        dispatch(UpdateProductPost(formData))

    };

    const navigate = useNavigate()

    React.useEffect(() => {
        const RedirectUser = () => {
            let name = localStorage.getItem("prodName")
            let isInLoginPage = window.location.pathname.toLowerCase() === `/updateproduct/${id}`
            if (name !== "" && name !== null && name !== undefined) {
                isInLoginPage && navigate("/allproducts")
            }
        }
        RedirectUser()
    }, [redirectToAllProducts])

// geting the Details Part.............................

    const ProdDetailsData = useSelector((state) => {
        console.log("PROD_DETAILS_STATE.....", state?.productdetails)
        return state?.productdetails
    })

    React.useEffect(() => {
        dispatch(ProductDetailsFetch(id));
    }, []);

    React.useEffect(() => {
        setValue("id", id)
        setValue("title",ProdDetailsData?.data?.data?.title)
        setValue("description",ProdDetailsData?.data?.data?.description)
        // setValue("image",productdata?.image)
    }, [ProdDetailsData?.data?.data, setValue])


    /********************************************************* OR ************************************************************************ */

    // const getProducts = async()=>{
    //     try {
    //         const response = await axiosInstance.get(`/product/detail/${id}`)
    //         console.log("PROD_DETAILS_IN_UPDATE",response)
    //         setProd(response?.data?.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // React.useEffect(()=>{
    //     getProducts();
    // },[])

    // console.log("PRODuctdetails_DATA>>>.", prod)

    
    // React.useEffect(() => {
    //     setValue("id", id)
    //     setValue("title",prod.title,)
    //     setValue("description",prod.description,)
    //     // setValue("image",productdata?.image)
    // }, [prod, setValue])






    if (loading) {
        return <h1>Loading.......</h1>
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
                            Update Product
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>

                                <Grid item xs={12} sm={12}>
                                    <TextField required fullWidth id="id" label="ID " type="text" disabled  {...register("id")} />
                                    <br />
                                    {errors.id?.type === "required" && (<span style={{ color: "red" }}>This Field is required</span>)}
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField required fullWidth id="title" label="Title" type="text"{...register("title", { required: true })} />
                                    <br />
                                    {errors.title?.type === "required" && (<span style={{ color: "red" }}>This Field is required</span>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth id="description" label="Description" type="text" {...register("description", { required: true })} />
                                    <br />
                                    {errors.description?.type === "required" && (<span style={{ color: "red" }}>This Field is required</span>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth type="file" id="files" name='image' accept="image/*" onChange={imageChange} />
                                </Grid>
                                {
                                    image !== "" && image !== undefined && image !== null ? (
                                        <>
                                            <img src={URL.createObjectURL(image)} alt="" height="110px" />
                                        </>
                                    ) :(
                                        <>
                                          {/* {ProdDetailsData?.data?.data?.title?.image=== "" ? (
                                            <img
                                            height="70px"
                                              src={image}
                                              alt=""
                                              className="upload-img"
                                            />
                                          ) : (
                                            <img
                                              height="100px"
                                              src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${ProdDetailsData?.data?.data?.image}`}
                                              alt=""
                                              className="upload-img"
                                            />
                                          )} */}

                                          <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${ProdDetailsData?.data?.data?.image}`} alt="" height="110px"/>
                                        </>
                                      )}
                                      {image === "" && (
                                        <p>Drag or drop content here</p>
                                      )}
                                

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                UPDATE
                            </Button>

                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </Layout>

    );
}