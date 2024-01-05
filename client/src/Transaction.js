import React,{useEffect, useState} from "react";
import {useLocation} from 'react-router';
import {Card,Button} from 'react-bootstrap';
import Axios from 'axios';
import {GiCarSeat,GiGasPump} from "react-icons/gi";
import {FcEngineering} from "react-icons/fc";
import Payment from "./components/Payment";
import carImages from "./components/CarImages";
import baseUrl from "./components/ServerBaseUrl";
const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: "10px"
      }}
    />
  );
  

function TransactionPage(props){
    let numcars=0;
    const {state}=useLocation();
    const {carID,userDetails,pickUp,drop}=state;
    
    const [baseAmount,setBaseAmount]=useState(0);
    const [carDetails,setCarDetails]=useState([]);

    useEffect(()=>{
        const fetchCarDetails= async ()=>{
            try{
              console.log("Fetch Car Details .....");
              const response=await Axios.get(baseUrl+"/car",{params:{
                carID:carID
              }});
              console.log(response.data);
              setCarDetails(response.data);
              setBaseAmount(response.data[0].base_price);
            }
            catch(err)
            {
              console.log("Error fetching data from carTypes API",err);
            }
              
          };
          fetchCarDetails();
    },[]);
    const {firstName,
        lastName,
        email,
        mobile,
        city}=userDetails;
        


   // const[disable,setDisable]=useState(FontFaceSetLoadEvent);
    function handlePayButtonClick()
    {
        alert("Your transaction was successful");
        console.log('Paid');
    }
    function handleWaitButtonClick()
    {
        alert("You are added to the waitlist, visit again to check your status.");
        console.log('Wait');
    }
    // useEffect(()=>{
    //     if(numcars==0)
    //         setDisable(true);
    // },[])

    return(
        <div style={styles.fullPage}>
        <div style={styles.carDetArea}>
        <div style={styles.cardContainer}>
        <h3>{carDetails.length>0?carDetails[0].name:"....Loading"}</h3>
        <div style={styles.carInfo}>
        
            <h6><GiGasPump/>{carDetails.length>0?carDetails[0].fuel_type:"....Loading"}</h6>
            <h6><FcEngineering/>{carDetails.length>0?carDetails[0].transmission:"....Loading"}</h6>
            <h6><GiCarSeat/> {carDetails.length>0?carDetails[0].seats:"....Loading"} Seater</h6>
        </div>
        <p style={{color:"#7a8a9b", fontSize:"12px"}}>Note: This image is for representation purpose only. The colour of the actual vehicle may differ.</p>
        <div style={styles.dates}>
        <p>Pick up Date: {pickUp}</p>
        <p>Drop Date: {drop}</p>
        </div>
        <div style={styles.guide}>
        <h6 style={{color:"a9a9a9"}}>Guidelines & Policies.</h6>
        <p style={{color:"#7a8a9b", fontSize:"15px"}}>Please carry your original driving license along with an additional ID proof when you come to pick up your vehicle.</p>
        <p style={{color:"#7a8a9b", fontSize:"15px"}}>Your license must be verified by our system before you start your trip or else your trip will be cancelled.</p>
        </div>
        </div>
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"35%"
        }}>
        <div style={styles.image} >
            <img style={
                {
                    resizeMode:"contain", 
                    flex:"1",
                    width:"100%",
                    height:"250px"
                }
                    } src={carImages[carID]}/>
        </div>
        </div>
        </div>


        <div style={styles.paymentArea}>
            <h6>Fare Details</h6>
            <Payment baseAmount={baseAmount} name={firstName+" "+lastName} city={city}/>
            <div style={styles.buttons}>
        <Button  variant="primary" onClick={e=>handlePayButtonClick()}>Pay Now</Button>
        <Button  variant="primary" onClick={e=>handleWaitButtonClick()}>Wait List</Button>
        </div>
            <></>
        </div>
        </div>
    );
}
export default TransactionPage;
const styles={
    fullPage:{
        display:"flex",
        flexDirection:"row",
    },
    card:{
        width:'22rem',
        //border:"2px solid pink"
    },
    carDetArea:{
        display:"flex",
        flexDirection:"row",
        width:"65%",
        padding:"5px"
    },
    cardContainer:{
        padding:"2px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        //border:"2px solid green",
        width:"65%"
        
    },
    carInfo:{
        margin:"10px",
        width:"100%",
        display:"flex",
        borderBottom:"1px ridge grey",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    dates:{
        margin:"10px",
        display:"flex",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        borderBottom:"1px ridge grey"
    },
    image:{
        aligSelf:"center",
        height:"65%",
        display:"flex",
        //border:"2px solid black",
        //width:"35%",
        justifyContent:"center",
        //boxShadow: "2px 2px 10px 2px #888888",
    },
    paymentArea:{
        //border:"2px solid purple",
        width:"35%",
        flexDirection:"column",
        display:"flex",
        alignItems:"center",
        boxShadow: "2px 2px 10px 2px #888888",
        borderRadius:"5px",
        marginRight:"10px"
    },
    guide:{
        margin:"10px",
        padding:"10px"
    },
    buttons:{
        display:"flex",
        justifyContent:"space-evenly"
    }
}