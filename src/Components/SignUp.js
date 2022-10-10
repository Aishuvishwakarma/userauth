import React,{useState,useEffect} from 'react'
 import {Box,Grid,TextField,Card,CardContent,Button,Typography} from '@mui/material/';

 import { useNavigate } from "react-router-dom";

import axios from 'axios'



function SignUp() {


    const navigate = useNavigate();

    const [state,setState] = useState({
        username:'',
        email:'',
        password:'',
    })

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/profile')
        }
    })

    const OnChangeHandler = (e) =>{
        setState((prevstate)=>{
       return {...prevstate,[e.target.name]:e.target.value}
        })
       }


       const OnSUbmitdata = () =>{

        axios.post('http://localhost:8800/api/auth/register',state)
        .then(response=>{
            navigate('/')
        })
        .catch(err=>console.log(err))
     
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
                   Sign Up
                    </Typography>
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
                        label="email"
                        placeholder="email"
                        name="email"
                        onChange={(e)=>OnChangeHandler(e)}
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
                  <Button variant="contained" onClick={OnSUbmitdata} >SignUp</Button>

                </CardContent>

            </Card>
        </Grid>
        <Grid item xs={4}>
        </Grid>

    </Grid>
    </Box>
  )
}



export default SignUp

