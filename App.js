const express= require('express');
const app=express();
const bp = require('body-parser');
const https = require('https');
const port =3000;


// use body parser

app.use(bp.urlencoded({extended:true}));
app.set('view engine', 'ejs')

// to include css 
app.use(express.static(__dirname))
// includes images
app.use( express.static(__dirname+"//images")); 


var namecity='';
var tempt=""

app.get('/',(req,res)=>{
    res.render("index",{city:namecity,tempt:tempt});})

    app.post('/',function(req,res){
        var city=req.body.city;
        
        namecity="The temperature in "+city+ " is";
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=4ca468305bdc7e02114f9c1bd27c9466"
        https.get(url,function(response){
            console.log(response.statusCode);
            response.on("data",function(data){
                // console.log(data);
                const weatherData=JSON.parse(data);
                console.log(weatherData);
                
                const temp = weatherData.main.temp;
                const finalTemp=Math.round(temp-273.15)+" degrees";
                // res.send("The temp is "+String(Math.round(finalTemp))+" degrees");
                res.render("index",{city:namecity,tempt:finalTemp});
                
    
            
    
            })
        })
    })

// getting the request



app.listen(process.env.PORT ||port,()=>{
    console.log("Server started at port "+port)
})