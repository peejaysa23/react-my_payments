import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import './style.css'


var userid
const ShowPayment = () => {



  const navigate=useNavigate()
  const [user,setUser]=useState([])
  const [transactions,setTransactions]=useState([])
  const [userId,setUserId]=useState('')
  

  
  useEffect(()=>{
    
    const id=localStorage.getItem('id')
   
    

if (id){
  userid=id
  setUserId(userid)
  console.log("userid: ",userid)
}else{
  setUserId('')
}

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
  console.log('mmm')
}


  axios.get(`http://localhost:3000/user-transactions/${user.account_number}` )
  .then(result=>{
  setTransactions(result.data)
  console.log(result.data[0])
  localStorage.clear()
  }).catch(err=>{
      console.log(err)
      localStorage.clear()
  })
  },[user.account_number])



  var transDetails=""
transDetails=transactions?.map((item,index)=>{
    return (
        <tr key={index}>
            <td>{item.trans_id}</td>
            <td>{item.sender_account_num}</td>
            <td>{item.sender_name}</td>
            <td>{item.receiver_account_num}</td>
            <td>{item.provider_code}</td>
            <td>{item.currency}</td>
            <td>{item.amount}</td>
            <td>{item.datee}</td>
            <td>
                {/* <Link to="/" className='btn btn-primary'>Pending Process</Link> */}
                <h6> Awaiting Approval</h6>
                
            </td>
            {/* <td>
                <Link to="/" className='btn btn-success'>Process</Link>
                
            </td> */}

        </tr>
    )
});


  return (
    <div>
      <nav className='navbar '>
        <div className='navdiv'>
           <div className='logo'><a href='/reg'>{user.fullname}</a></div>
             <ul className='ui' >
               {/* <li><a href='/reg'>Home</a></li> */}
               <li><a href='/signin'>Logout</a></li>
             </ul>
           </div>
      </nav>
      <div><center><h3>Transaction was successful</h3></center></div>

      <div>
    {/* <button onClick={() => navigate(-1)} className='btn btn-success my-button'>Go back</button> */}

      {/* <button onClick={()=>back}className='btn btn-success my-button'>Back</button> */}
                      <div className='Space'></div>
      <div className='mt-3'>
          <table className='table table-striped'>
              <thead>
                  <th>Transaction ID</th>
                  <th>Sender Account</th>
                  <th>Sender Name</th>
                  <th>Receiver Account</th>
                  <th>Provider Code</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>Transaction Date</th>
                  <th>Action</th>

                </thead>
                <tbody>
                    {transDetails}
                </tbody>
              
          </table>
          {/* <Link to={`/dashboard/${userid}`} className='btn btn-success my-button'>Back</Link> */}
         
          <Link to={`/signin`} className='btn btn-danger my-button'>Logout </Link>
      </div>
    </div>
    </div>
  )
}

export default ShowPayment
