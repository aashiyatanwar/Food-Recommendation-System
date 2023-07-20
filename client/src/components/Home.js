import React from "react";
import { ReactDOM } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { Sample } from "./sample";
import { useState, useEffect } from "react";

import { Frontview } from "./FrontView/Frontview";
import { DropdownMenu, setoption } from "./DropDown/DropdownMenu";
import Carousel from "./sliding/Carousel";
import Food from "./FinalData";
import { Preptime, sample_time } from "./Preptime";
import { sample_money, Money } from "./money";
import { Filter_cuisine, sample_cuisine } from "./filterCuisine";
const Home = () => {
  const [images, setImages] = useState([]);
  const sampledata = Food();
  console.log(sampledata);

  useEffect(() => {
    const updateImages = () => {
      const windowWidth = window.innerWidth;
      const imageUrls = [];
      const categories = ["food"];
      const widths = [
        "600",
        "500",
        "550",
        "500",
        "450",
        "400",
        "350",
        "300",
        "350",
        "300",
      ];

      for (let width of widths) {
        const imageUrl = `https://source.unsplash.com/${windowWidth}x${width}/?${categories}`;
        imageUrls.push(imageUrl);
      }

      setImages(imageUrls);
    };

    updateImages();
    window.addEventListener("resize", updateImages);
    return () => {
      window.removeEventListener("resize", updateImages);
    };
  }, []);

  const [loading, setLoading] = useState(true);

  const sample_diet = (result) => {
    return Sample.filter((item) => {
      return item.Diet === result;
    });
  };
  useEffect(() => {
    const sample_die = sample_diet(setoption);
    console.log(sample_die);
    console.log("option ", setoption);
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel images={images} />

      {/* <Filter /> */}

      <Frontview />
      <div id="results"></div>
    </div>
  );
};

export default Home;
