
var mongoose =require("mongoose");
var express = require('express');
var bodyParser =require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');

var cors=require("cors");
var app = express();
app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/node-demo");

var Schema = mongoose.Schema;
var NameSchema = new Schema({
	firstname:String,
	lastname:String,
    email:  String,
    password: String,
    isAdmin:{type:Boolean,
    	default:false}
},{collection:'user'});
var services = new Schema({
	userid:{type:mongoose.Schema.ObjectId},
	services:String,
	location:String
},{collection:'services'});
var service=mongoose.model('service',services);
var user = mongoose.model('user', NameSchema );
 app.listen(3030,function(){
   console.log("server listening");
 });
 
app.use(cors({origin:"*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:"it is"}));
app.get('/',function(req,res){
// res.cookie('name', 'express').send('cookie set');
if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.get('/users',async function(req,res){
  const alluser= await user.find({isAdmin:false});
  	console.log(alluser);
  	res.send(alluser);
  });

app.post('/signup', (req, res) => {

var myData = new user({
	firstname:req.body.fname,
	lastname:req.body.lname,
	email:req.body.email,
	password:req.body.password,
	isAdmin:false
});
user.findOne({email:req.body.email},function(error,response){
	if(error) throw error;
	else
	{
		if(response !=null)
		{
			res.send(false)
		}
		else{
			res.send(true)
			myData.save();
;
		}
	}
});
});
    app.post('/Login', async (req,res)=>{
	console.log(req.body);
  //   user.findOne({email:req.body.email,password:req.body.password,isAdmin:true},function(error,response){
		// console.log("--------------------", response);
		// if(error)
		// 	throw error;
		// else
		// 	if(response !== null){
		// 	console.log("login");
		// 	res.send(true);
		// 	res.end();
		
  //           }
  //       });
  //           user.findOne({email:req.body.email,password:req.body.password,isAdmin:false},function(error,response){
  //           	if(error)
		// 	throw error;
		// else
		// 	if(response !== null){
		// 	console.log("login");
		// 	res.send(true);
  //           }

		// else{

		// 	res.send(false);
		// }});
         
		const adminUser = await user.findOne({email:req.body.email,password:req.body.password,isAdmin:true});
		if(!adminUser){
			const User = await user.findOne({email:req.body.email,password:req.body.password,isAdmin:false});
			if(!User){
				res.send(false);
			}
			else{
				res.send(User._id);
			}
		}
		else{
			res.send("adminlog");
		}
	});

var userid;
 app.post('/services', (req, res) => {

var mydata = new service({

	services:req.body.servicename,
	location:req.body.location,
	userid:req.body.userid
});
mydata.save();
userid=req.body.userid;
});


 app.get('/displayservices',async (req,res)=>{
   const serv =await service.find();
   res.send(serv)
 });
  app.post('/userservice',async (req,res)=>{
   const serv =await service.find({userid:req.body.userid});
  // console.log(serv)
   res.send(serv)
 });
app.post('/removeuser', async (req,res)=>{
	
	var user1= await user.remove({_id:req.body.userid});
	
	var user2=await service.remove({userid:req.body.userid});


});