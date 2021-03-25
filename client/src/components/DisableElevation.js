import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useState } from "react";

export default function DisableElevation({ setTicketsArray, ticketsArray }) {
  const [dateAscending, setsDateAscending] = useState(true);
  const [titleAscending, setsTitleAscending] = useState(true);

  const sortByDateHandler = () => {
    if (dateAscending) {
      ticketsArray.sort((a, b) => {
        const dateA = new Date(a.creationTime),
          dateB = new Date(b.creationTime);
        return dateB - dateA;
      });
    } else {
      ticketsArray.sort((a, b) => {
        const dateA = new Date(a.creationTime),
          dateB = new Date(b.creationTime);
        return dateA - dateB;
      });
    }
    const temp = [...ticketsArray];
    setTicketsArray(temp);
    setsDateAscending(!dateAscending);
  };
  const sortByTitleHandler = () => {
    if (titleAscending) {
      ticketsArray.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      ticketsArray.sort((a, b) => b.title.localeCompare(a.title));
    }
    const temp = [...ticketsArray];
    setTicketsArray(temp);
    setsTitleAscending(!titleAscending);
  };
  return (
    <ButtonGroup id="button-container" disableElevation variant="contained" color="primary">
      <Button onClick={() => sortByDateHandler()}>{dateAscending ? "Sort By Date ⬆" :"Sort By Date ⬇"}</Button>
      <Button onClick={() => sortByTitleHandler()}>{titleAscending ? "Sort By Title ⬆" :"Sort By Title ⬇"}</Button>
    </ButtonGroup>
  );
}
