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
// import {sample_cuisine} from "./filterCuisine"
import { getDataById } from "../api";
import { actionType } from "../context/reducer";

import Food from "./FinalData";
import Filter_Cuisine from "./filterCuisine";

var TimeAndMoney = [];
var TimeAndCuisine = [];
var MoneyAndCuisine = [];
let filteredData = [];
let samplecusine = [];

const Filter = () => {
  const [{ data }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState([]);
  const [money, setMoney] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [array, setArray] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);

  useEffect(() => {
    Food()
      .then((data) => {
        setArray(Array.from(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    filterFoodData();
  }, [array, cuisine]);

  useEffect(() => {
    handleSubmit();
  }, [filteredFoodData]);

  const filterFoodData = () => {
    if (array.length > 0 && cuisine) {
      const filteredFood = array.filter((food) => food.Cuisine === cuisine);
      setFilteredFoodData(filteredFood);
      console.log("filteredFood after filter", filteredFood);
    }
  };

  const uniqueCuisineData = Filter_Cuisine();

  const handleSubmit = () => {
    setIsOpen(false);
    setTime(sample_time);
    setMoney(sample_money);
    setCuisine(setoption);

    const filteredData = {
      time: sample_time,
      money: sample_money,
      cuisine: filteredFoodData,
    };

    const filteredResults = ThreeData(
      filteredData.time,
      filteredData.money,
      filteredData.cuisine
    );
  };

  const ThreeData = (time, money, sample_cuisine) => {
    console.log("Running ThreeData function");
    console.log("time", time, "money", money, "sample_cuisine", sample_cuisine);

    if (
      time.length !== 99 &&
      money.length !== 99 &&
      sample_cuisine.length !== 0
    ) {
      filteredData = array.filter((item) => {
        return (
          money.some((m) => m.SrNo === item.SrNo) &&
          time.some((t) => t.SrNo === item.SrNo) &&
          sample_cuisine.some((c) => c.SrNo === item.SrNo)
          // money.findIndex((m) => m.SrNo === item.SrNo) !== -1 &&
          // time.findIndex((t) => t.SrNo === item.SrNo) !== -1
        );
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length !== 99 &&
      money.length !== 99 &&
      sample_cuisine.length === 0
    ) {
      console.log("when one isnull");
      filteredData = array.filter((item) => {
        return (
          money.some((m) => m.SrNo === item.SrNo) &&
          time.some((t) => t.SrNo === item.SrNo)
        );
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length !== 99 &&
      money.length === 99 &&
      sample_cuisine.length !== 0
    ) {
      console.log("when one isnull");
      filteredData = array.filter((item) => {
        return (
          time.some((t) => t.SrNo === item.SrNo) &&
          sample_cuisine.some((c) => c.SrNo === item.SrNo)
        );
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length === 99 &&
      money.length !== 99 &&
      sample_cuisine.length !== 0
    ) {
      console.log("when one isnull");
      filteredData = array.filter((item) => {
        return (
          money.some((m) => m.SrNo === item.SrNo) &&
          sample_cuisine.some((c) => c.SrNo === item.SrNo)
        );
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length === 99 &&
      money.length === 99 &&
      sample_cuisine.length !== 0
    ) {
      console.log("when two isnull");
      filteredData = array.filter((item) => {
        return sample_cuisine.some((c) => c.SrNo === item.SrNo);
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length !== 99 &&
      money.length === 99 &&
      sample_cuisine.length === 0
    ) {
      console.log("when two isnull");
      filteredData = array.filter((item) => {
        return time.some((t) => t.SrNo === item.SrNo);
      });

      console.log("Filtered Data: ", filteredData);
    } else if (
      time.length === 99 &&
      money.length !== 99 &&
      sample_cuisine.length === 0
    ) {
      console.log("when two isnull");
      filteredData = array.filter((item) => {
        return money.some((m) => m.SrNo === item.SrNo);
      });

      console.log("Filtered Data: ", filteredData);
    } else {
      console.log("No if statement has been executed");
    }

    return filteredData;
  };

  const handleClick = () => {
    setTime([]);
    setMoney([]);
    setCuisine("");
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const filteredData = {
      time: time,
      money: money,
      cuisine: filteredFoodData,
    };
    console.log("filteredData contains t,m,c", filteredData);
    dispatch({
      type: actionType.SET_DATA,
      data: filteredData,
    });
  }, [filteredFoodData]);

  console.log("filteredFoodData hook after filter", filteredFoodData);
  return (
    <div>
      <button className="button" onClick={() => setIsOpen(true)}>
        Filter
      </button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="filter">Filter</h2>
            <div className="filter-content">
              <div className="preptime-range">
                <Preptime />
              </div>
              <div className="filtermoney-range">
                <Money />
              </div>
              <div className="drop-items">
                <DropdownMenu data={uniqueCuisineData} />
              </div>
            </div>
            <button onClick={handleClick}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}

      {filteredFoodData.map((food) => (
        <div key={food.id}>
          <h3>{food.name}</h3>
          {/* Render other food details here */}
        </div>
      ))}
    </div>
  );
};

export { Filter, TimeAndMoney, TimeAndCuisine, MoneyAndCuisine, filteredData };
