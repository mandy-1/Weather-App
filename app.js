const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");

});

app.post("/" , function(req,res){
    
    const latitude=req.body.lat;
    const longitude=req.body.log;
    const units="metric";
    const apiKey="fe747c608ae28a9ec6ecbd88b2c547dc";
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units="+units+"&appid="+apiKey;
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data" , function(data){
            // console.log(data);           This gives us data in hexadecimal form.
            const weatherData = JSON.parse(data);    // JSON.parse() convert that data into javaScript object.
            // const demo = JSON.stringify(weatherData);        JSON.stringify() convert the javascript object into string.
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Temperature is "+ temp +" degree celcius.</h1>")
            res.write("<h3>Weather is currently "+ description+" .</h3>");
            res.write("<img src="+imgUrl+">")
            res.send();
        })
    })

})


  
app.listen(3000,function(){
    console.log("running...!!");
})