import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ViewTransactions = () => {
  //const navigate=useNavigate()
    const [transactions,setTransaction]=useState([])
    const [user,setUser]=useState([])
    const {id}=useParams()

    useEffect(()=>{

      var token=localStorage.getItem('tok')
      if (!token){
        console.log("no tik")
      }else{
        const tk=token
        
      axios.get('http://localhost:3000/emp/'+id,{headers :{'authorization':'Bearer '+tk}})
    .then(result=>{
      if (result.data){
        setUser(result.data[0])
        console.log(result.data[0])
        localStorage.setItem("myid",id)

      }else{
        console.log('not found')
        
      }
    }).catch(err=>{
      console.log(err)
    })
  }
    },[id])

    axios.get('http://localhost:3000/view-trans')
    .then((response)=>{
        setTransaction(response.data.data)
    })
    .catch((err)=>{
        console.log(err)
    })

    var transDetails=""
    transDetails=transactions?.map((item,index)=>{
        return (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{item.trans_id}</td>
                <td>{item.sender_account_num}</td>
                <td>{item.sender_name}</td>
                <td>{item.receiver_account_num}</td>
                <td>{item.provider_code}</td>
                <td>{item.currency}</td>
                <td>{item.amount}</td>
                <td>{item.datee}</td>
                <td>{item.status}</td>
                <td>
               {
                 item.status==='Approved'?
                 (
                  <Link to={`/verify/${item.trans_id}`} className='btn btn-primary disabled'>Verified</Link>

                 ):item.status==='Failed'?
                 (
                  <Link to={`/verify/${item.trans_id}`} className='btn btn-danger disabled'>Verified</Link>
                   
                 ):
                 
                 (
                  <Link to={`/verify/${item.trans_id}`} className='btn btn-success'>Verify</Link>

                 )
               }
                 
                   
                    
                </td>
                <td>
                    {/* <Link to="/" className='btn btn-success'>Approve</Link> */}
                    
                </td>
    
            </tr>
        )
    });





  return (
    <div>
      <nav className='navbar '>
        <div className='navdiv'>
           <div className='logo'><a href='/reg'>{user.fname} {user.surname} </a></div>
             <ul className='ui' >
               {/* <li><a href='/reg'>Home</a></li> */}
               <li><a href='/empLogin'>Logout</a></li>
             </ul>
           </div>
      </nav>
      <div><center><h2>Transactions</h2></center></div>
      {/* <button onClick={() => navigate(1)} className='btn btn-success'>Go forward</button> */}
      <div>
        
                      <div className='Space'></div>
      <div className='mt-3'>
          <table className='table table-striped'>
          
      
              <thead>
                  <td>No</td>
                  <th>Transaction ID</th>
                  <th>Sender Account</th>
                  <th>Sender Name</th>
                  <th>Receiver Account</th>
                  <th>Provider Code</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>Transaction Date</th>
                  <th>Status</th>
                  <th>Action</th>

                </thead>
                <tbody>
                    {transDetails}
                </tbody>
              
          </table>
      </div>
    </div>
    </div>
  )
}

export default ViewTransactions
