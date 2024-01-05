const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql")
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Rasengan08..',
    database:'carrental'
});
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.send("hello")
})
//Need to separte out the queries

const callPutCustomer = "call carrental.putCustomer(?,?,?,?,?);";
app.post("/admin",(req,res) => {
    const f_name = req.body.firstName;
    const l_name = req.body.lastName;
    const emailId = req.body.email;
    const city = req.body.city;
    const mobileNo = req.body.mobile;
    db.query(callPutCustomer,[f_name,l_name,emailId,city,mobileNo],(err,result) => {
        if(err) throw err;
        console.log(result);
        // res.send(result);
        // res.send(alert("Login Successful"));
    })
})


app.get("/admin",(req,res)=>{
    //const getLocationsQuery="SELECT * from carrental.location;";
    const callGetLocations="call get_locations();";

     db.query(callGetLocations,(err,result)=>{
    
        if(err) throw err;
        res.send(result[0]);
        console.log(result[0]);
     })
})

app.get("/carTypes",(req,res)=>{
    const callGetCarTypes="call get_carType();";
    db.query(callGetCarTypes,(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
        console.log(result[0]);
    })
})

const callSearchCar = "call search_car(?,?,?,?,?);";
app.get("/searchCar",(req,res) => {
    const car_type = req.query.carType;
    const fuel_type = req.query.carFuel;
    const transmission = req.query.carTrans;
    const seats = req.query.carSeats;
    const location = req.query.location;
    db.query(callSearchCar,[car_type,fuel_type,transmission,seats,location],(err,result)=>{
        if(err) throw err;
        res.send(result[0]);
        console.log(result[0]);
    })
})

const callGetCarDetails = "call display_car_details(?);";
const callCarAvlAt = "car_available_at_location(?,?);";
app.get("/car",(req,res)=>{
    // if(callCarAvlAt) >= 1{
        // callCarRentalPrice
        //car_id
        const carID = req.query.carID;
        db.query(callGetCarDetails,[carID],(err,result) => {
            if(err) throw err;
            res.send(result[0]);
            console.log(result[0]);

        })
    // }
})
const callGetCustomerID="call get_customer_ID(?,?);"
app.get("/customerID",(req,res)=>{
    const email=req.query.email;
    const mobile=req.query.mobile;
    //console.log("Email is: ",email);

    db.query(callGetCustomerID,[mobile,email],(err,result)=>{
        if(err) throw err;
        res.send(result);
        console.log(result);
    })
})

const id = 5;
const status = 'Random'
const callStatus = "insert into carstatus values (?,?);";
app.post("/status",(req,res) => {
    db.query(callStatus,[id,callStatus],(err,result) => {
        console.log(err);
        if(err) throw err;
        console.log(result);
    })
})
app.listen(3001,() => {
    console.log("Running on 3001");
});