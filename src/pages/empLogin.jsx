import axios from 'axios';
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';


const EmpLogin = () => {

    const navigate= useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

const handleSubmit=(e)=>{
    e.preventDefault()

    if (username==null){
        setErrorMessage("username is null")
         
    }
    if (password==null){
        setErrorMessage("password is null")

    }else{
        axios.post('http://localhost:3000/EmpLogin',{username,password})
        .then(response=>{
            if (response.data.status==="success"){
                localStorage.removeItem("tok")
                localStorage.setItem('tok',response.data.accessToken)

                navigate('/view-trans/'+response.data.id)
            }else{
                console.log("cant log in")
            }
        }).catch(e=>{
            console.log(e)

        })
    }
}




  return (
    <center>

<nav className='navbar '>
        <div className='navdiv'>
            <div className='signin'>
            <h6>Sign In</h6> 
            </div>
        
           {/* <div className='logo'><a href='/reg'>{user.fullname}</a></div> */}
             {/* <ul  >
              <h6>Sign In</h6>
               <li><a href='/dashboard'>Logout</a></li>
             </ul> */}
           </div>
      </nav>
      <h2>Sign In</h2>    
      <div className='container'></div><div className="flex items-center justify-center min-h-screen">
          <div className="mx-auto p-6 bg-white rounded-md shadow-md">
              {/* <h2 className="text-2xl font-semibold mb-6 text-center"></h2> */}
              <form onSubmit={handleSubmit}>
                  
                  <div className="mb-4">
                      <label htmlFor="username" className="block mb-2">Username:</label>
                      <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <div className="mb-4">
                      <label htmlFor="password" className="block mb-2">Password:</label>
                      <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                  </div>

                  <button type="submit" className="btn btn-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Login</button>
                  <div className='container'>
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
              </form>
          </div>
      </div>
      </center>
  )
}

export default EmpLogin
