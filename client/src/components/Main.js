import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";
import AddNew from "./AddNew";
import SimpleAlerts from "./SimpleAlerts";
import DisableElevation from "./DisableElevation";
import Button from "@material-ui/core/Button";
import CircularIndeterminate from "./CircularIndeterminate";
const BASE_URL = "/api/tickets";

function Main(props) {
  const [ticketsArray, setTicketsArray] = useState([]);
  const [hiddenCounter, setHiddenCounter] = useState(0);
  const [tempArray, setTempArray] = useState([]);
  const [liveTicketsLength, setLiveTicketsLength] = useState("0");
  const [goodAlert, setGoodAlert] = useState(false);
  const [badAlert, setBadAlert] = useState(false);
  const [displaySpinner, setDisplaySpinner] = useState(false);

  useEffect(() => {
    (async function loadTickets() {
      setDisplaySpinner(true);
      const res = await axios.get(BASE_URL);
      setDisplaySpinner(false);
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
      {displaySpinner && <CircularIndeterminate />}
      <h1 id="main-title">Ticket Manager</h1>
      <h2>My Way</h2>
      <div className="control-container">
        <DisableElevation
          ticketsArray={ticketsArray}
          setTicketsArray={setTicketsArray}
        />

        <Button
          variant="contained"
          color="primary"
          id="restoreHideTickets"
          onClick={() => restoreHandler()}
        >
          restore
        </Button>
        <AddNew
          setTicketsArray={setTicketsArray}
          liveTicketsLength={liveTicketsLength}
          setLiveTicketsLength={setLiveTicketsLength}
          setBadAlert={setBadAlert}
          setGoodAlert={setGoodAlert}
        />
        <input
          onChange={(e) => onInputChange(e.target.value)}
          id="searchInput"
          type="text"
          placeholder="Search Task"
        />
        <div className="ticket-number-div">-{liveTicketsLength} results-</div>
        <div id="counter-div">
          <span id="hideTicketsCounter">{hiddenCounter}</span> Hidden tickets
        </div>
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
