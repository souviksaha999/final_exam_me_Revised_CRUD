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
import { LoginPost, regLogout } from '../Slices/Auth';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { useMutation } from '@tanstack/react-query';

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





export default function LoginMutation() {

    const { register, watch, reset, formState: { errors }, handleSubmit } = useForm()

    console.log(watch(["email", "password"]))

    const navigate = useNavigate()

    const { mutate, isPending} = useMutation({
        mutationFn: (data) => dispatch(LoginPost(data)),
        onSuccess: (response) => {
            console.log("login successful", response);
            if (response?.payload?.status === 200) {

                navigate('/')
            }

        },
        onError: (err) => {
            console.log("error detected", err);
        }
    })

    const dispatch = useDispatch()

    const onsubmit = async (data, e) => {
        e.preventDefault()
        console.log("DATA....", data)   //  {email : "souviksaha999@gmail.com", password : "12345" }

        mutate(data)
    };


    const nameRemove = () => {
        dispatch(regLogout())
    }

if (isPending) {
    return <h1>Loadinggggggggggg....</h1>
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
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit(onsubmit)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>


                                <Grid item xs={12}>
                                    <TextField required fullWidth id="email" label="Email Address" type="email" {...register("email", { required: true })} />
                                    <br />
                                    {errors.email?.type === "required" && (<span style={{ color: "red" }}>This Field is required</span>)}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required fullWidth label="Password" type="password" id="password" {...register("password", { required: true })} />
                                    <br />
                                    {errors.password?.type === "required" && (<span style={{ color: "red" }}>This Field is required</span>)}
                                </Grid>

                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/reg" variant="body2" onClick={nameRemove}>
                                        Doesn't have an account? Sign up
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