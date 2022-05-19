import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Collapse, IconButton, Button, Menu, MenuItem  } from '@material-ui/core';
import clsx from 'clsx';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RefreshIcon from '@material-ui/icons/Refresh';
import { bindTrigger, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';


const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [openId, setOpenId] = useState(-1);
  const { 
    tableHead, 
    tableData, 
    tableHeaderColor, 
    action, 
    actionTitle, 
    children, 
    operational, 
    rowClick, 
    onCreateOpReq, 
    onEditOpReq, 
    dropdownClick, 
    operationalRequirements, 
    opLoading, 
    page,
    rowActionButton,
    activeClick
  } = props;
  
  useEffect(()=>{
    setOpenId(-1);
  },[page, tableData])

  return (
    <div className={classes.tableResponsive}>
      <Button
        variant="contained"
        color="primary"
        onClick={props.refresh}
        className={classes.refreshButton}
        endIcon={<RefreshIcon />}
      >
        Refresh
      </Button>
      {
        action &&
        <Button
          style={{ marginRight: "20px" }}
          variant="contained"
          color="primary"
          onClick={props.action}
          className={classes.refreshButton}
        >
          {actionTitle || "Import"}
        </Button>
      }
      {children}
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
              {operational && <TableCell />}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <>
                <TableRow
                  key={key}
                  className={clsx(classes.tableBodyRow, openId === key && classes.tableRowHideBottom)}
                  onClick={() => !operational && rowClick(prop)}
                >
                  {prop.map((prop2, key) => {
                    if(tableHead[key] == 'Action'){
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {rowActionButton(prop)}
                        </TableCell>
                      );
                    }
                    if (key < tableHead.length)
                      return (
                        <TableCell className={classes.tableCell} key={key}>
                          {prop2}
                        </TableCell>
                      );
                  })}
                  {operational && <TableCell align="right" style={{ padding: '0 8px 0 0' }}>
                    {
                      prop[2] ? 
                      <Button variant="outlined" size="small" style={{ marginRight: 10, color:"white",  background: "#388e3c", textTransform: "none" }} onClick={() => activeClick(prop)}>
                        Active
                      </Button>
                      :
                      <Button variant="outlined" size="small" style={{ marginRight: 10, color:"#388e3c",  background: "white", textTransform: "none", borderColor: "#388e3c" }} onClick={() => activeClick(prop)}>
                        Active
                      </Button>
                    }
                    <Button variant="outlined" color="primary" size="small" style={{ textTransform: 'none' }} onClick={() => rowClick(prop)}>
                      Edit
                    </Button>
                    <IconButton
                      onClick={() => {
                        openId !== key && dropdownClick(prop);
                        setOpenId(openId === key ? -1 : key);
                      }}
                      style={{ marginLeft: 12 }}
                      size='small'
                    >
                      {openId === key ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton >
                  </TableCell>}
                </TableRow>

                {operational && <TableRow className={classes.tableRowHideBottom}>
                  <TableCell style={{ padding: 0 }} colSpan={6}>
                    <Collapse in={openId === key ? true : false} timeout="auto" unmountOnExit className={classes.collapse}>
                      <h4>Operational Requirements &nbsp;&nbsp;
                        <Button variant="outlined" color="secondary" size="small" style={{ textTransform: 'none', float: 'right' }} onClick={onCreateOpReq}>
                          + Create Operational Requirement
                        </Button>
                      </h4>
                      { !opLoading && operationalRequirements.length > 0 && <Table size="small" aria-label="purchases" style={{ marginBottom: 12 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Operational Requirement</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {operationalRequirements.map((item, key) => (
                            <TableRow key={key} className={classes.tableBodyRow} style={{ height: 36 }} onClick={() => onEditOpReq(item)}>
                              <TableCell component="th" scope="row">
                                {item.id}
                              </TableCell>
                              <TableCell> {item.operationRequirement} </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>}
                      {opLoading && <>loading...</>}
                      {!opLoading && operationalRequirements.length === 0 && <>No Operational Requirements</>}
                    </Collapse>
                  </TableCell>
                </TableRow>
                }
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};