import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app= express();
const port= 3000;
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const appId= "c491083d14b662ee4138fa73c4977f1e";



app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



let city; 


let cityArray = [
    "İstanbul", "New York", "Oslo", "Amsterdam", "Miami", "Washington", "Ankara", "Bursa", "Tokyo", "London",
    "Paris", "Berlin", "Moscow", "Beijing", "Sydney", "Dubai", "Los Angeles", "Chicago", "Toronto", "São Paulo",
    "Mexico City", "Mumbai", "Shanghai", "Cairo", "Hong Kong", "Bangkok", "Seoul", "Singapore", "Buenos Aires",
    "Johannesburg", "Rome", "Madrid", "Barcelona", "Vienna", "Zurich", "Brussels", "Lisbon", "Dublin", "Stockholm",
    "Helsinki", "Copenhagen", "Athens", "Warsaw", "Prague", "Budapest", "Kuala Lumpur", "Jakarta", "Lagos",
    "Riyadh", "Tel Aviv", "Kuwait City", "Doha", "Manila", "Lima", "Bogotá", "Santiago", "Caracas", "Kiev",
    "Belgrade", "Sofia", "Bucharest", "Havana", "Casablanca", "Tehran", "Baghdad", "Rabat", "Islamabad",
    "Karachi", "Lahore", "Kathmandu", "Dhaka", "Hanoi", "Ho Chi Minh City", "Phnom Penh", "Vientiane",
    "Tashkent", "Bishkek", "Ashgabat", "Dushanbe", "Almaty", "Nairobi", "Addis Ababa", "Accra", "Abuja",
    "Dar es Salaam", "Kampala", "Kinshasa", "Luanda", "Windhoek", "Harare", "Lusaka", "Gaborone", "Maputo",
    "Antananarivo", "Port Louis"
];


app.get("/", async (req,res)=>{
    const randomNumber=Math.floor(Math.random()*cityArray.length);
    city=cityArray[randomNumber];
    try {
        
        const result=await axios.get((apiUrl+city+"&appid="+appId))
        const temperature=  result.data.main.temp
        const description= result.data.weather[0].description
        const humidity= result.data.main.humidity
        const wind= result.data.wind.speed
        const icon=result.data.weather[0].icon
        const iconUrl="http://openweathermap.org/img/wn/"+icon+".png"

        res.render("index", {
            cityName: city ,// Pass the current city name,
            celcius:temperature,
            howIsTheWeather:description,
            humidity:humidity,
            wind:wind,   
            icon:iconUrl 
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("An error occurred while fetching weather data.");
    }
});


app.post("/", async (req,res)=>{
    city=req.body.search;
    try {
        const result=await axios.get((apiUrl+city+"&appid="+appId))
        const temperature=  result.data.main.temp
        const description= result.data.weather[0].description
        const humidity= result.data.main.humidity
        const wind= result.data.wind.speed
        const icon=result.data.weather[0].icon
        const iconUrl="http://openweathermap.org/img/wn/"+icon+".png"


        res.render("index",{
            cityName:city,
            celcius:temperature,
            howIsTheWeather:description,
            humidity:humidity,
            wind:wind,
            icon:iconUrl
        })
    } catch (error) {
        res.status(500).send("An error occurred while fetching weather data.");
    }
})



app.listen(port,()=>{
    console.log("Server running on "+port);
})

