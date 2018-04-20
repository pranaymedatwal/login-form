import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";

class userfirstpage extends Component {
	constructor()
	{

		super();
		this.state={
			servicename:"",
			location:"",
			userid:"",
			userservice:[]
		};
		this.servicenamechange=this.servicenamechange.bind(this);
		this.locationchange=this.locationchange.bind(this);
		this.Onsend=this.Onsend.bind(this);
		this.displayuserservice=this.displayuserservice.bind(this);
		
	}
	servicenamechange(event)
	{
		this.setState({
      servicename:event.target.value
		
		});
	}
	locationchange(event)
	{
		this.setState({
      location:event.target.value
		});
	}
	async Onsend()
	{ var userid=localStorage.getItem("userid");
	console.log(userid)
	 	const response = await axios({
    method: 'post',
    url: 'http://localhost:3030/services',
    data:{
		servicename:this.state.servicename,
		location:this.state.location,
		userid:userid
	}
    });

	 }
	 async displayuserservice()
	{ var userid=localStorage.getItem("userid");
	
	 	const response = await axios({
    method: 'post',
    url: 'http://localhost:3030/userservice',
    data:{
    	userid:userid
    }
	
    });
    this.setState({
    	userservice:response.data
    });

    console.log(response.data);

	 }
   clearLocalStorage()
   {
   	localStorage.clear();
   }

  render() {

    return (
      <div>
        <h2>USER-FIRSTPAGE</h2>
          <div class="rows">
	          <div class="col-sm-3">
	          </div>
	          <div class="col-sm-6">
	          <div class="panel panel-success">
            <div class="panel-heading">Services</div>
            <div class="panel-body">
            <form>
            <div className="form-group">
				      <label>service name:</label>
				      <input type="text" className="form-control" id="service-name" onChange={this.servicenamechange}/>
				    </div>
				    <div className="form-group">
				      <label>location:</label>
				      <input type="text" className="form-control" id="location" onChange={this.locationchange}/>
				    </div>
			  <button type="submit" className="btn btn-default" onClick={this.Onsend}>Add Service</button>
			    </form>
			     </div>
	          </div>
			  	</div>
			  	<div className="rows">
          <div class="col-sm-4">
        
        </div>
        </div>
        </div>
        <table className="table">
        <tr>
        <th>SERVICE NAME</th>
        <th>LOCATION</th>
        </tr>
        <tr>
        <td>{this.state.userservice.map((item, index) => <li key={index}>{item.services}</li>)}</td>
        <td>{this.state.userservice.map((item, index) => <li key={index}>{item.location}</li>)}</td>
        </tr>
        </table>
         <button type="submit" className="btn btn-default" onClick={this.displayuserservice}>user service</button><br/><br/>
         <Link to={'/'} onClick={this.clearLocalStorage}>LogOut</Link>
        </div>
    );
  }
}
export default userfirstpage;