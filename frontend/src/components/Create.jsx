import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import MyDatePickerField from './forms/MyDatePickerField'
import MyTextField from './forms/MyTextField'
import MyMultiLineField from './forms/MyMultiLineField';
import MySelectField from './forms/MySelectField'
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react';
import AxiosInstance from './Axios';
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import MyMultiSelectField from './forms/MyMultiSelectField';

const schema = yup
  .object({
      name: yup.string().required('Name is a required field'),
      projectmanager: yup.string().required('Project Manager is a required field'),
      employees: yup.array().min(1, 'Pick at least one option from the select field'),
      status: yup.string().required('Status is a required field'),
      comments: yup.string(),
      start_date: yup.date().required('Start Date is a required field'),
      end_date: yup.date().required('End Date is a required field').min(yup.ref('start_date'), 'The end date can not be before the start date'),
  })

function Create() {
  const navigate = useNavigate();
  const [projectmanager,setProjectmanager] = useState([])
  const [employees,setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
   
  useEffect(() => { 
    AxiosInstance.get('projectmanager/') 
    .then(response => {
      setProjectmanager(response.data); 
      console.log(response.data); 
    }) 
    .catch(err => { console.log(err); });
    
    AxiosInstance.get(`employees/`).then((res) =>{
      setEmployees(res.data)
      setLoading(false)
    })
    }, []);
  const hardcoded_options = [
    {id:'', name:'None'}, 
    {id:'Open', name:'Open'}, 
    {id:'In progress', name:'In progress'}, 
    {id:'Completed', name:'Completed'}, 
  ]
  const defaultValues = {
    name: '',
    comments: '',
    status: '',
  }
  const {handleSubmit, control} = useForm({defaultValues: defaultValues, resolver:yupResolver(schema)})
  const submission = (data) => {
    console.log(data);
    const StartDate = dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = dayjs(data.end_date["$d"]).format("YYYY-MM-DD");
    AxiosInstance.post(`project/`,{
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    })
    .catch(error=>{console.log(error)})
    .then(response=>{
      console.log(response);
      navigate(`/`);
    })
  }
  return (
    <div>
    {loading?<p>Loading...</p>:
    
      <form onSubmit={handleSubmit(submission)}>

<Box sx={{display:'flex', justifyContent:'space-between',width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
   <Typography sx={{marginLeft:'20px', color:'#fff'}}>
      Create records
   </Typography>

</Box>

<Box sx={{display:'flex', width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>

    <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'40px'}}> 
        <MyTextField
          label="Name"
          name={"name"}
          control={control}
          placeholder="Provide a project name"
          width={'30%'}
          
        />

        <MyDatePickerField
          label="Start date"
          name="start_date"
          control={control}
          width={'30%'}

        />

        <MyDatePickerField
          label="End date"
          name="end_date"
          control={control}
          width={'30%'}

        />

    </Box>

    <Box sx={{display:'flex', justifyContent:'space-around'}}> 
        <MyMultiLineField
          label="Comments"
          name="comments"
          control={control}
          placeholder="Provide project comments"
          width={'30%'}
          
        />

        <MySelectField
          label="Status"
          name="status"
          control={control}
          width={'30%'}
          options = {hardcoded_options}
        />
       


          <MySelectField
            label="Project manager"
            name="projectmanager"
            control={control}
            width={'30%'}
            options = {projectmanager}
          />


    </Box>
    <Box sx={{display:'flex', justifyContent:'space-around', marginTop: '40px'}}> 

      <MyMultiSelectField
          label="Employees"
          name="employees"
          control={control}
          width={'30%'}
          options = {employees}
      />

  </Box>
    <Box sx={{display:'flex', justifyContent:'start', marginTop:'40px'}}> 
          <Button variant="contained" type="submit" sx={{width:'30%'}}>
             Submit
          </Button>
    </Box>

</Box>

</form>}
    </div>
  )
}

export default Create