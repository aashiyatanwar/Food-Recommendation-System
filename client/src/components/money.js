import React from 'react';
import { useState } from 'react';
import {Component} from 'react';
import RangeSelector from 'devextreme-react/range-selector'
import  {
  Margin, Scale, Label, Behavior, Format,
} from 'devextreme-react/range-selector';
import DataGrid from 'devextreme-react/data-grid';
import {Sample} from './sample';

const columns = ['RecipeName', 'TotalTimeInMins','PrepTimeInMins', 'Course', 'Cuisine', 'Diet'];
let sample_money
 const  Money=()=>  {
  const [selectedSample,setSlectedSample]=useState([])
  const filterTime=({value})=>{
    sample_money = Sample.filter((Sample) => (Sample.Money >= value[0] && Sample.Money <=  value[1])
     || !value.length)
     setSlectedSample(sample_money)
  }

 
    return (
      <React.Fragment>
        <RangeSelector
          id="range-selector"
          title="Filter Time from dataset "
          dataSource={Sample}
          dataSourceField="Money"
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
        <h2 className="grid-header">PrepTime Recipe</h2>
        {/* <DataGrid
          dataSource={this.state.selectedsample}
          columns={columns}
          showBorders={true}
          columnAutoWidth={true}
        /> */}
      </React.Fragment>
    );

}

export {Money, sample_money}


