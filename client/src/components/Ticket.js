import React from "react";
import { useState, useEffect } from "react";

function Ticket({
  ticket,
  setHiddenCounter,
  hiddenCounter,
  setTicketsArray,
  ticketsArray,
}) {
  const [shown, setShown] = useState(true);

  const hideClickHandle = (e) => {
    const ticketsDiv = e.target.parentElement.parentElement;
    const ticketArray = ticketsDiv.childNodes;
    const ticketDiv = e.target.parentElement;
    const index = [...ticketArray].indexOf(ticketDiv);
    ticketsArray.splice(index, 0);
    setTicketsArray(ticketsArray);
    setShown(!shown);
    setHiddenCounter(hiddenCounter + 1);
  };

  return (
    shown && (
      <div className="ticket">
        <div className="title">{ticket.title}</div>
        <div className="content">{ticket.content}</div>
        <div className="ticket-info">
          <span className="user-email">{ticket.userEmail}</span>
          <span className="done-status">{ticket.done}</span>
          <span className="ticket-time">{ticket.creationTime}</span>
        </div>
        <div className="label-div">
          {ticket.labels
            ? ticket.labels.map((label, i) => {
                return (
                  <span key={`label key: ${i}`} className="label">
                    {label}
                  </span>
                );
              })
            : null}
        </div>
        <button
          onClick={(e) => hideClickHandle(e)}
          className="hideTicketButton"
        >
          Hide
        </button>
      </div>
    )
  );
}

export default Ticket;
