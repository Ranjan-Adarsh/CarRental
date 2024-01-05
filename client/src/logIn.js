
import React, {Component,useEffect,useState} from 'react';
import SearchBar from './Search';
import {Route,Link,Routes} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Axios from 'axios';
import { VscAccount } from "react-icons/vsc";
export default function LogIn (props){
    const [firstName,setFirstName]=useState('');
    const [email,setEmail]=useState('');
    const [lastName,setLastName]=useState('');
    const [mobile,setMobile]=useState('');
    const [city,setCity]=useState(null);
    const [emailError, setEmailError] = useState('');
    const navigate=useNavigate();
    const [validEmail,setValidEmail]=useState(0);
    const [locations,setLocations]=useState([]);

    useEffect(()=>{
      Axios.get("http://localhost:3001/admin")
      .then(response=>{
        setLocations(response.data);
      })
      .catch(err=>{
        console.error('Error fetching data',err);
      });

    },[]);

    // function handleFirstName(event)
    // {
    //   var regex=/[^a-z]/gi;
    //   event.value=event.value.replace(regex,"");
    //   setEmail(event.value);
    // }

    const validateEmail = (e) => {
      var emailTemp = e.target.value
    
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailTemp)) {
        setEmailError('Valid Email :)');
        setEmail(emailTemp);
        setValidEmail(1);

      } else {
        setEmailError('Enter valid Email!');
        setEmail(emailTemp);
        setValidEmail(0);

      }
    }
 function handleClick(e)
  {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin",{
        firstName:firstName,
        lastName:lastName,
        email:email,
        mobile:mobile,
        city:city
    }).then((response) => {
      console.log("Done")
    });
    const userDetails={firstName:firstName,lastName:lastName,email:email,mobile:mobile,city:city};
    navigate('/Search',{
      state:{
      userDetails:userDetails,
      }
    });
    //console.log(JSON.stringify({f_Name:firstName,l_name:lastName}));
  }
  //event=>setFirstName(event.target.value.replace(/[^a-zA-Z]/ig,'')) onChange of First Name

      return(
        <form style={styles.logPage}>
          <h4  >Hello User!  < VscAccount/></h4>
          <h6>Enter every field to LogIn!</h6>
        <label style={styles.firstName}>
          <input placeholder="First Name" type="text" value={firstName} onChange={event=>setFirstName(event.target.value.replace(/[^a-zA-Z]/ig,''))} />
        </label>
        <label style={styles.lastName}>
          <input placeholder="Last Name" type="text" value={lastName} onChange={event=>setLastName(event.target.value.replace(/[^a-zA-Z]/ig,''))} />
        </label>
        <label style={styles.mobile}>
          <input placeholder="Mobile" type="number" value={mobile} onChange={event=> event.target.value<0?0:setMobile(event.target.value)} />
        </label>
        <label style={styles.city}>  
          <select value={city || ''}  onChange={e=>setCity(e.target.value || null)} >
                  <option value=''>City</option>
                  {locations.map((location)=>
                  <option key={location.location_id} value={location.location_name}>{location.location_name}</option>
                  )}
                  
      </select>
        </label>
        <label>
        <input placeholder="Email" type="text" value={email} onChange={(e) => validateEmail(e)} />
        <span style={{
          fontWeight: 'normal',
          color: 'white',
        }}>{emailError}</span>
      </label>
        <Button style={styles.button} type="submit" disabled={!(firstName && lastName && mobile && email  && city && validEmail)} onClick={handleClick}>LogIn</Button>
      </form>
      );
}

const styles={
  logPage:{
    margin:"auto",
    alignItems:"center",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    border:"2px solid #f15d61",
    height:"450px",
    width:"40%",
    backgroundColor:"#f15d61",
    borderRadius:"5px",
  },
  firstName: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  lastName: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  email: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  city: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  mobile:{
      padding:"5px",
      margin: "5px",
      //border: "2px solid green",
  },
  button:{
    padding:"5px",
    margin:"10px",
    backgroundColor:"#41b6ac",
    borderColor:"#41b6ac",
    buttonWidth:"20px"
  }
}