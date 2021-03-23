import React from "react";

function ticket({ title, content, userEmail, done, creationTime }) {
  return (
    <div className="ticket">
      <div className="title">{title}</div>
      <div className="content">{content}</div>
      <div className="ticket-info">
        <span className="user-email">{userEmail}</span>
        <span className="done-status">{done}</span>
        <span className="ticket-time">{creationTime}</span>
      </div>
    </div>
  );
}

export default ticket;
