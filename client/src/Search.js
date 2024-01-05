// App.js
import React, {Component,useEffect,useState} from 'react';
import {Route,Link,Routes} from 'react-router-dom' ;
import {useNavigate,useLocation} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import carImages from './components/CarImages';
import Axios from 'axios';
import {Grid} from "@material-ui/core"; //
import {makeStyles} from "@material-ui/core/styles"
import { VscAccount } from 'react-icons/vsc';
import baseUrl from './components/ServerBaseUrl';
import getDateTime from './components/DateTime';

function SearchBar(props)
{


  const defaultDate=new Date();

  const tomorrowDate=new Date();
  tomorrowDate.setDate(tomorrowDate.getDate()+1);

  const {state}=useLocation();
  const [customerID,setCustomerID]=useState('');
  const {userDetails}=state;
  const {firstName,lastName,email,mobile,city}=userDetails;
  const [carID,setCarID]=useState('');
  const [carType,setCarType]=useState(null);
  const [carTrans,setCarTrans]=useState(null);
  const [carFuel,setCarFuel]=useState(null);
  const [carName,setCarName]=useState('');
  const [carSeats,setCarSeats]=useState(null);
  const [carBasePrice,setCarBasePrice]=useState('');
  const [pickUp,setPickUp]=useState(getDateTime(defaultDate));
  const [drop,setDrop]=useState(getDateTime(tomorrowDate));
  const [searchCarList,setSearchCarList]=useState([]);
  const [prevTrnx,setPrevTrnx]=useState([]);
  const [waitList,setWaitList]=useState([]);



  const [availableCarTypes,setAvailableCarTypes]=useState([]);
  // const [availableFuelTypes,setAvailableFuelTypes]=useState([]);
  // const [availableTransmssionTypes,setAvailableTransmissionTypes]=useState([]);
  // const [availableNumberOfSeats,setAvailableNumberOfSeats]=useState([]);

  

  useEffect(()=>{

    //Getting information about car types and all
    const fetchCarTypes= async ()=>{
      try{
        console.log("Fetch CarTypes .....");
        const response=await Axios.get(baseUrl+"/carTypes");
        console.log(response);
        setAvailableCarTypes(response.data);
      }
      catch(err)
      {
        console.log("Error fetching data from carTypes API",err);
      }
        
    };
    // Axios.get("http://localhost:3001/carTypes")
    //   .then(response=>{
    //     setAvailableCarTypes(response.data);
    //   })
    //   .catch(err=>{
    //     console.error('Error fetching data',err);
    //   });
    const getCustomerID=async ()=>{
      try{
        console.log("Fetching Customer ID...");
        const response= await Axios.get(baseUrl+"/customerID",
        {
          params:{
            mobile: mobile,
            email: email
            
          }
        });
        console.log(response);
        setCustomerID(response.data);
      }
      catch(err)
      {
        console.log("Error fetching data from carTypes API",err);
      }
      }

    fetchCarTypes();
    getCustomerID();
  },[]);

  //const carDetails={gName:'Maruti',gFuelType:'Petrol',gSeats:'6',gTrans:"Manual",gBasePrice:234.90,loc_ID:12};
  const tempTrnx=[
    
    {trnId:1,pikD:"2020-02-09",dropD:"2020-02-09",carId:"1"},
    {trnId:2,pikD:"2020-02-09",dropD:"2020-02-09",carId:"2"},
    {trnId:4,pikD:"2020-02-09",dropD:"2020-02-09",carId:"3"},
    {trnId:8,pikD:"2020-02-09",dropD:"2020-02-09",carId:"4"},
  ];
  const tempWaitList=[
    {wId:1,carI:"102",stttus:"Available"},
    {wId:3,carI:"104",stttus:"Not Available"},
    {wId:7,carI:"107",stttus:"Available"},
  ];
  // const [City,setCity]=useState(city);
  
  const navigate=useNavigate();

  function handleGetCarData()
  {
    // console.log(JSON.stringify({firstName:firstName,lastName:lastName,email:email,mobile:mobile,city:city}));
    // console.log({carFuel});
    // console.log({city});
    // console.log({carSeats});
    // console.log({carTrans});
    // console.log({pickUp});
    // console.log({drop});

    setPrevTrnx([]);

    console.log("Fetch Search Cars.....");

    Axios.get(baseUrl+"/searchCar",{
      params:{
        carType:carType,
        carFuel:carFuel,
        carTrans:carTrans,
        carSeats:carSeats,
        location:city
      }
    }).then((response) => {
      setSearchCarList(response.data);
      console.log(searchCarList);
    })

  }
  function handleSignOutButton()
  {
    navigate('/logIn');
  }
  function handleCardButton(carID)
  {

    //Axios calling with respective carId to get carDetails
    setCarID(carID);

    navigate('/Transaction',{
      state:{
      // carDetails:carDetails,
      // userDetails:userDetails,
      // pickUp:pickUp,
      // drop:drop

      carID:carID, //Need change here
      userDetails:userDetails,
      pickUp:pickUp,
      drop:drop
    }});
  }
  function handleTrnxButton()
  {
    setSearchCarList([]);
    for(let i=0;i<tempTrnx.length;i++)
    {
      prevTrnx.push(tempTrnx[i]);
    }
      setPrevTrnx(prevTrnx);
  }
  function handleWaitListButton()
  {
    for(let i=0;i<tempWaitList.length;i++)
    {
      waitList.push(tempWaitList[i]);
    }
      setWaitList(tempWaitList);
  }
  return (
    <div style={styles.CarSearch}>
      <div style={styles.topBar}>
        <h6 style={{paddingRight:"10px"}}>Hello {firstName}!<VscAccount/></h6>
        <Button variant="secondary" onClick={handleTrnxButton} >Previous Transactions</Button>
        <Button variant="secondary" onClick={handleWaitListButton}>Check Waitlist</Button>
      <Button variant="secondary" onClick={handleSignOutButton}>Sign out</Button>
      </div>
      <Grid container style={styles.topPane}>
      <Grid item>
      <label style={{color:"white"}}>
        Car Type:
      <select value={carType || ''}  onChange={e=>setCarType(e.target.value || null)} >
                  <option value=''>Any</option>
                  {
                  availableCarTypes.map((availableCarType)=>
                    <option key={availableCarType.carTypeId} value={availableCarType.name}>{availableCarType.name}</option>
                  )
                }
                  
                  
      </select>
      </label>
      </Grid>
      <Grid item>
      <label style={{color:"white"}}>
        Fuel Type:
      <select value={carFuel || ''}  onChange={e=>setCarFuel(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='Petrol'>Petrol</option>
                  <option value='Diesel'>Diesel</option>
      </select>
      </label>
      </Grid>
      <Grid item>
      <label style={{color:"white"}}>
        Transmission Type:
      <select value={carTrans || ''}  onChange={e=>setCarTrans(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='Automatic'>Automatic</option>
                  <option value='Manual'>Manual</option>
      </select>
      </label>
      </Grid>
      <Grid item>
      <label style={{color:"white"}}>
        Number of Seats:
      <select value={carSeats || ''} onChange={e=>setCarSeats(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
      </select>
      </label >
      </Grid>
      
      <Grid item>
        <Datetime 
        onChange={(d)=>
          setPickUp(getDateTime(new Date(d)))}
        inputProps={{placeholder:`${getDateTime(defaultDate)}` }}
        >
        </Datetime></Grid>
      <Grid item>
        <Datetime 
        onChange={(d)=>setDrop(getDateTime(new Date(d)))}
        inputProps={{placeholder:`${getDateTime(tomorrowDate)}` }}
        ></Datetime></Grid>
      

      <Grid item><Button style={styles.buttonCD} variant="primary" onClick = {handleGetCarData}>Get Car data</Button></Grid>

      </Grid>
      <Grid style={styles.bottomTranxPane} container spacing={4} justifyContent={'center'}>
      {
        prevTrnx.map((trnx) => (
          <Grid item xs={12} sm={6} md={4}>
          <div className = "Transactions" key={trnx.trnId}>
            <Card className='Transaction' style={{ 
              width: '22rem',
              }}>
              <Card.Body className="cardTrnxBody">
              <Card.Title className="cardTrnxTitle">Card Title</Card.Title>
              <h2>{trnx.trnId}</h2>
              <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
              </Card.Text>
              </Card.Body>
            </Card>

          </div>
          </Grid>
          ))
        }
        </Grid>
<Grid style={styles.bottomPane} container spacing={4} justifyContent={'center'}>
{
  searchCarList.map((car) => (
    <Grid item xs={12} sm={6} md={4}>
    <div className = "car" key={car.car_ID}>
      <Card className='card' style={{ 
        width: '22rem',
        }}>
           <Card.Img variant="top" src={carImages[car.car_ID]} />


        <Card.Body className="cardBody">
        <Card.Title className="cardTitle">Card Title</Card.Title>
        <h2>{car.car_ID}</h2>
        <Card.Text>
        Currently Available:{car.currentAvl}
        </Card.Text>
        <Button variant="secondary" onClick={()=>handleCardButton(car.car_ID)}>Get More Details</Button>
        </Card.Body>
      </Card>

    </div>
    </Grid>
        ))
      }
      </Grid>
    </div>
  );
}
export default SearchBar;

const styles={
  CarSearch:{
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"flex-start",
    margin:"10px"
    //border:"2px solid black"
  },
  topBar:{
    width:"100%",
    display:"flex",
    alignItems:"flex-end",
    justifyContent:"end",
    flexDirection:"row",
    paddingRight:"10px"
    //border:"2px solid blue"
  },
  topPane:{
    height: "100px",
    maxHeight:"200px",
    margin:"auto",
    alignItems:"center",
    display:"flex",
    justifyContent:"space-around",
    flexDirection:"row",
    //border:"2px solid green",
    backgroundColor:"#f15d61",
    borderRadius:"5px"
  },
   bottomPane:{
     //border:"2px solid pink",
     marginTop:"2px",
     marginLeft:"2px",
  //   margin:"auto",
  //   alignItems:"center",
  //   display:"flex",
  //   justifyContent:"space-between",
  //   flexDirection:"row",
   },
  buttonCD:{
    backgroundColor:"#41b6ac",
    borderColor:"#41b6ac",
  },
  bottomTranxPane:{
    //border:"2px solid pink",
    marginTop:"2px",
    marginLeft:"2px",
 //   margin:"auto",
 //   alignItems:"center",
 //   display:"flex",
 //   justifyContent:"space-between",
 //   flexDirection:"row",
  },
  // card.hover :{
  //   transform: scale(1.03),
  //   box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02),
  // }
}
