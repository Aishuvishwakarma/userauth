import React,{useEffect,useState} from 'react'
import {Box,Grid,TextField,Card,CardContent,Button,Typography} from '@mui/material/';
import { useNavigate } from "react-router-dom";

import axios from '../AxiosConfig/AxiosConfig'


function Profile() {

    const navigate = useNavigate();

    const [edit,setEdit]  = useState(false)

    const [state,setState] = useState({
      username:'',
      email:'',
  })

    const [user,setUser] = useState({})

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/')
        }else{
          let data = JSON.parse(localStorage.getItem('user'))
          setUser(data)
          setState({username:data.username, email:data.email})
        }
    },[])



  const OnChangeHandler = (e) =>{
    setState((prevstate)=>{
    return {...prevstate,[e.target.name]:e.target.value}
    })
    }


  const OnSUbmitdata = () =>{

    if(edit){
      console.log(user._id)
      axios.put(`/users/${user._id}`,state)
          .then(response=>{
            localStorage.removeItem('user')
            localStorage.setItem('user',JSON.stringify(response.data.user))
             setUser(response.data.user)
              setEdit(false)
          })
          .catch(err=>console.log(err))
    }else{
      setEdit(true)
    }

   }




console.log(user)

  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4} style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>

            <Card sx={{ minWidth: 500 }}  style={{height:'60%'}}>
                <CardContent  style={{height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <Typography variant="h4" component="h4">
                      Update User
                    </Typography>
                    {edit ? <>
                      <TextField
                        style={{ width: '100%',marginBottom:'10px' }}
                        id="standard-textarea"
                        label="Username"
                        name="username"
                        value={state.username}
                        onChange={(e)=>OnChangeHandler(e)}
                        placeholder="Username"
                        multiline
                        variant="standard"
                    /> 
                    </>
                    : <>
                    <TextField
                        style={{ width: '100%',marginBottom:'10px' }}
                        id="standard-textarea"
                        label="Username"
                        name="username"
                        value={user.username}
                        placeholder="Username"
                        disabled
                        multiline
                        variant="standard"
                    />
                    </>}
                  {
                    edit ? <>
                       <TextField
                        style={{ width: '100%',marginBottom:'10px'  }}
                        id="standard-textarea"
                        label="email"
                        placeholder="email"
                        value={state.email}
                        name="email"
                        onChange={(e)=>OnChangeHandler(e)}
                        multiline
                        variant="standard"
                    />
                    </> : <>
                    <TextField
                        style={{ width: '100%',marginBottom:'10px'  }}
                        id="standard-textarea"
                        label="email"
                        placeholder="email"
                        name="email"
                        value={user.email}
                        multiline
                        variant="standard"
                        disabled
                    />
                    </>
                  }

                   
                  <Button variant="contained" onClick={OnSUbmitdata} >
                    {edit? 'update' : 'edit' }
                  </Button>

                </CardContent>

            </Card>
        </Grid>
        <Grid item xs={4}>
        </Grid>

    </Grid>
    </Box>
  )
}

export default Profile