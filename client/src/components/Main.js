import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    (async function loadTickets() {
      const res = await axios.get(BASE_URL);
      setTicketsArray(res.data);
    })();
  }, []);

  const onInputChange = async (input) => {
      const res = await axios.get(`${BASE_URL}?searchText=${input}`);
      setTicketsArray(res.data);
  };

  return (
    <div className="main-div">
      <input
        onChange={(e) => onInputChange(e.target.value)}
        id="searchInput"
        type="text"
      />
      <div className="ticket-area">
        {ticketsArray.map((ticket, i) => {
          return <Ticket key={`ticket key: ${i}`} ticket={ticket} />;
        })}
      </div>
    </div>
  );
}

export default Main;
