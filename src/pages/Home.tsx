import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";

const Home = () => {
  return (
    <>
      <Navbar pageTitle={"Michael Jackson"}></Navbar>
      <Search
        inputName={""}
        submitCallback={() => console.log("button clicked")}
        inputValidationCallback={() => {
          console.log("input valid");
          return true;
        }}
      />
    </>
  );
};

export default Home;
