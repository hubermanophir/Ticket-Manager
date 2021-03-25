import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ ticket, formatDate }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className="show-more"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Show More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ticket.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ticket.content}
          </DialogContentText>
          <DialogContentText>
            {ticket.userEmail}, {formatDate(new Date(ticket.creationTime))}
          </DialogContentText>
          <DialogContentText>
            {ticket.labels
              ? ticket.labels.map((label, i) => {
                  return (
                    <span key={`label key: ${i}`} className="dialog-label">
                      {`${label} `}
                    </span>
                  );
                })
              : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
