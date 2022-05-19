import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const fieldStyles = {
  fieldContainer: {
    width: "100%",
    height: "100%",
    border: 0,
    margin: 0,
    display: "inline-flex",
    padding: 0,
    position: "relative",
    minWidth: 0,
    flexDirection: "column",
    verticalAlign: "top",
  },
  fieldLabel: {
    transform: "translate(14px, -6px) scale(0.75)",
    zIndex: 1,
    pointerEvents: "none",
    transformOrigin: "top left",
    top: 0,
    left: 0,
    position: "absolute",
    display: "block",
    transformOrigin: "top left",
    color: "rgba(0, 0, 0, 0.54)",
    padding: 0,
    fontSize: "1rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: 1,
    background: "#FFF",
    padding: "0 5px",
  },
  fieldContent: {
    position: "relative",
    borderRadius: "4px",
    width: "100%",
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "text",
    display: "inline-flex",
    position: "relative",
    fontSize: "1rem",
    boxSizing: "border-box",
    alignItems: "center",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    lineHeight: "1.1876em",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    height: "100%",
    padding: "10px",
  },
};

const useStyles = makeStyles(fieldStyles);

function Field({label, children}) {
  const classes = useStyles();

  return (
    <div className={classes.fieldContainer}>
      <label className={classes.fieldLabel}>{label}</label>
      <div className={classes.fieldContent}>
        {children}
      </div>
    </div>
  );
}

export default Field;
