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
const columns = ["RecipeName", "TotalTimeInMins", , "Cuisine"];
const Preptime = () => {
  const [selectedSample, setSelectedSample] = useState([]);
  const [array, setArray] = useState([]);
  var newnumber = [];
  var dataarray = [];
  useEffect(() => {
    Food()
      .then((data) => {
        setArray(Array.from(data));
        console.log("data array", array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log("Random Number ",randomNumber)
  //const dataarray;

  newnumber = array.map((item) => {
    return item.TotalTimeInMins;
  });

  const TotalTime = newnumber;
  //randomNumber.map((item)=>{TotalTime.push(item)})
  // console.log(" total Time ",TotalTime);
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     selectedsample:Sample,
  //   };
  //   this.filterTime = this.filterTime.bind(this);
  // }
  // this.filterTime=this.filterTime.bind(this);

  console.log("Filter time", newnumber);
  const filterTime = ({ value }) => {
    sample_time = newnumber.filter(
      (Sample) =>
        Sample.TotalTimeInMins >= value[0] && Sample.TotalTimeInMins <= value[1]
    );
    setSelectedSample(sample_time);
    //console.log("time",sample_time)
  };
  return (
    <div>
      <React.Fragment>
        <RangeSelector
          id="range-selector"
          title=""
          dataSource={array}
          dataSourceField="TotalTimeInMins"
          onValueChanged={filterTime}
        >
          <Margin top={20} />
          <Scale tickInterval={10} minorTickInterval={10}>
            <Label>
              <Format type="Decimal" />
            </Label>
          </Scale>
          <Behavior callValueChanged="onMoving" />
        </RangeSelector>
        <h5 className="grid-header">Cooking Time :</h5>
        {/* <DataGrid
          dataSource={this.state.selectedsample}
          columns={columns}
          showBorders={true}
          columnAutoWidth={true}
        /> */}
      </React.Fragment>
    </div>
  );
};

export { Preptime, sample_time };

// console.log(sample_time)
//  console.log(this.state.selectedsample)
// console.log(value[0],value[1])
