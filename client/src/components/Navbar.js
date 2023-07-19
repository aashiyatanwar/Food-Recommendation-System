import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";
import "./Navbar.css";
import { Filter } from "./Filter";

import "../index.css";
import { Button } from "reactstrap";
const Navbar = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

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
  //navbar-expand-lg navbar-dark bg-primary
  return (
    <nav className="navbar   navbar-expand-lg navbar-nav">
      <div className="container-fluid">
        {/* <a className="" href="#" style={{marginRight : "-20px"}}> */}
        <img
          src={"../logo.avif"}
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
        ></img>
        {/* </a> */}

        <div
          className="collapse navbar-collapse"
          id="navbarColor01"
          style={{ marginLeft: "5px" }}
        >
          <ul className="navbar-nav me-auto">
            <li className="Filter">
              <Filter />
            </li>

            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li> */}
          </ul>

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div
            className="flex items-center ml-auto cursor-pointer gap-2 relative  "
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
              <div className="">
                <NavLink to={"/userProfile"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 ease-in-out">
                    Profile
                  </p>
                </NavLink>

                {user?.user.role === "admin" && (
                  <>
                    <NavLink to={"/dashboard/home"}>
                      <p className="text-base text-textColor hover:font-semibold duration-150  ease-in-out">
                        Dashboard
                      </p>
                    </NavLink>
                  </>
                )}
                <p
                  className="text-base text-textColor hover:font-semibold duration-150  ease-in-out"
                  onClick={logout}
                >
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
