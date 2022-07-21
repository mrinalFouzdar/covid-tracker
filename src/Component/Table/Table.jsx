import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "./table.module.css"
export const Table = () => {
  const [country, setCountry] = useState([]);
  const [state,setState]=useState([])
  const [info,setInfo]=useState([])



  useEffect(() => {
    // handelState()
    handleCountry();

  }, []);

  // useEffect(()=>{
  //   handleCountryDetails()
  // },[country])

  const countryDetails = {
    method: 'GET',
    url: 'https://covid-19-statistics.p.rapidapi.com/regions',
    headers: {
      'X-RapidAPI-Key': '1b11ca4947mshe353f64defa157cp12c0d4jsn18453b63452b',
      'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
    }
  }
  const handleCountry = () => {
    axios.request(countryDetails)
      .then((res) => {
        let a = res.data.data
        a.sort((a,b)=> a.name.localeCompare(b.name))
        setCountry([...a]);
   
      })

      .catch((err) => console.error(err))
      .finally(()=>{
        // // setState([])
        // if(country.length !==0){
        // }
      })
  };

  
  const  handelState=(e)=>{
    const options = {
        method: 'GET',
        url: 'https://covid-19-statistics.p.rapidapi.com/provinces',
        params: {iso: e},
        headers: {
          'X-RapidAPI-Key': '1b11ca4947mshe353f64defa157cp12c0d4jsn18453b63452b',
          'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
        }
      };
      
      axios.request(options)
      .then( (res)=>{
          console.log(res);
        let a = res.data.data
        a.sort((a,b)=> a.name.localeCompare(b.name))
          setState([...a])
      }).catch(function (error) {
          console.error(error);
      });
  }

  // Here I was trying to fetch data country wise but api wasn't working properly

  // const handleCountryDetails=()=>{
  //   const options = {
  //     headers: {
  //       'X-RapidAPI-Key': '1b11ca4947mshe353f64defa157cp12c0d4jsn18453b63452b',
  //       'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
  //     }
  //   };
  //   country.forEach((key) =>{
  //     axios.get(`https://covid-19-statistics.p.rapidapi.com/reports?q=${key.iso}`,options)
  //     .then(function (res) {
  //       console.log(res.data);
  //       setInfo([...info,...res.data.data])
  //     }).catch(function (error) {
  //       console.error(error);
  //     });
  //   })
  // }


const handleStateDetails=(e)=>{
  let value = e.target.value
  console.log(value);
  value = value.split(",")
  const [iso,region_province] =value
  const options = {
    headers: {
      'X-RapidAPI-Key': '1b11ca4947mshe353f64defa157cp12c0d4jsn18453b63452b',
      'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
    }

  };
  
  axios.get(`https://covid-19-statistics.p.rapidapi.com/reports?q=${iso}%20${region_province}`,options)
  .then(function (res) {
    console.log(res.data);
    setInfo(res.data.data)
  }).catch(function (error) {
    console.error(error);
  });
}

  return <div>{/* Joymohaprabhu */}
  <div className={styled.select}>
  <select name="" id="" onChange={(e)=>handelState(e.target.value)}>
    <option value="" >Country</option>
    {
        country.map((name,i)=> <option key ={i} value={name.iso}>
            {name.name}

        </option>)
    }
  </select>

  <select onChange={(e)=> handleStateDetails(e)}>
    <option >State</option>
    {
      state.map((name,i)=><option key={Date.now()+i} value={[name.iso, name.province===""? name.name : name.province]}>
          {name.province ? name.province : name.name}
      </option>)
    }
  </select>
  </div>


  <div className="table">
   {info.length>0 && <table>
      <thead>
      <tr>
        <th>Country</th>
        <th>Active</th>
        <th>Deaths</th>
        <th>Recovered</th>
        <th>province</th>
      </tr>
      </thead>
      <tbody>
        {
          info.map((data,i)=> <tr key={i}>
               <td>{data.region.name}</td> 
               <td>{data.active}</td>
               <td>{data.deaths}</td>
               <td>{data.recovered}</td>
               <td>{data?.region.province}</td>
          </tr>)
        }
      </tbody>
    </table>
    }
  </div>
  </div>;
};
