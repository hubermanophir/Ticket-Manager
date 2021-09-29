import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts({ goodAlert, badAlert }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {goodAlert ? (
        <Alert className="alert" variant="filled" severity="success">
          Ticket added successfully!
        </Alert>
      ) : badAlert ? (
        <Alert className="alert" variant="filled" severity="error">
          Please check your network connection!
        </Alert>
      ) : null}
    </div>
  );
}
