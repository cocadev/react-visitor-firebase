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
import { listUsers, createUser } from "apis";
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

export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState({
    open: false,
    admin: false,
    app: true,
    read: false,
    loading: false,
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
  });
  const handleChange = (event) => {
    setstate({ ...state, [event.target.name]: event.target.checked });
  };
  const {
    open,
    admin,
    app,
    read,
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
    listUsers(page + 1, size)
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
      tmp.push(item["username"]);
      tmp.push(item["firstName"]);
      tmp.push(item["lastName"]);
      tmp.push(item["roles"]);
      tmp.push(new Date(item["createdAt"]).toLocaleString());
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
    history.push(`users/${row[0]}`);
  };
  const showDlg = () => {
    setstate({ ...state, open: true });
  };
  const handleClose = () => {
    setstate({
      ...state,
      open: false,
      admin: false,
      app: true,
      read: false,
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      username: "",
      visitor: ""
    });
  };
  const handleSubmit = () => {
    if (
      !password ||
      !confirmPassword ||
      !username ||
      password != confirmPassword
    ) {
      alert("Invalid Input");
      return;
    }

    let data = {
      username,
      password,
      firstName,
      lastName,
      roles: "",
      visitor
    };

    if (read) data["roles"] = "Read";

    if (app) data["roles"] = "App";
    
    if (read && app) data["roles"] = "App, Read";
    if (read && visitor) data["roles"] = "Read, Visitor";
    if (app && visitor) data["roles"] = "App, Visitor";

    if (admin) data["roles"] = "Admin";

    createUser(data)
      .then((resp) => {
        console.log("======user create==", resp);
        loadData();
        handleClose();
      })
      .catch((e) => {
        handleClose();
        console.log("=======user create error==", e);
      });
    console.log("=======data===========", data);
  };
  const handleInput = (event) => {
    setstate({ ...state, [event.target.id]: event.target.value });
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
                "UserID",
                "First Name",
                "Last Name",
                "Role",
                "Created At",
              ]}
              tableData={ users }
              rowClick={ rowClick }
              refresh={ refresh }
              children={<Button variant="contained" color="secondary" onClick={showDlg} className={classes.right}>
              + Create User
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
        maxWidth={"sm"}
        fullWidth={"xs"}
        disableBackdropClick
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can create a user with your desired roles.
          </DialogContentText>
          <TextField
            value={username}
            autoFocus
            margin="dense"
            id="username"
            label="UserID"
            onChange={handleInput}
            fullWidth
          />
          <TextField
            value={firstName}
            margin="dense"
            id="firstName"
            label="First Name"
            fullWidth
            onChange={handleInput}
          />
          <TextField
            value={lastName}
            margin="dense"
            id="lastName"
            label="Last Name"
            fullWidth
            onChange={handleInput}
          />
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <Grid container>
                <FormLabel>Roles</FormLabel>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={admin}
                        onChange={handleChange}
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={read}
                        onChange={handleChange}
                        name="read"
                      />
                    }
                    label="Read-Only"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={app}
                        onChange={handleChange}
                        name="app"
                      />
                    }
                    label="App"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={visitor}
                        onChange={handleChange}
                        name="visitor"
                      />
                    }
                    label="Visitor"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
          <TextField
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={handleInput}
          />
          <TextField
            value={confirmPassword}
            margin="dense"
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            onChange={handleInput}
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
