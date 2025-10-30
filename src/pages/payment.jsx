import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'

const Payment = () => {
const [transactions,setTransactions]=useState([])
useEffect(()=>{
axios.get('http://localhost:3000/transactions')
.then(result=>{
setTransactions(result.data.data)
console.log(result.data.data)
}).catch(err=>{
    console.log(err)
})
})

var transDetails=""
transDetails=transactions.map((item,index)=>{
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
                <Link to="/" className='btn btn-primary'>View</Link>
                
            </td>
            <td>
                <Link to="/" className='btn btn-success'>Process</Link>
                
            </td>

        </tr>
    )
});


  return (
      
    <div>
         <div className='App-header'><h2> Transaction Details </h2> </div>
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
      </div>
    </div>
  )
}

export default Payment
