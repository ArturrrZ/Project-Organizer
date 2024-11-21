import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField'
import MyTextField from './forms/MyTextField'
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField'
import {useForm} from 'react-hook-form'
import { useState, useEffect} from 'react';
import AxiosInstance from './Axios';
import dayjs from 'dayjs';
import {useNavigate, useParams} from 'react-router-dom';

function Delete() {
  const [loading, setLoading] = useState(true)
  const [myData, setMyData] = useState()

  const MyParam = useParams()
  const MyId = MyParam.id
  useEffect(()=>{
      AxiosInstance.get(`project/${MyId}`)
      .then(res=>{
        console.log(res.data);
        setMyData(res.data);
        setLoading(false);
      })
      .catch(err=>{console.log(err)})
  }, [])

  const navigate = useNavigate();
 
  
  const submission = (data) => {
    AxiosInstance.delete(`project/${MyId}/`)
    .catch(error=>{console.log(error)})
    .then(response=>{
      navigate(`/`);
    })
  }
  return (
    <div>
    {loading?
    <p>Loading data</p>
    :
    
      <Box>

<Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
   <Typography sx={{marginLeft:'20px', color:'#fff'}}>
      Delete Project: {myData.name}
   </Typography>

</Box>

<Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

    <Box sx={{display:'flex', justifyContent:'Start', marginBottom:'40px'}}>             
      <Box>Are you sure that you want to delete project: <b>{myData.name}</b></Box>
    </Box>

    <Button variant="contained" onClick={submission} sx={{width:'30%'}}>
             I'm sure
          </Button>

</Box>

</Box>
}
    </div>
  )
}

export default Delete