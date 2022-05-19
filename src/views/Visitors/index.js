import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import TablePagination from "@material-ui/core/TablePagination";
import { listUsers, createUser, listVisitors } from "apis";
import { useHistory } from "react-router-dom";
import CardHeader from "components/Card/CardHeader";
import { Button, createStyles, Grid, TextField } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 20,
  },
  backdrop: {
    zIndex: 99999,
    color: "#fff",
  },
  right: {
    float: 'right',
    marginRight: 15
  }
}));

export default function Visitors() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState({
    open: false,
    loading: false,
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.checked });
  };
  const {
    open,
    email,
    password,
    confirmPassword,
    username,
    firstName,
    lastName,
    visitor
  } = state;
  useEffect(() => {
    loadData();
  }, []);

  const history = useHistory();

  const loadData = async () => {
    setLoading(true);
    listVisitors(page + 1, size)
      .then((result) => {
        setData(result.data.data);
        setCount(result.data.totalCount);
      })
      .catch((e) => {
        if (e.response.status == 401 || e.response.status == 403) {
          history.push("/logout");
        }
        setLoading(false);
      });
  };
  const refresh = ()=>{
    if(page==0)
      loadData()
    else
      setPage(0)
  }
  const makeTableData = async () => {
    let tmpAll = [];
    data.map((item, key) => {
      let tmp = [];
      tmp.push(item["id"]);
      tmp.push(item["email"]);
      tmp.push(item["firstName"]);
      tmp.push(item["lastName"]);
      tmpAll.push(tmp);
    });
    setUsers(tmpAll);
    setLoading(false);
  };
  useEffect(() => {
    makeTableData();
  }, [data]);

  useEffect(() => {
    loadData();
  }, [page, size]);

  const rowClick = (row) => {
    history.push(`/admin/visitors/${row[0]}`, {
      email: row[1]
    });
  };
  const showDlg = () => {
    setstate({ ...state, open: true });
  };
  const handleSubmit = () =>{
    if(password !== confirmPassword || password === ""){
      alert("Invalid Password")
      return
    }
    if(!email ){
      alert("Email is required")
      return
    }
    const data = {
      email,
      firstName,
      lastName,
      password
    }
    
  }
  const handleClose = () => {
    setstate({
      ...state,
      open: false,
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      username: "",
    });
  };
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Card>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Email",
                "First Name",
                "Last Name",
              ]}
              tableData={ users }
              rowClick={ rowClick }
              refresh={ refresh }
              children={
              <Button 
                onClick={showDlg}
                variant="contained" color="secondary" className={classes.right}>
                + Create Visitor
              </Button>}
            />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              rowsPerPage={size}
              count={count}
              page={page}
              onChangePage={(event, val) => {
                setPage(val);
              }}
              onChangeRowsPerPage={(event) => {
                setPage(0);
                setTimeout(() => {
                  setSize(event.target.value);
                }, 500);
              }}
            ></TablePagination>
          </CardBody>
        </Card>
      </GridItem>
      <Dialog 
        // disableBackdropClick
        maxWidth={"sm"}
        fullWidth={"xs"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Create Visitor</DialogTitle>
        <DialogContent>
        <TextField
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            value={firstName}
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={lastName}
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={password}
            margin="dense"
            id="password"
            label="Password"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={confirmPassword}
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
  );
}
