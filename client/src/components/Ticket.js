import React from "react";
import { useState } from "react";

function Ticket({
  ticket,
  setHiddenCounter,
  hiddenCounter,
  setTicketsArray,
  ticketsArray,
}) {
  const [isDone, setIsDone] = useState(false);

  const hideClickHandle = (e) => {
    const target = e.target.parentNode;
    const ticketArr = Array.from(document.querySelectorAll(".ticket"));
    const ticketIndex = ticketArr.indexOf(target);
    const tempTicketsArr = [...ticketsArray];
    tempTicketsArr.splice(ticketIndex, 1);
    setTicketsArray(tempTicketsArr);
    setHiddenCounter(hiddenCounter + 1);
  };

  const deleteHandler = () => {
    
  }

  return (
    <div className={`ticket ${isDone ? "done" : "undone"}`}>
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-info">
        <span className="user-email">{ticket.userEmail}</span>
        <span className="done-status">{ticket.done}</span>
        <span className="ticket-time">{formatDate(new Date(ticket.creationTime))}</span>
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
      <button onClick={(e) => hideClickHandle(e)} className="hideTicketButton">
        Hide
      </button>
      <input
        checked={isDone}
        className="checkbox"
        onChange={() => setIsDone(!isDone)}
        type="checkbox"
      ></input>
      <button onClick = {() => deleteHandler()} className="delete">Delete</button>
    </div>
  );
}

//Helper functions---------------------------------------------------------
const formatDate = (myDate) => {
  const date = ('0' + myDate.getDate()).slice(-2);
  const month = ('0' + (myDate.getMonth() + 1)).slice(-2);
  const year = myDate.getFullYear();
  const hours = ('0' + myDate.getHours()).slice(-2);
  const minutes = ('0' + myDate.getMinutes()).slice(-2);
  const seconds = ('0' + myDate.getSeconds()).slice(-2);
  return `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

export default Ticket;
