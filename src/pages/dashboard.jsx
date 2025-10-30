import axios from 'axios'
import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import './style.css'





const Dashboard = () => {
  const navigate=new useNavigate()
    var curr=[
      {label: "$US",value:"$US"},
      {label: "SA RAND",value:"SA RAND"},
      {label: "BRITISH POUND",value:  "POUND"},
      {label: "PULA",value: "PULA"},
    
     
    ]

    var prov=[
      {label: "SWIFT",value: "SWIFT"}
    ]

    //const[providerCode,setProviderCode]=useState('')
  
  const [user,setUser]=useState([])
  //const [currValue,setCurrencyValue]=useState('')

    // const [amount, setAmount] = useState('');
    // const [currencyy, setCurrency] = useState('');
    // const [provider, setProvider] = useState('');
    // const [fname, setFname] = useState('');

    // function handleSelectCurr(event){
    //   setCurrencyValue(event.target.value)
    // }
    // function handleSelectPro(event){
    //   setProviderCode(event.target.value)
    // }
    // const handleChange = (event) => {
    //   setCurrencyValue(currValue, event.target.value); // Updates the state
    //   console.log("New value:", event.target.value); // Logs the current value from the event
    // };
    const [values,setValues]=useState({
      fname :'',
      amount:'',
      currency:'',
      provider:'',

    })
    //const [errorMessage, setErrorMessage] = useState('');
  const {id}=useParams()
  

  const handleSubmit=()=>{
     
     localStorage.setItem('mydata',JSON.stringify(values));
    
      navigate(`/paynow/${id}`)

  }
    
    useEffect(()=>{

      var getTok=localStorage.getItem('tok')
      if (getTok){
        const tk=getTok
        console.log(tk)
      
        axios.get('http://localhost:3000/user/'+id,{headers :{'authorization':"Bearer " +tk}})
        .then(result=>{
          setUser(result.data[0])
        })
        .catch(err=>console.log(err))
      }else{
        navigate('/signin')
      }
    })

  return (
    <form onSubmit={handleSubmit}>
      <center>
                    
                      {/* <div className='App-header'><h2>{user.fullname} Fill In Transaction Details </h2></div>
                      <div className='Space'></div> */}
                      <nav className='navbar '>
        <div className='navdiv'>
           <div className='logo'><a href='/reg'>{user.fullname}</a></div>
             <ul  >
               {/* <li><a href='/reg'>Home</a></li> */}
               <li><a href='/signin'>Logout</a></li>
             </ul>
           </div>
      </nav>
                      <div className='container'>
                      <h5>Amount to Transfer</h5>
                    <div className="mb-4">
                      
                      
                    
                        
                        <input
                            type="number"
                            placeholder='e.g 200.00'
                            id="account"
                            value={values.amount}
                            //onChange={(e) => setAmount(e.target.value)}
                            onChange={e=>setValues({...values,amount:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* <select value={currValue} onChange={e=>setValues({...values,currency:e.target.value})}>
                      <option value="$US">$US</option>
                      <option value="RAND">RAND</option>
                      <option value="PULA">PULA</option>
                      <option value="POUND">BRITISH POUND</option>
                    </select> */}
                
                    {/* <div className="mb-4">
                        <label htmlFor="currency" className="block mb-2">Currency:</label>
                        <input
                            type="text"
                            id="currency"
                            value={currValue}
                            //onChange={(e) => setCurrency(e.target.value)}
                            onChange={e=>setValues({...values,currency:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div> */}
                     <div className=' combo'>
                      <div className=''>
                        <h5>Select Currency</h5>
                        <select className='form-select ' onChange={e=>setValues({...values,currency:e.target.value})}>
                         
                       {curr.map(option=>(
                         <option value={option.value}>{option.label}</option>
                       ))}
                       
                        </select>
                        <p></p>
                      </div>
                       
                    </div>

                    <div className=' combo'>
                      <div className=''>
                        <h5>Select Provider</h5>
                        
                        <select className='form-select'  onChange={e=>setValues({...values,provider:e.target.value})}>
                         
                       {prov.map(option=>(
                         <option value={option.value}>{option.label}</option>
                       ))}
                        </select>
                        <p></p>
                      </div>
                       
                    </div> 


                    {/* <div className="mb-4">
                        <label htmlFor="provider" className="block mb-2">Provider:</label>
                        <input
                            type="text"
                            id="provider"
                            value={values.provider}
                            //onChange={(e) => setProvider(e.target.value)}
                            onChange={e=>setValues({...values,provider:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div> */}
                     {/* <Link to={'/paynow/'+id} state={values}>More</Link>  */}
                    <button type="submit" className="btn btn-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Proceed</button>
                    {/* {errorMessage && <p className="text-red-500 text-sm whitespace-pre-line text-center mt-4 ">{errorMessage}</p>} Display error message if exists */}
                    {/* <p>{errorMessage}</p> */}
                    </div>
                    </center>
                </form>
  )
}

export default Dashboard
