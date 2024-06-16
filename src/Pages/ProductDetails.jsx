import React from 'react'
import Layout from '../Common/Layout'
import { useParams } from 'react-router-dom'
import { ProductDetailsFetch } from '../Slices/ProductDetailsSlice'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'




export default function ProductDetails() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const getProdDetails = async () => {
        try {
            const response = await dispatch(ProductDetailsFetch(id))
            console.log("Get_Product_details....", response)
            return response?.payload?.data
        } catch (error) {
            return error
        }
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['productdetails'],
        queryFn: getProdDetails,
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>
    }

    console.log("Prod_Details_DATA....", data)

    return (
        <Layout>
            <Box component="div" sx={{display : "flex", justifyContent: "center", marginTop : "30vh" }}>
            <Card sx={{ maxWidth: 500}}>
                <CardMedia
                    // sx={{ height: 140 }}
                    // image={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data?.image}`}
                    title="green iguana"
                />
                <img src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${data?.image}`} alt=""height="350px" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title : {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Id : {data._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        description : {data.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status : {data.status}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
            </Box>
        </Layout>
    )
}
