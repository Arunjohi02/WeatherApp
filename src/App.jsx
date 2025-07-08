import searching from '../src/assets/search.png'
import sun from '../src/assets/Clearsun.png'
import cloudy from '../src/assets/cloudy.png'
import  air from '../src/assets/air.png'
import rain from '../src/assets/Rainey.png'
import humunity from "./assets/huminity.png"
import { useState } from 'react'

const Weatherfetch=({icon,temp,city,country,lat,long,huminity,windspeed})=>{
  return(
    <>
        <div className='icon'>
          <img src={icon} alt="Air"/>
          
        </div>

        <div className="information">
              <h1>{temp} °C</h1>
              <h1>{city}</h1>
              <p>{country}</p>
      </div>
      <div className="cord-Details">
        <div className='cord'>
          <span>Latitude</span>
          <span>{lat}</span>

        </div>
        <div className='cord'>
          <span>Longtitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="image-container">
        <img src={humunity} />
        <img src={air} />
      </div>

      <div className="cord-details">
        <div className="response">
          <p>
              {huminity} %
          </p>
          <p>Huminity</p>
          
         

        </div>

        <div className="defalt-text">

             <p>
              {windspeed} Km/h
             </p>

              <p>Wind Speed</p>

        </div>

      </div>
<hr />
      <footer>
        <p>ArunJohi@2022</p>
      </footer>
    </>
  );
}

export default function App() {
  let Api_Key='2c7b876988de9fe60185d1e55a167ad7'
  const [text,settext]=useState("")
  const [icon,seticon]=useState(cloudy)
  const [temp,settemp]=useState(0)
  const [city,setcity]=useState("")
  const [country,setcountry]=useState("IN")
  const [lat,setlat]=useState(0)
  const [long,setlong]=useState(0)
  const [huminity,sethuminity]=useState(0)
  const [windspeed,setwindspeed]=useState(0)
  const [CityNotFound,setCityNotFound]=useState(false)
  const [loading,setloading]=useState(false)

// API Calling Function
      const search=async()=>{
          setloading(true)

// Let declare Our API URL
                let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${Api_Key}&units=Metric`

try{

// API Data is convert to Json 
        let result=await fetch(url);
        let FindData=await result.json();
        console.log(FindData);


// Check City Not Found
        if(FindData.cod==="404"){
              console.error("City is Not Found")
              setCityNotFound(false)
              setloading(false)
          return;
        }
        

// Data Fetching using API

        setcity(FindData.name)
        settemp(FindData.main.temp)
        setcountry(FindData.sys.country)
        sethuminity(FindData.main.humidity)
        setwindspeed(FindData.wind.speed)
        setlat(FindData.coord.lat)
        setlong(FindData.coord.lon)
        console.log(`fetch api data ${city}`);
        
      }
      catch(error){
        console.log(".........................");
        console.log("city is not Found");
        
        console.log("...................");
        
        
      }
      finally{
          setloading(false)
          setCityNotFound(true)
      }
}

// input box handling
const HandleClick=(e)=>{
  settext(e.target.value)
  console.log(text);
  
}
  return (
    <>
     <div className="container">
      <div className="header">
        <h1>Today Weather</h1>

      </div>

      <div className="input-container">
              <input type="text"
                    name='location'
                    placeholder='Enter Your Location'
                    className='input'
                    onChange={HandleClick}
                    onKeyDown={(e)=>{

                      if(e.key==="Enter")
                      {
                        console.log(text);
                        search();
                        settext("")
                      }

                    }}

                    value={text}
              />

        <div className="searchicon">
              <img src={searching}
                    alt="search" 

                    onClick={(e)=>{
                      
                      console.log(text);
                      search()
                      settext("")
                      
                    }}
                    
              />

        </div>

      </div>

        <Weatherfetch icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} huminity={huminity} windspeed={windspeed}/>

      {/* <div className="img-container">

              <img src={sun} alt="sun" />

      </div> */}

     </div>
    </>
  )
}