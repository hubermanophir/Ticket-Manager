import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@material-ui/core";

function AddNew({ setTicketsArray, setLiveTicketsLength, liveTicketsLength }) {
  const [isOpen, setIsOpen] = useState(false);

  const userTicket = {
    title: "",
    content: "",
    userEmail: "",
    creationTime: new Date(),
    labels: [],
  };
  const clickHandler = () => {
    setIsOpen(true);
  };
  const closeDialog = () => {
    setIsOpen(false);
  };

  const submit = () => {
    (async () => {
      try {
        const res = await axios.post("/api/tickets", userTicket);
        console.log(res.data.newArray);
        res.data.newArray.sort((a, b) => {
          const dateA = new Date(a.creationTime),
            dateB = new Date(b.creationTime);
          return dateB - dateA;
        });
        setTicketsArray(res.data.newArray);
      } catch (error) {}
    })();
    setLiveTicketsLength(liveTicketsLength + 1);
    closeDialog();
  };

  return (
    <div>
      <button onClick={() => clickHandler()}>Add new</button>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        color="green"
      >
        <DialogTitle id="form-dialog-title">New Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="title"
            label="title"
            margin="normal"
            helperText="Ticket's title"
            onChange={(e) => {
              userTicket.title = e.target.value;
            }}
            fullWidth
            required
          />

          <TextField
            id="content"
            label="Content"
            margin="normal"
            helperText="Ticket's content"
            onChange={(e) => {
              userTicket.content = e.target.value;
            }}
            variant="outlined"
            rows="3"
            multiline
            fullWidth
            required
          />

          <TextField
            id="user-email"
            label="E-mail-address"
            margin="normal"
            helperText="Your e-mail address will be shown on the ticket"
            onChange={(e) => {
              userTicket.email = e.target.value;
            }}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            id="labels"
            label="labels"
            margin="normal"
            helperText="please use space in between each label (optional)"
            onChange={(e) => {
              userTicket.labels = e.target.value.split(" ");
            }}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button className="form-button" onClick={closeDialog} color="primary">
            Close
          </Button>
          <Button
            className="form-button"
            onClick={() => submit()}
            color="primary"
          >
            Add Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddNew;
