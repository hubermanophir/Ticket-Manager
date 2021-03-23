import React from "react";
import searchArea from "./searchArea";
import axios from "axios";

function main(props) {
  return (
    <div className="main-div">
      <searchArea />
      <div onLoad={() => onLoadHandler} className="ticket-area"></div>
    </div>
  );
}

const onLoadHandler = () => {};

export default main;
