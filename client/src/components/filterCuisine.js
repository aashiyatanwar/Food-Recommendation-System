import React, { useEffect } from "react";

import { useState } from 'react';
import {Component} from 'react';
import RangeSelector from 'devextreme-react/range-selector'
import Food from "./FinalData";
import  {
  Margin, Scale, Label, Behavior, Format,
} from 'devextreme-react/range-selector';
import DataGrid from 'devextreme-react/data-grid';
import {Sample} from './sample';

const columns = ['RecipeName', 'TotalTimeInMins','PrepTimeInMins', 'Course', 'Cuisine', 'Diet'];
let sample_Cuisine
 const  Filter_Cuisine=()=>  {
   const [selectedSample, setSlectedSample] = useState([])
   
  const [array, setArray] = useState([]);
  var newnumber = [];
  var dataarray = [];

 const [uniqueData, setUniqueData] = useState([]);

  useEffect(() => {
    Food()
      .then((data) => {
        const cuisineData = Array.from(data).map((item) => item.Cuisine);
        const uniqueCuisineData = cuisineData.filter(
          (item, index) => cuisineData.indexOf(item) === index
        );
        setUniqueData(uniqueCuisineData);
        console.log("uniqueCuisineData", uniqueCuisineData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return uniqueData;
     
    

}

export default Filter_Cuisine;


