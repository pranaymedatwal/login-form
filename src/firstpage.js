import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios";

class firstpage extends Component {
	constructor()
	{
		super();
		this.state={
     item: [],
     services:[]
		}
		this.displayusers=this.displayusers.bind(this);
		this.usersdetails=this.usersdetails.bind(this);
    this.displayservices=this.displayservices.bind(this);
    this.removeUser=this.removeUser.bind(this);
	}
	async displayusers()
	{
	 	const response = await axios({
    method: 'get',
    url: 'http://localhost:3030/users'
    
    });
    
    this.setState({
     	item:response.data

     });
      console.log(this.state.item)
	}
  async displayservices()
  {
    const response = await axios({
    method: 'get',
    url: 'http://localhost:3030/displayservices'
    
    });
    
    this.setState({
      services:response.data

     });
      console.log(this.state.services)
  }

	usersdetails(item){
		this.setState({
     	item:item
     });
	}

 async removeUser (e,index){var data;
    var array=this.state.item;
    array.splice(index,1);
   this.setState({
    item:array

   }) ;
    const response = await axios({
    method: 'post',
    url: 'http://localhost:3030/removeuser',
    data:{userid:e.target.id}
    
    });
  

  }

  render() {
    return (
      <div>
        <h2>ADMIN-FIRSTPAGE</h2>
        <Link to={'/'} >LogOut</Link>
        <table className="table ">
    <thead>
      <tr>
      <th>ID</th>
      
      <th>FIRSTNAME</th>
      <th>LASTNAME</th>
        <th>EMAIL</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

      {this.state.item.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item._id}</td>
            <td>{item.firstname}</td>
            <td>{item.lastname}</td>
            <td>{item.email}</td>

            <td><button id={item._id} onClick={(e)=> this.removeUser(e,index)} className="btn btn-danger">delete</button></td>
          </tr>
          );
        })
      }

    </tbody>
  </table>
    <table className="table ">
    <thead>
      <tr>
      <th>ID</th>
      <th>USERID</th>
      <th>SERVICENAME</th>
      <th>LOCATION</th>

      
      </tr>
    </thead>
    <tbody>
    {this.state.services.map((item,index)=>{
      return(
      <tr key ={index}>
      <td>{item._id}</td>
        <td>{item.userid}</td>
      <td>{item.servicename}</td>
      <td>{item.location}</td>
       
      </tr>
      );
  })
  }
    </tbody>
  </table>
          <button onClick={this.displayusers} className="btn btn-primary">USERS LIST</button>
          <button onClick={this.displayservices} className="btn btn-primary">USERS SERVICES</button>
      </div>
    );
  }
}
export default firstpage;