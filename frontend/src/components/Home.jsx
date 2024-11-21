import React from 'react'
import Node from './Node'
import AxiosInstance from './Axios'
import { useState, useEffect } from 'react'
import {Box, IconButton, Table} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const columns = [
  {
    accessorKey: 'name', // Access nested data with dot notation
    header: 'Project Name',
    size: 150,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 150,
  },
  {
    accessorKey: 'comments', // Normal accessorKey
    header: 'comments',
    size: 200,
  },
  {
    accessorFn: (row)=>{return dayjs(row.start_date).format("DD-MM-YYYY")},
    header: 'Start Date',
    size: 150,
  },
  {
    accessorFn: (row)=>dayjs(row.end_date).format("DD-MM-YYYY"),
    header: 'End Date',
    size: 150,
  },
];

const Home = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
   
  useEffect(() => { 
    AxiosInstance.get('project/') 
    .then(response => {
      setLoading(false); 
      setProjects(response.data); 
      console.log(response.data); 
    }) 
    .catch(err => { console.log(err); }); 
    }, []);
  return (
    <div>
    {loading?
    <p>Loading data</p>
    :<MaterialReactTable
    enableRowActions
    renderRowActions={({row})=>{
      return <Box sx={{ display:'flex', flexWrap:'nowrap', gap:'8px'}}>
            <IconButton
            color='primary'
            component={Link}
            to={`/edit/${row.original.id}`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
            color="error"
            component={Link}
            to={`/delete/${row.original.id}`}
            >
              <DeleteIcon/>
            </IconButton>   
      </Box>
    }} 
    columns={columns} 
    data={projects} />
    }
          
    </div>
  )
}

export default Home
