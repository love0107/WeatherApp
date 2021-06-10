const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.CityName;  
 const unit="metric";
 const apikey="31b2be76c1b8c20d0bee7ee5a5b614d3"; 
const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey +"&units="+unit;
https.get(url,function(response){
response.on("data",function(data){
const weatherData=JSON.parse(data);
const temp=weatherData.main.temp;
const description=weatherData.weather[0].description;
const icon=weatherData.weather[0].icon;
const windSpeed=weatherData.wind.speed;
const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";

//res.write("<h1><p>The weather is currently "+description+" in " + query+ ".</p></h1>");
//res.write("<h1>The Temperature in " + query + " is "+temp+" degrees Celcius.</h1>");
//res.write("<img src="+imageURL+">");



//expriment
const d = new Date();
const backgroundImage="https://image.freepik.com/free-vector/fair-weather-summer-landscape-with-small-country-wooden-house-green-trees-grass-hills-warm-summer-background_119217-255.jpg";
const StyletHTML="<style>*{margin:0;padding:0;}h3{margin-top:5%;}body{background-color: rgb(89, 192, 158);text-align:center;align-items:center;color:#fff;font-size: xx-large;}.Data{height:500px;width:400px;text-align: center;border-radius: 20px;display: inline-block;margin-top: 5%;background-color: #6fd5bc;background:linear-gradient(20deg,rgb(89 192 158),#5529291c),url("+backgroundImage+");background-size: cover;background-repeat: no-repeat;}.Icons{ margin:auto 25px;animation: move 3s infinite;position: relative;}.data-item{height:100px;text-align:center;vertical-align: middle;}.description{display:contents;}@keyframes move{0%{left:0px;}50%{left:15px;}100%{left:0px;}}</style>";
const HTMLBODY="<body><h3>Your Current Weather Information</h3><div class='Data'><img class ='image-icon data-item Icons' src="+imageURL+" alt='weather image'><div class ='description data-item'>"+description+"</div><div class ='status data-item'><i class='fas fa-wind Icons'></i>"+windSpeed+"m/s</div><div class ='temperature data-item'><i class='fas fa-temperature-low Icons'></i>"+temp+" °C</div><div class ='city-name data-item'><i class='fas fa-street-view Icons'></i>"+query+"</div><div>"+d.toDateString()+"</div></div></body></html>";

res.write("<html><head> <script src='https://kit.fontawesome.com/c85d70040f.js' crossorigin='anonymous'></script><title>Weather App</title>"+StyletHTML+"</head>"+HTMLBODY);

// expriment end here

res.send(); 
});
});

});



app.listen(3000,function(){
    console.log("Server is runnning on port 3000");
});