import { useState, useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { getDataById ,getAllPostOfUser} from "../api/index";
import { actionType } from "../context/reducer";
const Food = async () => {
  const minRange = 1;
  const maxRange = 100;
  const count = 10;

  var numbers = await getDataById();

  var lastNumbers = [];
  
  lastNumbers = numbers.map((item) => {
    
    return item.data.data;
  });
  // console.log("last Numbers" , lastNumbers)
  return lastNumbers;
};


export const Postdata = async(userId) => {
  var result = await getAllPostOfUser(userId)
  console.log("result" , result)
  const dataArray = result.data.posts
  console.log("data" , dataArray)
  return dataArray

}
export default Food;