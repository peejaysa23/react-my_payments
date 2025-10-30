import axios from 'axios'
//import { response } from 'express'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
const [transaction,setTransaction]=useState([])
const [loading,setLoading]=useState(false)
const [user,setUser]=useState('')
const [text,setText]=useState('')
const [text1,setText1]=useState('')
const [text2,setText2]=useState('')
const [bankk,setBank]=useState('')
const {id}=useParams()
console.log(id)
var tk=''

const navigate= useNavigate()

//var trans_idd
var bank
var myd=localStorage.getItem("myid")
if (myd){
  var x=myd
  //console.log("found",x)
}else{
  console.log("Not found")
}
var tok=localStorage.getItem("tok")

if (tok){
   tk=tok
 
}else{
  console.log("no token")
}
 const handleSubmit=async(e)=>{
  e.preventDefault()

await axios.get('http://localhost:3000/verification/'+transaction.trans_id,{headers:{'authorization':'Bearer '+tk}})
.then(result=>{
  if (result.data.status==='success'){
    console.log(result.data.bank)
    bank=result.data.bank
    setBank(bank)
    
  }else{
    console.log("1234")
    bank=''
    setBank(bank)
  }
}).catch(err=>{
  console.log(err)
})

  console.log("*************")
  setTimeout(()=>{
    setLoading(true)
    setText("Processing...Please wait")
  },1000)
  

if (bank!==''||bank!=='undefined'){
  
  console.log(bank)
   axios.patch('http://localhost:3000/updateStatus/'+transaction.trans_id,{bank})
      
    .then(reslt=>{
      if (reslt.data.status==='success'){
        console.log(bank)
        //setBank(bank)
        if (bank!==''||bank!=='undefined'){
          setLoading(true)
          setText1("Transaction Process Completed ") 
          setBank(bank)
        }else{
          setLoading(true)
          setText1("Transaction Approval Failed ") 
          setBank("Provider code did not match...")
        }
        
      }else{
        console.log("upd failed 1")
        console.log(reslt.data.status)
      }
    }).catch(err=>{
      console.log(err)
    })
    setTimeout(() => {
      navigate(`/view-trans/${x}`)
    }, 8000);
    
}else if (bank!=='Standard Bank'||bank!=='First National Bank'||bank!=='NedBank'||bank!=='Capitec'||bank!=='ABSA'){
  // setBank("Provider code did not match...")
  // setText1("Transaction Approval Failed  ")
  console.log("bnk..",bank)
   axios.patch('http://localhost:3000/updateStatus1/'+transaction.trans_id,{bank})
    
    .then(reslt=>{
      if (reslt.data.status==='success'){
        
       
        if (bank!==''||bank!=='undefined'){
          setLoading(true)
          setText1("Transaction Approved ") 
          setBank(bank)
        }else{
          setLoading(true)
          setText1("Transaction Approval Failed ") 
          setBank("Provider code did not match...")
        }
        
      }else{
        console.log("upd failed 2")
        console.log(reslt.data.status)
      }
    }).catch(err=>{
      console.log(err)
    })

    // setBank("Provider code did not match...")
    // setText1("Transaction Approval Failed  ")  
}

setTimeout(() => {
  setText2("Thank you....")
}, 7000);

setTimeout(() => {
  navigate(`/view-trans/${x}`)
}, 9000);

//   setTimeout(()=>{
   
//     setLoading(true)

//     setText("Completed Successfully")
//     //setText1("Transaction Approved ",setBank(bankk))
//     console.log("454: ***",tk)
//     //axios.put("http://localhost:3000/updateStatus/"+transaction.trans_id,{headers:{'authorization':'Bearer '+tk}})
//     //axios.patch('http://localhost:3000/updateStatus/'+transaction.trans_id,{headers:{'Authorization':'Bearer '+tk}})
    
//     if (bankk!==''||bankk!=='undefined'){
//       axios.patch('http://localhost:3000/updateStatus/'+transaction.trans_id,bankk)
      
//     .then(reslt=>{
//       if (reslt.data.status==='success'){
//         navigate(`/view-trans/${x}`)
//       }
//     }).catch(err=>{
//       console.log(err)
//     })
//     setBank(bank)
//     setText1("Transaction Approved ",setBank(bank))
//     console.log("vbvbvb")
//     }else{
//     axios.patch('http://localhost:3000/updateStatus1/'+transaction.trans_id,bankk)
    
//     .then(reslt=>{
//       if (reslt.data.status==='success'){
//         navigate(`/view-trans/${x}`)
//       }
//     }).catch(err=>{
//       console.log(err)
//     })

//     console.log("spinner")
//     setBank("Provider code did not match...")
//     setText1("Transaction Approval Failed  ",setBank(bank))

//   }
//   },8000)
 }


useEffect(()=>{
console.log("token",tk)
axios.get('http://localhost:3000/emp/'+x,{headers:{'authorization':'Bearer '+tk}})

.then(result=>{
  if (result.data){
    setUser(result.data[0])
    console.log("user : ",result.data[0].fname)
   
  }
}).catch(err=>{
  console.log(err)
})
  
axios.get('http://localhost:3000/transaction/'+id)
.then(response=>{
if (response.data.data){
    console.log("transaction : ",response.data.data[0])
    setTransaction(response.data.data[0])
    
}else{
    //console.log('no data')
}
}).catch(err=> console.log(err))
},[id,x,tk])


  return (
    <div>
                <nav className='navbar '>
        <div className='navdiv'>
           <div className='logo'><a href='/reg'>{user.fname} {user.surname}</a></div>
             <ul  >
            
               <li><a href='/empLogin'>Logout</a></li>
             </ul>
           </div>
      </nav>
    <form onSubmit={handleSubmit} >
     <center><h2><strong>Transaction ID : </strong> {transaction.trans_id}</h2></center>
<div className='veryf-container'>
<div className='container ' style={{ border: '3px solid green', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
      
      <p><strong>Transaction Number:</strong> {transaction.trans_num}</p>
      <p><strong>Transaction ID:</strong> {transaction.trans_id}</p>
      <p><strong>Sender Account Num:</strong> {transaction.sender_account_num}</p>
      <p><strong>Sender Name:</strong> {transaction.sender_name}</p>
      <p><strong>Receiver Account Num:</strong> {transaction.receiver_account_num}</p>
      <p><strong>Currency:</strong> {transaction.currency}</p>
      <p><strong>Amount:</strong> {transaction.amount}</p>
      <p><strong>Provider Code:</strong> {transaction.provider_code}</p>
      <p><strong>Status:</strong> {transaction.status}</p>
      {loading?
    (
      <>
      <div className='status'>
      <h5>Verification Status :{text}  </h5> 
      <p><h5> {bankk}</h5></p>
      <p><h5>{text2}</h5></p>
      
      </div>
    
      </>
    ):(
<>
<div className='status'>
      <p><h5>{text}</h5></p> 
      <p><h5>{text1}</h5></p>
      
      <p><h5>{text2}</h5></p>
      </div>
      

</>
    )  
    }
      <center><button className='btn btn-success' type='submit'>Verify</button></center> 
   
    </div>
    </div>
    </form>
    <button onClick={() => navigate(-1)} className='btn btn-success my-button'>Go back</button>
      
   
    </div>
  )
}

export default Verify
