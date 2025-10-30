const express=require('express')
const mysql=require('mysql')
const cors=require("cors")
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')

const app=express()

PORT=3000

 app.use(bodyParser.urlencoded({ extended: true }))

// // // parse application/json
  app.use(bodyParser.json())

  app.use(cors({
      //origin:"http://localhost:3000",
      methods:["POST","GET","PUT","DELETE","PATCH"],
      credentials:true
  }))
const db=mysql.createConnection({
    host :"localhost",
    user :"root",
    password:"",
    database :"reactDb"
});


//const accessToken=jwt.sign({id:data[0].id},'oursecrete',{expiresIn:'240s'})
const generateAccessToken=(data)=>{
    return jwt.sign({id:data[0].id},'oursecrete',{expiresIn:'600s'})
}
const generateFreshAccessToken=(data)=>{
    return jwt.sign({id:data[0].id},'ourrefreshsecrete',{expiresIn:'600s'})
}

let refreshAccessTokens=[]
const verify=(req,res,next)=>{
    const authHeader=req.headers.authorization

    if (authHeader){
        token=authHeader.split(" ")[1]
        jwt.verify(token,'oursecrete',(err,data)=>{
            if (err) return res.status(403).json('Invalid token')
            req.data=data
            next()
        })
    }else {
        return res.status(401).json("You are not authenticated")
    }
}

app.post('/refreshToken',(req,res)=>{
    const refreshAccessToken=req.body.token

    if (!refreshAccessToken)return res.status(401).json('You are not authenticated')

    if (!refreshAccessToken.includes(refreshAccessToken)){
        return res.status(403).json('Refresh Token not valid')
    }
    jwt.verify(refreshAccessToken,'ourrefreshsecrete',(err,data)=>{
        if (err) return res.status(401).json('You are not authenticated')

        refreshAccessTokens=refreshAccessTokens.filter((token)=>token==refreshAccessToken);
        
        const newAccessToken=generateAccessToken(data)
        const newRefreshAccessToken=generateFreshAccessToken(data)
        refreshAccessTokens.push(refreshAccessToken)

        return res.status(200).json({
            accessToken:newAccessToken,
            refreshAccessToken:newRefreshAccessToken})
        
    })
})


app.post('/login',(req,res)=>{
    var account_number=req.body.account_number
    var username=req.body.username
    var password=req.body.password

    if (!account_number||!username||!password){
        console.log("Fill all fields")
        return res.json({status:"failed",message:"fill all fields"})

    }else{
       
        try{

            sql="SELECT * FROM user WHERE account_number=? AND username=?"
            db.query(sql,[account_number,username],(err,data)=>{
                if (err) return res.json("something happened,try again...")
                if (data.length>0){
                   
                    bcrypt.compare(password.toString(),data[0].password,(err,result)=>{
                        if (err) return res.json({status:"try again"})
                        if (result==true){
                            console.log(data[0])
                            console.log('found')
                            accessToken=generateAccessToken(data)
                            refreshAccessToken=generateFreshAccessToken(data)
                            //const refreshAccessToken=jwt.sign({id:data[0].id},'ourrefreshsecrete',{expiresIn:'240s'})
                            refreshAccessTokens.push(refreshAccessToken)
                           // res.cookie({'accessToken':accessToken,'refreshAccessToken':refreshAccessToken })
                            return res.json({
                                status:"success",id:data[0].id,
                                accessToken,
                                refreshAccessToken})
                        } else{
                            console.log('not found')
                            return res.json({status : "failed"})
                        }
                    })

                }else{
                    return res.json("acc number or username doesnt exist")
                }
            })
    
        }catch(e){
            console.log(e.toString)
        }
    }
   

})



salt=10
app.post('/register',(req,res)=>{
    user=req.body
    account_number=req.body.account_number
    idno=req.body.idnum
    console.log('first')
    console.log(req.body)
    sql1="SELECT * FROM user WHERE account_number=?"
    db.query(sql1,[req.body.account_number],(err,data)=>{
        if (err) return res.json({status:"failed",message :"technical error"})
        if (data.length>0){
            console.log("Account already registered")
            return res.json({status:"failed",message:"Account already exists",registered:"true"})
            
        }else{

            bcrypt.hash(req.body.password.toString(),salt,(err,hash)=>{
                if (err) return res.json("Password Error...")
                console.log(user)
                console.log(account_number)
                console.log(idno)
                console.log("user at the top")
                const ddt=new Date()
                sql="INSERT INTO user (fullname,idnum,account_number,username,password,date_created) VALUES (?,?,?,?,?,?)"
                const values=[req.body.fullname,idno,account_number,req.body.username,hash,ddt]
                
                db.query(sql,values,(err,result)=>{
                    
                if (err) return res.json({status:"failed",message:"Error,, something happened"})
               
                if (result){
                    console.log("user succ")
                 return res.json({status :"success"})
                 }
                console.log('done')
                })
            })
        }
    })

   
        

})

app.post('/EmpLogin',(req,res)=>{

    var username=req.body.username
    var password=req.body.password

    if (!username||!password){
        console.log("Fill all fields")
        return res.json({status:"failed",message:"fill all fields"})

    }else{
       
        try{

            sql="SELECT * FROM employees WHERE username=? AND password=?"
            db.query(sql,[username,password],(err,data)=>{
                if (err) return res.json("something happened,try again...",err)
                if (data.length>0){
                   
                   
                        
                    console.log(data[0])
                    console.log('found')
                    accessToken=generateAccessToken(data)
                    refreshAccessToken=generateFreshAccessToken(data)
                    //const refreshAccessToken=jwt.sign({id:data[0].id},'ourrefreshsecrete',{expiresIn:'240s'})
                    refreshAccessTokens.push(refreshAccessToken)
                    // res.cookie({'accessToken':accessToken,'refreshAccessToken':refreshAccessToken })
                    return res.json({
                        status:"success",
                        id:data[0].id,
                        accessToken,
                        refreshAccessToken})
                        
                   

                }else{
                    return res.json("user doesnt exist")
                }
            })
    
        }catch(e){
            console.log(e.toString)
        }
    }

})

app.get('/view-trans',(req,res)=>{
    sql="SELECT * FROM transactions"
    
    db.query(sql,(err,result)=>{
        if (err) return res.json({status:"failed" })
        if (result.length>0){
            return res.json({status:"success",data:result})
        }else{
            return res.json({status:"success",data:"no transactions"})
        }
    })
})


app.get('/user-transactions/:acc',(req,res)=>{
    var account_num=req.params.acc

    sql="SELECT * FROM transactions WHERE sender_account_num=?"
    db.query(sql,[account_num],(err,data)=>{
        if (err) return res.json(err)
        if (data) return res.json(data)
    })
})

app.get('/user/:id',verify,(req,res)=>{
    var id=req.params.id

    sql="SELECT * FROM user WHERE id=?"
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json(err)
        if (data) return res.json(data)
    })

})
app.get('/emp/:id',verify,(req,res)=>{
    var id=req.params.id

    sql="SELECT * FROM employees WHERE id=?"
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json(err)
        if (data) return res.json(data)
    })

})
app.get('/transactions',(req,res)=>{
    var id=req.params.id
    
    sql="SELECT * FROM transactions"
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json(err)
        if (data) return res.json({data:data})
    })

})
app.get('/transaction/:trans_id',(req,res)=>{
    var id=req.params.trans_id
    
    sql="SELECT * FROM transactions WHERE trans_id=?"
    db.query(sql,[id],(err,data)=>{
        if (err) return res.json(err)
        if (data) return res.json({data})
    })

})


app.put('/update/:id',(req,res)=>{
    var id=req.params.id

    sql="UPDATE users SET fname=?,surname=?,email=? WHERE id=?"
    db.query(sql,[req.body.fname,req.body.surname,req.body.email,id],(err,result)=>{
        if (err) return res.json ({"message ": err})
        if (result) return res.json("user updated")
    })
})



app.post('/trans/:id',verify,(req,res)=>{
    var id =req.params.id
    
  console.log(req.body)
    var provider_code=req.body.provider_code
    var currency=req.body.currency
    var amount=req.body.amount
    var rec_account=req.body.rec_account

    if (!provider_code||!currency||!amount||!rec_account){
        console.log("fill all required fields")
        return res.json({status:"failed",message:"fill all required fields"})
    }else{

    sql1="SELECT * FROM user WHERE id=?"
    db.query(sql1,[id],(err,result1)=>{
        if (err)return res.json({status:"failed",error:err})
        if (result1){
      
            
    var dt=new Date()
    var trans_id=getRandomNumTransID(1,999999999)
    values=[trans_id,result1[0].account_number,result1[0].fullname,provider_code,currency,amount,rec_account,'',dt,'Pending']
    sql="INSERT INTO transactions (trans_id,sender_account_num,sender_name,provider_code,currency,amount,receiver_account_num,receiver_names,datee,status) VALUES (?,?,?,?,?,?,?,?,?,?)"
    
     
    db.query(sql,values,(err,result)=>{
      
        if (err) return console.log(err)
        
        if(result){
            console.log('trans done...')
            return res.json({status:"success"})
        }else{
            console.log('failed')
            return res.json({status:"failed"})
           
        }
     }) 
         
        }
    })

    }

    
})


app.get('/verification/:id',(req,res)=>{
    var id=req.params.id
    sql="SELECT * FROM transactions WHERE trans_id=?"
    db.query(sql,[id],(err,result)=>{
        if (err) return res.json(err)
        if (result.length>0){
            console.log(result[0].provider_code)

            sql2="SELECT * FROM bank_codes WHERE code=?"
            db.query(sql2,[result[0].provider_code],(err1,result1)=>{
                if (err1) return res.json(err1)
                if (result1.length>0){
                    console.log(result1[0].bank)
                    return res.json({status :"success",bank:result1[0].bank})
                } else{
                    console.log("nothin")
                    return res.json({status:"failed"})
                }
            })

            //return res.json({status:"success",data:result})
        }else{
            console.log("incorrect trans details")
        }
    })
})
app.patch("/updateStatus1/:id",(req,res)=>{
    id=req.params.id
    bank=req.body.bank
    console.log("BNK ",bank)
    if (!bank){
        console.log("no bank")
    }
    sql="UPDATE transactions SET status='Failed' WHERE trans_id=?"
    db.query(sql,[id],(err,result)=>{
        if (err) console.log(err)
        if (result){
            return res.json({status:"success"})
        }
    })
})
app.patch("/updateStatus/:id",(req,res)=>{
    id=req.params.id
    bank=req.body.bank
    var trans_status='Approved'
    console.log("BNK ",bank)
    if (bank==''||bank=='undefined'){
        console.log("no bank")
        trans_status="Failed"
    }
    sql="UPDATE transactions SET status=? WHERE trans_id=?"
    db.query(sql,[trans_status,id],(err,result)=>{
        if (err) console.log(err)
        console.log("trans_status " ,trans_status)
        if (result){
            return res.json({status:"success"})
        }
    })

})

function getRandomNumTransID(min,max){
    min=Math.ceil(min)
    max=Math.ceil(max)
    return Math.floor(Math.random()* (max-min+1))+min
}


app.post('/logout',verify ,(req,res)=>{
    const refreshToken=req.body.token
    refreshAccessTokens=refreshAccessTokens.filter((token)=>token!==refreshToken);
    console.log('You logged out successfully')
    res.status(200).json({status:"success"})
})

app.listen(PORT,()=>{
    console.log(`connected to port ${PORT}`)
})