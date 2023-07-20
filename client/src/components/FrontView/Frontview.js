import React, { useState, useEffect } from 'react'
import axios from 'axios'; // Import axios for making API requests
import Food from '../FinalData'
import './Frontview.css'
import { Filter }  from '../Filter'
import { TimeAndMoney, TimeAndCuisine, MoneyandCuisine ,filteredData} from '../Filter'
import { Sample } from '../sample'




const Frontview = () => {
  const [popupContent, setPopupContent] = useState([]);
  const [popupToggle, setPopupToggle] = useState(false);
  const [styling, setStyling] = useState(null);
  const [array, setArray] = useState([]);
  const [image, setImage] = useState([]);
  var newnumber = [];
  var dataarray = [];






  const changedContent = (food) => {
    setPopupContent([food]);
    setPopupToggle(!popupToggle);

    if (styling === null) {
      setStyling({ position: "fixed" });
    } else {
      setStyling(null);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'; // Truncate the text and add ellipsis
    }
    return text;
  };


  return (
    <div className="app_container">
      {/* <Filter /> */}
      <div className="content_container" style={styling}>
        {filteredData.length > 0 ? (
          filteredData.map((food) => (
            <div className="content_card" key={food.id}>
              <img src={food['image-url']} alt="" />

              <button onClick={() => changedContent(food)}>Details</button>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
      {popupToggle && (
        <div className="pop_up_container" onClick={changedContent}> 
          <div className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <div className="pop_up_header">
              <button onClick={changedContent}>x</button>
            </div>
            <div className="pop_up_content">
              {popupContent.map((pop) => (
                <div className="pop_up_card" key={pop.id}>
                  <p>RECIPE: {pop.RecipeName}</p>
                  <p>CUISINE: {pop.Cuisine}</p>
                  <p>INSTRUCTION: {truncateText(pop.TranslatedInstructions, 700)}</p> {/* Limit the displayed text to 100 characters */}
                   <p>click here</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Frontview };
