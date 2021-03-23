import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [hiddenCounter, setHiddenCounter] = useState(0);
  const [tempArray, setTempArray] = useState([]);

  useEffect(() => {
    (async function loadTickets() {
      const res = await axios.get(BASE_URL);
      setTicketsArray(res.data);
      setTempArray(res.data);
    })();
    setHiddenCounter(0);
  }, []);

  const onInputChange = async (input) => {
    const res = await axios.get(`${BASE_URL}?searchText=${input}`);
    setTicketsArray(res.data);
  };

  const restoreHandler = () => {
    setHiddenCounter(0);
    setTicketsArray(tempArray);
  };

  return (
    <div className="main-div">
      <input
        onChange={(e) => onInputChange(e.target.value)}
        id="searchInput"
        type="text"
      />
      <div id="counter-div">
        Number of hidden tickets:
        <span id="hideTicketsCounter">{hiddenCounter}</span>
      </div>
      <button id="restoreHideTickets" onClick={() => restoreHandler()}>
        restore
      </button>
      <div className="ticket-area">
        {ticketsArray.map((ticket, i) => {
          return (
            <Ticket
              key={`ticket key: ${i}`}
              ticket={ticket}
              setHiddenCounter={setHiddenCounter}
              hiddenCounter={hiddenCounter}
              setTicketsArray={setTicketsArray}
              ticketsArray={ticketsArray}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;
