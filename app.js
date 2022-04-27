
const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
});

app.post('/',(req,res)=>{
    const firstName=req.body.FirstName;
    const lastName=req.body.LastName;
    const email=req.body.Email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName

                }
            }
        ]
    }

    const jsonData=JSON.stringify(data);
    const url='https://us14.api.mailchimp.com/3.0/lists/6a0776bf1d'
   
    const options={
        method:'POST',
        auth:"Manideep:249416cd54a23545e50f3d6403d3224d-us14"
    }


const request=https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else {
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(response.statusCode);
    })
})

    request.write(jsonData);
    request.end();
});

app.post('/failure',(req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT ||3000,()=>{
    console.log("Server is running successfully on port 3000");
});



//API KEY 
//249416cd54a23545e50f3d6403d3224d-us14

//List Id
//6a0776bf1d