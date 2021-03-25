import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import AddNew from "./AddNew";
import SimpleAlerts from "./SimpleAlerts";
import DisableElevation from "./DisableElevation";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [hiddenCounter, setHiddenCounter] = useState(0);
  const [tempArray, setTempArray] = useState([]);
  const [liveTicketsLength, setLiveTicketsLength] = useState("0");
  const [goodAlert, setGoodAlert] = useState(false);
  const [badAlert, setBadAlert] = useState(false);

  useEffect(() => {
    (async function loadTickets() {
      const res = await axios.get(BASE_URL);
      res.data.sort((a, b) => {
        const dateA = new Date(a.creationTime),
          dateB = new Date(b.creationTime);
        return dateB - dateA;
      });
      setTicketsArray(res.data);
      setTempArray(res.data);
      setLiveTicketsLength(res.data.length);
    })();
    setHiddenCounter(0);
  }, []);

  const onInputChange = async (input) => {
    const res = await axios.get(`${BASE_URL}?searchText=${input}`);
    setLiveTicketsLength(res.data.length);
    setTicketsArray(res.data);
  };

  const restoreHandler = () => {
    setHiddenCounter(0);
    setTicketsArray(tempArray);
    setLiveTicketsLength(tempArray.length);
  };

  return (
    <div className="main-div">
      {(goodAlert || badAlert) && (
        <SimpleAlerts goodAlert={goodAlert} badAlert={badAlert} />
      )}
      <h1 id="main-title">Tickets Manager</h1>
      <div className="control-container">
        <input
          onChange={(e) => onInputChange(e.target.value)}
          id="searchInput"
          type="text"
        />
        <DisableElevation
          ticketsArray={ticketsArray}
          setTicketsArray={setTicketsArray}
        />
        <AddNew
          setTicketsArray={setTicketsArray}
          liveTicketsLength={liveTicketsLength}
          setLiveTicketsLength={setLiveTicketsLength}
          setBadAlert={setBadAlert}
          setGoodAlert={setGoodAlert}
        />
        <div id="counter-div">
          Number of hidden tickets:
          <span id="hideTicketsCounter">{hiddenCounter}</span>
        </div>
        <button id="restoreHideTickets" onClick={() => restoreHandler()}>
          restore
        </button>
        <div className="ticket-number-div">-{liveTicketsLength} results-</div>
      </div>
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
              setLiveTicketsLength={setLiveTicketsLength}
              liveTicketsLength={liveTicketsLength}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;
