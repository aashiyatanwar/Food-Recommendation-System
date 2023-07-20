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


import ReactDom from "react-dom";
let sample_money = [];





const Money = () => {
  const [selectedSample, setSelectedSample] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    Food()
      .then((data) => {
        setArray(Array.from(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterMoney = ({ value }) => {
    const filteredData = array.filter(
      (food) => food.price >= value[0] && food.price <= value[1]
    );
    setSelectedSample(filteredData);
  };
  sample_money = selectedSample;
  useEffect(() => {
    console.log("selectedmoney", selectedSample);
    // Perform additional operations with the filtered data here
  }, [selectedSample]);

  return (
    <div>
      <React.Fragment>
        <RangeSelector
          id="range-selector"
          title="MONEY"
          dataSource={array}
          dataSourceField="price"
          onValueChanged={filterMoney}
        >
          <Margin top={20} />
          <Scale tickInterval={3} minorTickInterval={10}>
            <Label>
              <Format type="Decimal" />
            </Label>
          </Scale>
          <Behavior callValueChanged="onMoving" />
        </RangeSelector>
      </React.Fragment>
    </div>
  );
};

export { Money, sample_money };
