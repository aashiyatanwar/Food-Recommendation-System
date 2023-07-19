/*
import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getDataById } from "../api/index";
import { actionType } from "../context/reducer";

const Food = () => {
  const minRange = 1;
  const maxRange = 100;
  const count = 10;
  var numbers ={};
  const GenerateRandomNumbers = (min, max, count) => {
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      var food = getDataById(randomNumber).then((response) => {
        //console.log("response" , response)
        const keyArray = "data";
        const dataArray = [response[keyArray]];
        //console.log("Last try",dataArray[0].data)
        dataArray.map((item) => {
          numbers.push(item.data);
        });
      });
    }

    return numbers;
  };
  console.log("Data", numbers);
  var finalArray = [];
  finalArray = GenerateRandomNumbers(minRange, maxRange, count);
  console.log("finalArray", finalArray, "length:", finalArray.length);
  return finalArray;
};

export default Food;
*/

import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getDataById , getAllPostOfUser, getAllComment} from "../api/index";
import { actionType } from "../context/reducer";

const  Food = async () => {
  const minRange = 1;
  const maxRange = 100;
  const count = 10;

  //const [randomNumbers, setRandomNumbers] = useState([]);
  //const randomNumbers=[];
  //var numbers = [];
  // const GenerateRandomNumbers = (min, max, count) => {
  //   const [{ data }, dispatch] = useStateValue();

  //   for (let i = 0; i < count; i++) {
  //       const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  //       var food = getDataById(randomNumber).then((response)=>{
  //         // console.log(response)
  //         const keyArray='data';
  //         const dataArray=[response[keyArray]]
  //        // console.log("Last try",dataArray[0].data)
  //         numbers.push(dataArray[0]);
  //       const validObjects = numbers.filter((obj) => obj !== undefined);
  //         //console.log("numbers :",numbers.length);
  //         //console.log("Numbers :",numbers[0]);
  //         randomNumbers[i]=numbers[0];

  //       })

  //     }

  //     for (let num of numbers){
  //       console.log("num ",num)
  //     }
  //    //console.log("Data ", numbers)
  //    //console.log("Numbers : " , numbers[1])
  //    //console.log("Raaaa",randomNumbers)
  //     return numbers
  //   }
  //console.log("Random Numbers", randomNumbers)

  //var numbers = GenerateRandomNumbers(minRange, maxRange, count);
  // console.log("Final ", numbers)

  //const [numbers, setNumbers] = useState([]);

  var numbers = await getDataById();
  //console.log("New trial",numbers);
  var lastNumbers = [];
  lastNumbers = numbers.map((item) => {
    return item.data.data;
  });
  console.log("last Numbers" , lastNumbers)
  return lastNumbers;
  

  

 
};

export const Postdata = async(userId) => {
  var result = await getAllPostOfUser(userId)
  console.log("result" , result)
  const dataArray = result.data.posts
  console.log("data" , dataArray)
  return dataArray

}

/*export const CommentData = async() =>{
  var result = await getAllComment()
  console.log("result" , result)
  const dataArray = result.data.posts
  console.log("data" , dataArray)
  return dataArray

}
*/




export default Food;
