import React, { useEffect, useState } from "react";
import ReactDOM from "react";
import "./Filter.css";
import { Sample } from "./sample";
import { Preptime, sample_time } from "./Preptime";
import { Money } from "./money";
import { setoption } from "./DropDown/DropdownMenu";
import { useStateValue } from "../context/StateProvider";

import { sample_money } from "./money";
import { DropdownMenu } from "./DropDown/DropdownMenu";

import { getDataById } from "../api";
import { actionType } from "../context/reducer";

import Food from "./FinalData"


var TimeAndMoney = [];
var TimeAndDiet = [];
var MoneyAndDiet = [];
const Filter = () => {
  const [
    {
     data
    },
    dispatch,
  ] = useStateValue();
  //const sampleData = Food()
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [time, setTime] = useState([]);
  const [money, setMoney] = useState([]);
  const [dropdiet, setDropdiet] = useState();

  const handleSubmit = () => {
    setIsSubmit(!isSubmit);
    console.log("Submitted");
    setTime(sample_time);
    setMoney(sample_money);
    setDropdiet(setoption);
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setTime(null);
    setMoney(null);
    setDropdiet(null);
    setIsOpen(!isOpen);
  };

  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(()=>{
  //     fetchData();
  // },[]);

  const SingleData = () => {
    if (time != null) {
      console.log(time);
    } else if (money != null) {
      console.log(money);
    } else if (dropdiet != null) {
      console.log(dropdiet);
    }
  };

  const TwoData = (sample_diet) => {
    if (time != null && money != null) {
      TimeAndMoney = Sample.filter((item) => {
        return time.includes(item) && money.includes(item);
      });
      console.log("Time and money ", TimeAndMoney);
    }
    if (time != null && dropdiet != null) {
      TimeAndDiet = Sample.filter((item) => {
        return time.includes(item) && sample_diet.includes(item);
      });
      console.log("Time and diet ", TimeAndDiet);
    }
    if (money != null && dropdiet != null) {
      MoneyAndDiet = Sample.filter((item) => {
        return money.includes(item) && sample_diet.includes(item);
      });
      console.log("Money and diet ", MoneyAndDiet);
    }
  };

  useEffect(() => {
    console.log("sample Time: ", time);
    console.log("sample Money", money);
    // console.log("Drop Diet ",dropdiet)
    const sample_diet = Sample.filter((item) => {
      return item.Diet === dropdiet;
    });
    console.log("dietttt", sample_diet);
    //console.log(sampleData)
    
  });


  

 /* function generateRandomNumbers(min, max, count) {
    const randomNumbers = [];
  
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.push(randomNumber);
    }
  
    return randomNumbers;
  }

const minRange = 1;
const maxRange = 100;
const count = 100;
const randomNumbers = generateRandomNumbers(minRange, maxRange, count);



  useEffect(() => {
    const mappedArray = randomNumbers.map((number) =>{
      if (!data) {
        getDataById(number).then((info) => {
          console.log(info)
          dispatch({
            type: actionType.SET_DATA,
            data: info.data,
          });
        });
      }
    });
   
  },[]);
  
*/
 

  // const fetchData= async ()=>{
  //     try{
  //         const response =await fetch("http://localhost:5000/api/data");
  //         const jsonData =await response.json();

  //         setData(jsonData);
  //         setLoading(false);

  //     }
  //     catch(error){
  //         console.log('error:',error);
  //         setLoading(false);
  //     }
  // }
  // if(loading){
  //     return <div> Loading...</div>
  // }
  // const diet =[];
  // data.Sample.map((item)=>{
  //     diet.push(item.Diet);
  // })

  // const uniqueData =diet.filter((item,index)=>{
  //     return diet.indexOf(item)===index;
  // })

  //console.log(uniqueData)

  return (
    <div>
      <button className="button" onClick={handleClick}>
        Filter
      </button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Filter</h2>
            <ul>
              <li>
                <Preptime />
              </li>
              <li>
                <Money />
              </li>

              <li>{/* <DropdownMenu data={uniqueData} /> */}</li>
            </ul>
            <button onClick={handleClick}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Filter, TimeAndMoney, TimeAndDiet, MoneyAndDiet };
