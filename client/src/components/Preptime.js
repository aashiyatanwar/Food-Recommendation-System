import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { Component } from "react";
import { useState } from "react";
import RangeSelector from "devextreme-react/range-selector";

import {
  Margin,
  Scale,
  Label,
  Behavior,
  Format,
} from "devextreme-react/range-selector";
import DataGrid from "devextreme-react/data-grid";
import { Sample } from "./sample";
import Food from "./FinalData";
let sample_time = [];

const Preptime = () => {
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

  const filterTime = ({ value }) => {
    const filteredData = array.filter(
      (food) =>
        food.TotalTimeInMins >= value[0] && food.TotalTimeInMins <= value[1]
    );
    setSelectedSample(filteredData);
  };
  sample_time = selectedSample;
  useEffect(() => {
    console.log("selectedtime", selectedSample);
    // You can perform additional operations with the filtered data here
  }, [selectedSample]);

  return (
    <div>
      <React.Fragment>
        <RangeSelector
          id="range-selector"
          title="TIME"
          dataSource={array}
          dataSourceField="TotalTimeInMins"
          onValueChanged={filterTime}
        >
          <Margin top={20} />
          <Scale tickInterval={5} minorTickInterval={10}>
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

export { Preptime, sample_time };
