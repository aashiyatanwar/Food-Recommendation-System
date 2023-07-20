import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import "./Navbar.css";
import { Filter } from "./Filter";
import axios from "axios";
import "../index.css";
import { Button } from "reactstrap";
import Food from "./FinalData";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [datas, setArray] = useState([]);
  const uniqueCuisines = [...new Set(datas)];
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Food()
      .then((data) => {
        console.log("data", data);
        setArray(data.map((item) => item.Cuisine));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("searchquery", searchQuery);
    // Make the API call to fetch data from MongoDB
    axios.get("http://localhost:5000/api/sample/getAll").then((response) => {
      const results = response.data.data;
      // Process the retrieved data as needed
      const query = searchQuery.toLowerCase();
      console.log("query", query);
      const filteredResults = results.filter((result) =>
        result.Cuisine.toLowerCase().includes(query)
      );
      setTimeout(() => {
        setLoading(false);
        displaySearchResults(filteredResults);
      }, 7000); // Simulating a delay of 2 seconds

      console.log("filtered", filteredResults);
      // Display the filtered results
    });
  };
  const displaySearchResults = (results) => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length > 0) {
      results.forEach((result) => {
        const resultDiv = document.createElement("div");
        resultDiv.classList.add("result-container");

        resultDiv.innerHTML = `
          <div class="result-header">
            <h3>${result.RecipeName}</h3>
            <p>Total Time: ${result.TotalTimeInMins} mins</p>
          </div>
          <div class="result-content">
            <div class="result-image">
              <img src="${result["image-url"]}" alt="Recipe Image" />
            </div>
            <div class="result-details">
              <p><strong>Ingredients:</strong> ${result.Ingredients}</p>
              <p><strong>Cuisine:</strong> ${result.Cuisine}</p>
              <p><strong>Price:</strong> ${result.price}</p>
              <p><strong>Instructions:</strong> ${result.TranslatedInstructions}</p>
            </div>
          </div>
        `;

        resultsDiv.appendChild(resultDiv);
      });
    } else {
      resultsDiv.innerHTML = "<p>No results found.</p>";
    }
  };
  console.log("all datas", datas);
  console.log("uniqueCuisines", uniqueCuisines);
  return (
    <nav className="navbar navbar-expand-lg navbar-nav">
      <div className="container-fluid">
        {/* Logo */}
        <img
          src="../logo.avif"
          type=""
          autoPlay
          muted
          loop
          style={{
            width: "5.5%",
            height: "5.5%",
            objectFit: "fit",
            margin: "-10px",
          }}
        />

        <div
          className="collapse navbar-collapse"
          id="navbarColor01"
          style={{ marginLeft: "5px" }}
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Filter />
            </li>
          </ul>

          <form
            className="d-flex"
            role="search"
            style={{ position: "relative" }}
          >
            <input
              className="form-control me-2"
              type="search "
              placeholder="Search by Cuisine"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "400px " }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
            <div
              className="dropdown"
              style={{
                position: "absolute",
                top: "100%",
                left: "0",
                zIndex: "10",
                width: "100%",
                marginTop: "5px",
              }}
            >
              {uniqueCuisines
                .filter((item) => {
                  const searchTerm = searchQuery.toLowerCase();
                  const Cuisine = item.toLowerCase();

                  return (
                    searchTerm &&
                    Cuisine.startsWith(searchTerm) &&
                    Cuisine !== searchTerm
                  );
                })
                .slice(0, 20)
                .map((item) => (
                  <div
                    onClick={() => setSearchQuery(item)}
                    className="dropdown-row"
                    key={item}
                    style={{
                      padding: "10px",
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
            {loading && <p>Loading...</p>}{" "}
            {/* Display loading message when loading is true */}
          </form>
          {/* Profile and Signout */}
          <div
            className="flex items-center ml-auto cursor-pointer gap-2 relative"
            onMouseEnter={() => setIsMenu(true)}
            onMouseLeave={() => setIsMenu(false)}
          >
            <img
              className="w-12 min-w object-cover rounded-full shadow-lg"
              src={user?.user?.imageURL}
              alt=""
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <p className="text-textColor text-lg hover:text-headingColor font-semibold">
                {user?.user.name}
              </p>
            </div>

            {isMenu && (
              <div className="styled-div">
                <NavLink to="/userProfile" className="dropdown-item">
                  Profile
                </NavLink>

                {user?.user.role === "admin" && (
                  <>
                    <NavLink to="/dashboard/home" className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </>
                )}

                <p className="dropdown-item" onClick={logout}>
                  Sign out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
