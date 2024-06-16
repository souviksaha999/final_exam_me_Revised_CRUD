import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AllProductPost } from '../Slices/AllProductsSlice';
import { Button, Pagination, Stack, Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { Link } from 'react-router-dom';
import { reset_redirectToAllProducts } from '../Slices/AddProductSlice';
import { DeleteProductPost } from '../Slices/DeleteProductSlice';
import Swal from 'sweetalert2';
import { reset__redirectToAllProducts } from '../Slices/ProductUpdateSlice';






export default function AllProducts() {

    const [page, setPage] = React.useState(1);
    const pageChange = (event, pageNo) => {
        setPage(pageNo);
        dispatch(AllProductPost({
            page : pageNo,
            perpage : 10
        }))
    };


    const { loading, data, error } = useSelector((state) => {
        console.log("ALL_PRODUCT_STATE.....", state?.allproduct)
        return state?.allproduct
    })

    console.log("AllProducts DATA>>>>", data?.data)

    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm()

    console.log(watch(["title", "description"]))

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(AllProductPost());
        dispatch(reset_redirectToAllProducts())
        dispatch(reset__redirectToAllProducts())
    }, [])


    const prodNameRemove = () => {
        localStorage.removeItem("prodName")
    }

    const deleteProduct = async (idd) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({

                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const outcome = dispatch(DeleteProductPost(idd))
                return outcome
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        }).then((outcome) => {
            if (outcome) {
                dispatch(AllProductPost());
            }
        })

        // await dispatch(DeleteProductPost(idd))
        // await
    }


    return (
        <Layout>
            <TableContainer component={Paper} sx={{ marginTop: "100px" }}>
                <Button variant='contained' color='secondary' onClick={prodNameRemove}><Link to="/addproduct" style={{ textDecoration: "none", color: "white" }}>Add Product</Link></Button>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Sl. No</TableCell>
                            <TableCell align="center">Thumbnail</TableCell>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data?.data?.map((item, index) => {
                                return (
                                    <>
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>

                                            <TableCell align="center"><img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${item?.image}`} alt="" height="40px" /></TableCell>
                                            <TableCell align="center">{item._id}</TableCell>
                                            <TableCell align="center">{item.title}</TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{item.status}</TableCell>
                                            <TableCell align="center">
                                                <Button><Link to={`/productdetails/${item._id}`}> <VisibilityOutlinedIcon color='success' /> </Link>  </Button>
                                                <Button onClick={prodNameRemove}> <Link to={`/updateproduct/${item._id}`}><EditNoteOutlinedIcon color='info' /></Link> </Button>
                                                <Button onClick={() => deleteProduct(item._id)}> <DeleteSweepOutlinedIcon color='warning' /> </Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            })
                        }


                    </TableBody>
                </Table>
                {/* <Pagination count={10} variant="outlined" color="secondary" /> */}
                <Stack spacing={2}>
                    <Typography>Page: {page}</Typography>
                    <Pagination count={data?.totalPages} page={page} onChange={pageChange} variant="outlined" color="secondary"/>
                </Stack>

            </TableContainer>

        </Layout>
    )
}
