import React from 'react'
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Profile from "./Components/Profile";
import { Routes,Route } from "react-router-dom";


function App() {
  return (
<>
<Routes>
<Route path='/signup'  element={<SignUp />} />
<Route path='/'  element={ <SignIn />} />
<Route path='/profile'  element={ <Profile />} />

</Routes>
</>
  )
}

export default App