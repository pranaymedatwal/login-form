import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";
class signup extends Component {
  constructor()
  {
  	super();
  	this.state={
      fname:"",
      lname:"",
      email:"",
      password:"",
      check:""
    };
    this.OnSubmit=this.OnSubmit.bind(this);
    this.onchangefname=this.onchangefname.bind(this);
    this.onchangelname=this.onchangelname.bind(this);
    this.onchangeemail=this.onchangeemail.bind(this);
    this.onchangepassword=this.onchangepassword.bind(this);
  } 

  onchangefname(event)
  {
	  this.setState({
	    fname:event.target.value
	  });
  }

  onchangelname(event)
  {
	    this.setState({
	      lname:event.target.value
	    });
  }
  

  onchangeemail(event)
  {
	    this.setState({
	      email:event.target.value
	    });
  }


  onchangepassword(event)
  {
	    this.setState({
	      password:event.target.value
	    });
  }

 async OnSubmit(event)
  {
    var count;
    await axios({
    method: 'post',
    url: 'http://localhost:3030/signup',
    data: {
      "fname":this.state.fname,
      "lname":this.state.lname,
      "email":this.state.email,
      "password":this.state.password
    }
    })
    .then(function(response) {
      console.log(response.data)
      if(response.data)
      {
        count=1;
      }
    });
    
    if(count==1)
    {
      this.props.history.push("/login");
    }
    else
    {
      this.setState({
      check:"email address already there" 
    });
  }
  }
  render() {
    return (
      <div>
      <div class="rows">
      <div class="col-sm-3">
      </div>
      <div class="col-sm-6">
          <div class="panel panel-primary">
          <div class="panel-heading">SIGN UP</div>
          <div class="panel-body">
           <div className="form-group">
            <label for="fname">First Name:</label>
            <input type="text" className="form-control" id="fname" onChange={this.onchangefname}/>
          </div>
          <div className="form-group">
            <label for="lname">Last Name:</label>
            <input type="text" className="form-control" id="lname" onChange={this.onchangelname}/>
          </div>
          <div className="form-group">
            <label for="email">Email address:</label>
            <input type="email" className="form-control" id="email" onChange={this.onchangeemail}/>
          </div>
          <div className="form-group">
            <label for="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" onChange={this.onchangepassword}/>
          </div>
          <div className="checkbox">
            <label><input type="checkbox"/>Remember me</label>
          </div>
            <button type="submit" className="btn btn-default" onClick={this.OnSubmit}>sign up</button>
        
          <p id="demo">{this.state.check}</p>
        </div>
        </div>
          </div>
          </div>
         
			</div>
    );
  }
}
export default signup;