// Import React and necessary hooks
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom'; 


const Signin = () => {
    const [account_number, setAccountNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear previous error messages
            setErrorMessage('');

            if (account_number==null){
                setErrorMessage("Account number must not be empty..")
            }
            // Send login request to server
            await axios.post('http://localhost:3000/login', { account_number,username,password })
            .then(response=>{
                if (response.data.status==="success"){
                   
                    localStorage.setItem('tok',response.data.accessToken)
                    console.log(response.data.accessToken)
                    navigate('/dashboard/'+response.data.id,{headers:{'authorization' :"Bearer " +response.data.accessToken}})
                    //navigate('/dashboard/'+response.data.id)
                    // originalRequest.headers.Authorization=`Bearer ${response.data.accessToken}`
                    // originalRequest._retry=true
                   
                }else{
                    //console.log("wrong credentials")
                    setErrorMessage('Your Username and\nPassword are incorrect.');
                }
            })
            .catch(error=>console.log(error))
            setErrorMessage('Your Username and\nPassword are incorrect.');

            // If login successful, redirect to MainPage
            // if (response.status === 200 && response.data.id!==="undefined") {
            //     navigate('/dashboard/'+response.data.id);
            // }
            // else{
            //     navigate('/signin')
            //     setErrorMessage('Your Username and\nPassword are incorrect.');
            // }
        } catch (error) {
            console.error('Error:', error);

            // If login failed, display error message
            setErrorMessage('Your Username and\nPassword are incorrect.');
        }
    };

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
                      <label htmlFor="account_number" className="block mb-2">Account Number:</label>
                      <input
                          type="number"
                          id="account_number"
                          value={account_number}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
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
                  <Link to={'/reg'} >Create Account</Link></div>
                  {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
              </form>
          </div>
      </div>
      </center>
  )
}

export default Signin
