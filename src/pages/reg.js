//import react  from "react";
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link,useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Reg(){
        // State variables for username, password, and error message
    // const [fname, setFname] = useState('');
    // const [email, setEmail] = useState('');
    // const [surname, setSurname] = useState('');
    // const [password, setPassword] = useState('');

    const [values, setValues] = useState({
        fullname: '',
        idnum: '',
        account_number: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize useNavigate hook for navigation
    const navigate = useNavigate();

    function isValidIDNumber(IDnum) {
        
        const regex = /^[0-9]{13}$/; 
        return regex.test(IDnum);
    }

    function isValidBankAccountNumber(accountNumber) {
        // Example: Basic regex for a 9-11 digit number (adjust based on specific bank requirements)
        const regex = /^[0-9]{9,11}$/; 
        return regex.test(accountNumber);
    }

    

    function isValidPassword(password) {
        
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        return regex.test(password);
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()

        
        if (!isValidBankAccountNumber(values.account_number)){
            setErrorMessage("The Bank Account provided is not valid")
        }
        else{

            if (!isValidIDNumber(values.idnum)){
                setErrorMessage("The ID number is not valid")
    
            }else{
                if (!isValidPassword(values.password)){
                    setErrorMessage('Password should have at least 8 characters including special characters,numbers and letters')
                }else{

                
                try{
                    setErrorMessage('')
                    localStorage.clear()
                    const response=await axios.post('http://localhost:3000/register', values)
                    if (response.data.status === "success"){
                        console.log("registered")
                        setErrorMessage('account registered')
                        navigate(`/signin`)
                    }if (response.data.registered==='true'){
                        console.log("failed")
                        setErrorMessage('account is already registered')
                    }else{
            
                        setErrorMessage('Registration unsuccessfull..please fill details correctly')
                    }
                   }catch(error){
                    
                    console.log(error)
                    setErrorMessage("Failed to register")
                   }
                }
                
            }
           
       
        }
    }
    return(
        <center>
            
            <nav className='navbar '>
        <div className='navdiv'>
            <div className='signin'>
            
            </div>
        
           </div>
      </nav>
      <h2>Sign Up</h2>  
                      <div className='container'>
        <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto p-6 bg-white rounded-md shadow-md">
            {/* <h2 className="text-2xl font-semibold mb-6 text-center"></h2> */}
        <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block mb-2">FullNames:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={values.fullname}
                            //onChange={(e) => setFname(e.target.value)}
                            onChange={e=>setValues({...values,fullname:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="idnum" className="block mb-2">ID Num:</label>
                        <input
                            type="text"
                            id="idnum"
                            value={values.idnum}
                            //onChange={(e) => setSurname(e.target.value)}
                            onChange={e=>setValues({...values,idnum:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="account_number" className="block mb-2">Account Number:</label>
                        <input
                            type="text"
                            id="account_number"
                            value={values.account_number}
                            //onChange={(e) => setEmail(e.target.value)}
                            onChange={e=>setValues({...values,account_number:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2"> Username   :</label>
                        <input
                            type="text"
                            id="username"
                            value={values.username}
                            //onChange={(e) => setEmail(e.target.value)}
                            onChange={e=>setValues({...values,username:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
        <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={values.password}
                           // onChange={(e) => setPassword(e.target.value)}
                           onChange={e=>setValues({...values,password:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</button>
                    <div className='container'>
                  <Link to={'/signin'} >Already have an account?</Link></div>
                    {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} {/* Display error message if exists */}
                </form>
                </div>
                </div>
                </div>
                </center>
    );
}
export default Reg