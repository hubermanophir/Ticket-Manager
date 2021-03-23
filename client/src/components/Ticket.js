import React from "react";

function Ticket({ ticket}) {
  return (
    <div className="ticket">
      <div className="title">{ticket.title}</div>
      <div className="content">{ticket.content}</div>
      <div className="ticket-info">
        <span className="user-email">{ticket.userEmail}</span>
        <span className="done-status">{ticket.done}</span>
        <span className="ticket-time">{ticket.creationTime}</span>
      </div>
      <div className="label-div">
        {ticket.labels ? ticket.labels.map((label,i) => {
          return <span key={`label key: ${i}`} className="label">{label}</span>;
        }):null}
      </div>
    </div>
  );
}

export default Ticket;
