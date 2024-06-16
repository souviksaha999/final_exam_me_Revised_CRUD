import React from 'react'
import { useDispatch } from 'react-redux'
import { ProfileDetailsFetch } from '../Slices/Auth'
import { useQuery } from '@tanstack/react-query'
import Layout from '../Common/Layout'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'

export default function ProfileDetails() {

    const dispatch = useDispatch()

    const getProfileDetails = async () => {
      try {
        const response = await dispatch(ProfileDetailsFetch())
            console.log("Get_Profile_details....", response)
            return response?.payload?.data
      } catch (error) {
        return error
      }
            
        
    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['profiledetails'],
        queryFn: getProfileDetails,
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <h1>Error: {error.message}</h1>
    }

    console.log("P_Details_DATA....", data )



    return (
        <Layout>
            <Box component="div" sx={{display : "flex", justifyContent: "center", marginTop : "30vh" }}>
                <Card align='center' sx={{ maxWidth: 550 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        // image= {data?.profile_pic}
                        title="green iguana"
                    />
                    <img src={data?.profile_pic} alt="" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            NAME : {data?.first_name} {data?.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Id : {data?._id}
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
