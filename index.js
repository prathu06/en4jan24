const express=require("express");
const cors=require("cors");
const nodemailer=require("nodemailer");
const {MongoClient}=require("mongodb");

const app=express();
app.use(cors());
app.use(express.json());

app.post("/save",(req,res)=>{
let data=[req.body.n,req.body.p,req.body.q];
let name=req.body.n;
let txt="name= "+name+" phone= "+req.body.p+" query= "+req.body.q;
let transporter=nodemailer.createTransport({
service:"gmail",
auth:{
user:"prathameshyadav334@gmail.com",
pass:"ijtbiiaqpmzinbsi"
}
})
let mailOptions={
from :"prathameshyadav334@gmail.com",
to :"prathameshyadav@ternaengg.ac.in",
subject:"Enquiry from "+name,
text:txt
}

transporter.sendMail(mailOptions,(err,info)=>{
if(err){
console.log("mail err "+err);
res.status(500).json(err);
}
else{
console.log("mail sent "+info.response);
const url="mongodb+srv://prathameshyadav334:xyjggWZmPcdZod1D@cluster0.q451ia1.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(url);
const db=client.db("en4jan24");
const coll=db.collection("student");
const doc={"name":req.body.n,"phone":req.body.p,"query":req.body.q};

coll.insertOne(doc)
.then(result=>res.send(result))
.catch(error=>res.send(error));

}
})
});
app.listen(9000,()=>{console.log("Ready @9000");});




















