const express = require("express");
const app = express();
const path =  require("path");
const hbs = require("hbs");
require("./db/conn"); 
const Register = require("./models/registers");
const Payeduser = require("./models/payment");
const { json } = require("express");
const bcrypt =require('bcryptjs');

const PORT  = process.env.PORT ||  3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs"); 
const middleware  = (req, res, next)=>{
  res.send(`Action Prohibited`);
  //next();
}
app.get("/", (req, res) =>{
    res.render("register");
});
app.get("/register", (req, res)=>{
    res.render("register");
});
app.get("/signin", (req, res)=>{
  res.render("register");
});
app.get("/pay", middleware, (req, res)=>{
  res.render("pay");
});

app.get("/repay",  (req, res)=>{
  res.render("repay");
});
app.post("/register", async(req, res)=>{
    try{ 
      const password = req.body.password;
      const cpassword = req.body.cpassword;
      const userage = req.body.age;
      if(userage<18 || userage>65){
        res.send("Age is not valid");
      }
      const useremailll = await Register.findOne({email:req.body.email});
      if(useremailll){
        res.send("Email Already Exists!!");
      }
      if(password === cpassword){
        const registerEmployee = new Register({
          name : req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          age: req.body.age,
          password: req.body.password,
          cpassword: req.body.cpassword
        })
        const registered =  await registerEmployee.save();
        res.status(201).render("pay");
      }else{
        res.send("paswords are not matching")
      }
    }
    catch(error){
      res.status(400).send(error);
    }
})
app.post("/pay", async(req, res)=>{
  try{ 
      const payedcust = new Payeduser({
        name : req.body.name,
        email: req.body.email,
        cardnumber: req.body.cardnumber,
        slot: req.body.slot,
        date: new Date()
      })
      console.log(payedcust.email);
      const registered =  await payedcust.save();
       res.status(201).render("index1", {name: payedcust.name,email:payedcust.email,slot:payedcust.slot});
      //res.send("")
  }
  catch(error){
    res.status(400).send(error);
  }
})
app.post("/repay", async(req, res)=>{
  try{ 
      const payedcust = new Payeduser({
        name : req.body.name,
        email: req.body.email,
        cardnumber: req.body.cardnumber,
        slot: req.body.slot,
        date: new Date()
      })
      const useremail = req.body.email;
      console.log(payedcust);
      // const mq={email:email};
      // var nv={$set:{slot:slot,date:date}};
      // const useremail1=await Payeduser.findOne({email:useremail});
      const useremaill = await Payeduser.deleteOne({email:useremail});
      const registered =  await payedcust.save();
      // Payeduser.updateOne(mq,nv,function(err,res){
      //   if(err) throw err;
      //   console.log("updated");

      // });
      
       res.status(201).render("index1",{name: payedcust.name,email:payedcust.email,slot:payedcust.slot});
  }
  catch(error){
    res.status(400).send(error);
  }
})
app.post("/signin", async(req, res)=>{
    try{
        const email = req.body.email;
        const password =  req.body.password;
        console.log(`${email} and password ${password}`);
        const useremail = await Register.findOne({email:email});
        console.log(useremail);
        const username=useremail.name;
        const useremail1=await Payeduser.findOne({email:email});
        const userslot=useremail1.slot;
        const d = useremail1.date;
          let text = d.toString();
          const d1=new Date();
          let text1=d1.toString();
          let t1="",t2="";
          for(let i = 5; i <7 ;i++) {
          t1+=text[i];
          }
          for(let i = 5; i < 7 ;i++) {
              t2+=text1[i];}
        console.log(d1);
        console.log(d);
        if(useremail.password === password){
          if(t1==t2){
            res.status(201).render("index1",{name: username,email:useremail.email,slot:userslot});
          }
          else{
            res.status(201).render("index",{name: username,email:useremail,slot:userslot});
          }
        }
        else{
          res.send("password are not matching");
        }
    } catch(error){
      console.log(error);
        res.status(400).send("Invalid Email");
    }
});

app.listen(PORT, ()=> {
  console.log(`server running at port no ${PORT}`);
}); 