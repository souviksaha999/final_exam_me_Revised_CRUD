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
import { RegisterPost } from '../Slices/Auth';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';

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





export default function Register() {

    const [profile_pic, setProfile_pic] = React.useState()

    const imageChange = (e)=>{
        setProfile_pic(e.target.files[0])
        console.log(e.target.files)
    }

    const {loading,data,error,redirectToLogin}= useSelector((state)=>{
        console.log("REGISTER_STATE.....", state?.auth)
        return state?.auth
    })

    const {register, watch, reset, formState : {errors}, handleSubmit} = useForm()

    console.log(watch(["first_name","last_name","email","password"]))

    const dispatch = useDispatch()

  const onsubmit = async(data,e) => {
    e.preventDefault()
    console.log("DATA....", data)
    const formData = new FormData()
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("profile_pic", profile_pic)

     dispatch(RegisterPost(formData))

  };

  const navigate = useNavigate()
  
  React.useEffect(()=>{
    const RedirectUser = ()=>{
        let name = localStorage.getItem("name")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/reg"
        if (name!=="" && name!==null && name!== undefined){
            isInLoginPage && navigate("/login")
        }
    }
    RedirectUser()
  },[redirectToLogin])

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="firstName" label="First Name" type="text"  {...register("first_name", { required: true })} />
                <br />
                {errors.first_name?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" type="text"{...register("last_name", { required: true })} />
                <br />
                {errors.last_name?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>

              <Grid item xs={12}>
                <TextField required  fullWidth id="email"  label="Email Address" type="email" {...register("email", { required: true })} />
                <br />
                {errors.email?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>
              <Grid item xs={12}>
                <TextField required  fullWidth label="Password" type="password" id="password" {...register("password", { required: true })} />
                <br />
                {errors.password?.type === "required" && (<span style={{color : "red"}}>This Field is required</span> )}
              </Grid>
              <Grid item xs={12}>
                <TextField required  fullWidth  type="file" id="files" name='profile_pic' accept="image/*" onChange={imageChange} />
              </Grid>
              {
                profile_pic!== "" && profile_pic!==undefined && profile_pic!==null ? (
                    <>
                    <img src={URL.createObjectURL(profile_pic)} alt="" height="110px" />
                    </>
                ) : (<>{profile_pic==="" && <p>Drag and Drop Image</p>}</>)
              }
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </Layout>
    
  );
}