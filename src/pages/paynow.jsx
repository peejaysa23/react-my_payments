import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import './style.css'


//  const Details: FC<{}> =(this.props)=>
//  const {this.state}=useLocation();
//const ob=this.props.this.state
let x=''
// let fullname=''
// let sender_account_num=''
const Paynow = () => {
 const[values,setValues]=useState({
   rec_account:"",
   provider_code:""
 
 })
//  const location=useLocation();
const {id}=useParams()
 const [errorMessage, setErrorMessage] = useState('');
 const  navigate=useNavigate()

const [userData,setUserData]=useState([])
const validateAccountNumber = (rec_account) => {
  // Example regex for 9-18 digit numbers (common for many banks)
  const regex = /^[0-9]{9,18}$/; 
  if (!regex.test(rec_account)) {
    setErrorMessage('Invalid account number format.');
    return false;
  }
  return rec_account;
};

function isValid_SWIFT_Code(swift_code) {
  // Regex to check valid
  // SWIFT CODE
  let regex = new RegExp(/^[A-Z]{4}[-]{0,1}[A-Z]{2}[-]{0,1}[A-Z0-9]{2}[-]{0,1}[0-9]{3}$/);

  // SWIFT CODE
  // is empty return false
  if (swift_code == null) {
      return false;
  }

  // Return true if the swift_code
  // matched the ReGex
  if (regex.test(swift_code)=== true) {
      return true;
  }
  else {
      return false;
  }
}

const handleSubmit=async(e)=>{
  e.preventDefault();
 

const storedData=localStorage.getItem('mydata')
var getTok=localStorage.getItem('tok')
if (storedData && getTok){
      const mydata=JSON.parse(storedData)
      x=mydata
    console.log(mydata)
    const provider_code=values.provider_code
    const currency=x.currency
    const amount=x.amount
    const rec_account=values.rec_account

    if (!isValid_SWIFT_Code(provider_code)){
      setErrorMessage("Please Enter a valid Swift Code")

    }else{
      if (validateAccountNumber(rec_account)===rec_account){
        console.log('valid AC--------------------------')
        await axios.post('http://localhost:3000/trans/'+id,{provider_code,currency,amount,rec_account},{headers:{'Authorization':'Bearer '+getTok}})
      
        .then(response=>{
          if (response.data.status==="success"){
                setErrorMessage('transaction successful')
                console.log('transaction done')
              
                localStorage.setItem('id',id)
                //navigate('/dashboard/'+id)
                navigate('/show-payment/'+id)
               
          }else{
                console.log('error in sending trans')
                navigate(`/dashboard/${id}`)
          }
        }).catch(err=>{
            console.log(err)
            setErrorMessage("Transaction failed")
        })
      } else{
            console.log('INvalid AC************************')
            setErrorMessage("Invalid Account Number")
      }
    }



  }else{
    navigate('/signin')
  }
}
useEffect(()=>{
  const tk=localStorage.getItem('tok')
  if (tk){
    axios.get('http://localhost:3000/user/'+id,{headers:{'Authorization':'Bearer '+tk}})
    .then(result=>{
      //console.log(result.data[0])
      setUserData(result.data[0])
    }).catch(err=>{
      console.log(err.message)
   
    })
  }else{
    navigate('/signin')
  }
 
})


  return (
    <form onSubmit={handleSubmit}>
      <center>

                    <div className=''>
                    <nav className='navbar '>
        <div className='navdiv'>
           <div className='logo'><a href='/reg'>{userData.fullname}</a></div>
             <ul  >
               {/* <li><a href='/dashboard'>Dashboard</a></li> */}
               <li><a href='/signin'>Logout</a></li>
             </ul>
           </div>
      </nav>
                      
                    
                    
                   <div className='container'>
                     
                      <h3><center>Fill In Receiver Details</center>   </h3></div>
                      <div className='Space'></div>
                      <div className="mb-4">
                        
                      {/* <h2><center></center></h2> */}
                     
                        <label htmlFor="rec_account" className="block mb-2">Receiver Account :</label>
                        <input
                            type="number"
                            id="currency"
                            value={values.rec_account}
                            //onChange={(e) => setCurrency(e.target.value)}
                            onChange={e=>setValues({...values,rec_account:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="provider_code" className="block mb-2">Provider Code     :</label>
                        <input
                            type="text"
                            id="provider_code"
                            value={values.provider_code}
                            //onChange={(e) => setProvider(e.target.value)}
                            onChange={e=>setValues({...values,provider_code:e.target.value})}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                      
                    <button type="submit" className="btn btn-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-button">Pay Now</button>
                    {/* <button onClick={() => navigate(-1)} className="btn btn-success w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-button " >Back</button> */}
                    
                    <p>{errorMessage}</p>
                    
                    </div>
                    
                    </center>
                </form>
  )
}

export default Paynow
