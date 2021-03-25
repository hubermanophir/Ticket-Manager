import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Ticket({
  ticket,
  setHiddenCounter,
  hiddenCounter,
  setTicketsArray,
  ticketsArray,
  setLiveTicketsLength,
  liveTicketsLength,
}) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(ticket.done);
  }, []);

  const hideClickHandle = (e) => {
    const target = e.target.parentNode;
    const ticketArr = Array.from(document.querySelectorAll(".ticket"));
    const ticketIndex = ticketArr.indexOf(target);
    const tempTicketsArr = [...ticketsArray];
    tempTicketsArr.splice(ticketIndex, 1);
    setTicketsArray(tempTicketsArr);
    setHiddenCounter(hiddenCounter + 1);
    setLiveTicketsLength(liveTicketsLength - 1);
  };

  const isDoneHandler = (e) => {
    setIsDone(!isDone);
    (async () => {
      const ticket = e.parentElement;
      const id = ticket.childNodes[0].innerText;
      const done = isDone ? "undone" : "done";
      await axios.patch(`/api/tickets/${id}/${done}`);
    })();
  };

  const deleteHandler = (e) => {
    const ticketDiv = e.parentElement;
    const id = ticketDiv.childNodes[1].innerText;
    (async () => {
      try {
        await axios.delete(`/api/tickets/${id}`);
      } catch (err) {
        console.log(err.message);
      }
      const target = e.parentNode;
      const ticketArr = Array.from(document.querySelectorAll(".ticket"));
      const ticketIndex = ticketArr.indexOf(target);
      const tempTicketsArr = [...ticketsArray];
      tempTicketsArr.splice(ticketIndex, 1);
      setTicketsArray(tempTicketsArr);
    })();
    setLiveTicketsLength(liveTicketsLength - 1);
  };

  return (
    <div className={`ticket ${isDone ? "done" : "undone"}`}>
      <span className="id" hidden={true}>{`${ticket._id}`}</span>
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-info">
        <span className="user-email">{ticket.userEmail}</span>
        <span className="done-status">{ticket.done}</span>
        <span className="ticket-time">
          {formatDate(new Date(ticket.creationTime))}
        </span>
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
        onChange={(e) => isDoneHandler(e.target)}
        type="checkbox"
      ></input>
      <button onClick={(e) => deleteHandler(e.target)} className="delete">
        Delete
      </button>
    </div>
  );
}

//Helper functions---------------------------------------------------------
const formatDate = (myDate) => {
  const date = ("0" + myDate.getDate()).slice(-2);
  const month = ("0" + (myDate.getMonth() + 1)).slice(-2);
  const year = myDate.getFullYear();
  const hours = ("0" + myDate.getHours()).slice(-2);
  const minutes = ("0" + myDate.getMinutes()).slice(-2);
  const seconds = ("0" + myDate.getSeconds()).slice(-2);
  return `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export default Ticket;
