import React,{useEffect} from 'react'

import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('user')){
            navigate('/')
        }
    })

  return (
    <div>Profile</div>
  )
}

export default Profile