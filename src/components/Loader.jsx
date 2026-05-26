import React from "react";
import { ImSpinner8 } from "react-icons/im";
import "../styles/Loader.css"
const Loader = () => (
  <div className="loader-container">
    <ImSpinner8 className="spinner" />
    <p>Loading...</p>
  </div>
);

export default Loader;
