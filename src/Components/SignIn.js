import React,{useState,useEffect} from 'react'
 import {Box,Grid,TextField,Card,CardContent,Button,Typography} from '@mui/material/';

import axios from '../AxiosConfig/AxiosConfig'


import { useNavigate } from "react-router-dom";


function SignIn() {


    const navigate = useNavigate();

    const [state,setState] = useState({
        username:'',
        password:'',
    })


    useEffect(()=>{
        if(localStorage.getItem('user')){
           navigate('/profile') 
        }
    })

    const [error,setError] = useState({
        message : ''
    })

    const OnChangeHandler = (e) =>{
        setState((prevState)=>{
        return {...prevState,[e.target.name]:e.target.value}
        })
       }


       const OnSUbmitdata = () =>{

        console.log(state)
   
        axios.post('/auth/login',state)
        .then(response=>{
         localStorage.setItem('user',JSON.stringify(response.data.details))
         navigate('/profile')
         
        })
        .catch(err=>setError({message:err.response.data.message}))
     
         }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4} style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>

            <Card sx={{ minWidth: 500 }}  style={{height:'60%'}}>
                <CardContent  style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Typography variant="h4" component="h4">
                   Sign In
                    </Typography>
                   {
                    error.message !== '' && 
                    <Typography variant="h4" component="h4">
                    {error.message}
                   </Typography>
                   }
                    <TextField
                        style={{ width: '100%',marginBottom:'10px' }}
                        id="standard-textarea"
                        label="Username"
                        name="username"
                        onChange={(e)=>OnChangeHandler(e)}
                        placeholder="Username"
                        multiline
                        variant="standard"
                    />

                     <TextField
                        style={{ width: '100%',marginBottom:'10px'  }}
                        id="standard-textarea"
                        label="password"
                        name="password"
                        onChange={(e)=>OnChangeHandler(e)}
                        placeholder="password"
                        multiline
                        variant="standard"
                    />
                  <Button variant="contained" onClick={OnSUbmitdata} >SignIn</Button>

                </CardContent>

            </Card>
        </Grid>
        <Grid item xs={4}>
        </Grid>

    </Grid>
    </Box>
  )
}



export default SignIn

