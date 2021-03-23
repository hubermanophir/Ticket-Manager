import React from "react";
import SearchArea from "./SearchArea";
import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "./Ticket";

function Main(props) {
  const [ticketsArray, setTicketsArray] = useState([]);

  useEffect(() => {
    (async function loadTickets() {
      setTicketsArray(await onLoadHandler());
    })();
  }, []);

  return (
    <div className="main-div">
      <SearchArea />
      <div className="ticket-area">
        {ticketsArray.map((ticket) => {
          return (
            <Ticket
              title={ticket.title}
              content={ticket.content}
              userEmail={ticket.userEmail}
              done={ticket.done}
              creationTime={ticket.creationTime}
            />
          );
        })}
      </div>
    </div>
  );
}

const onLoadHandler = async () => {
  const res = await axios.get("/api/tickets/");
  return res.data;
};

export default Main;
