import React, { useState, useEffect, useCallback } from "react";
// @material-ui/core components
import { createStyles, makeStyles } from "@material-ui/core/styles";
// core components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  getUser,
  updateUser,
  listAccessLocationNames,
  updateUserAccessLocations,
  deleteUser
} from "apis";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { InputLabel, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  modalBody: {
    top: 300,
    width: "400px",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    left: "50%",
    transform: `translate(${-200}px, ${0}px)`,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 10
  },
  modalButton: {
    marginTop: 20,
    marginRight: 10
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UserDetail() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");
  const param = useParams();
  const [data, setData] = useState({});
  const classes = useStyles();
  const [locationList, setLocationList] = useState([]);
  const [selectedNameList, setSelectedNameList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = React.useState({
    admin: false,
    read: false,
    app: false,
    visitor: false,
    loading: false,
  });
  const { admin, read, app, loading, visitor } = state;

  const toggle = useCallback(() => {
    setShowDeleteModal(!showDeleteModal)
  }, [showDeleteModal])

  const handleProcess = useCallback(() => {
    deleteUser(param.id).then((resp) => {
      console.log(resp.data)
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      toggle()
      history.push("/admin/users")
    })
  }, [param, history, toggle])
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeLocation = (e) => {
    const val = e.target.value;
    const tmp = selectedNameList;

    // if(selectedNameList.includes(val)){
    //   tmp = tmp.filter((item)=>item != val)
    // }else{
    //   tmp.push(val)
    // }
    console.log(selectedNameList);
    setSelectedNameList(val);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUpdate = () => {
    let tmp = data;
    if (read) tmp["roles"] = "Read";

    if (app) tmp["roles"] = "App";

    if (visitor) tmp["roles"] = "Visitor";

    if (read && app) tmp["roles"] = "App, Read";
    if (read && visitor) tmp["roles"] = "Read, Visitor";
    if (app && visitor) tmp["roles"] = "App, Visitor";

    if (admin) tmp["roles"] = "Admin";

    delete tmp.access_locations;

    updateUser(param.id, tmp)
      .then((resp) => {
        setMessage("User updated successfully");
        setStatus("success");
        setOpen(true);
      })
      .catch((e) => {
        if (e.response.status == 401 || e.response.status == 403) {
          history.push("/logout");
        }
        setMessage("User update failed");
        setStatus("error");
        setOpen(true);
        console.log("update error=======", e);
      });
    let idList = [];
    locationList.map((location) => {
      if (selectedNameList.includes(location.locationName))
        idList.push(location.id);
    });
    updateUserAccessLocations(data.id, {
      access_locations: idList,
    });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleInput = (e) => {
    let newData = { ...data, [e.target.id]: e.target.value };
    setData({ ...data, ...newData });
  };
  const getDetail = (id) => {
    getUser(id)
      .then((resp) => {
        setState({ ...state, loading: false });
        setData(resp.data.data);
        console.log(resp.data.data);
        let role = resp.data.data.roles;
        if (role.includes("Admin"))
          setState({ ...state, read: true, admin: true, app: true });
        else 
          setState({
            ...state,
            read: role.includes("App"),
            visitor: role.includes("Visitor"),
            read: role.includes("Read")
          })  
        let tmp = [];
        resp.data.data.access_locations.map((item) => {
          tmp.push(item.locationName);
        });
        setSelectedNameList(tmp);
      })
      .catch((e) => {
        if (e.response.status == 401 || e.response.status == 403) {
          history.push("/logout");
        }
        setState({ ...state, loading: false });
      });
    listAccessLocationNames()
      .then((resp) => {
        console.log(resp.data.result);
        setLocationList(resp.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDetail(param.id);
    setState({ ...state, loading: true });
  }, [param]);

  return (
    <div className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={7}>
                  <TextField
                    id="username"
                    placeholder="heheheh"
                    fullWidth
                    label="User ID"
                    variant="outlined"
                    onChange={handleInput}
                    value={data.username || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="firstName"
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    onChange={handleInput}
                    value={data.firstName || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="lastName"
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    onChange={handleInput}
                    value={data.lastName || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">User Roles</FormLabel>
                    <FormGroup>
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
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography>User Access Location Names</Typography>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedNameList}
                    onChange={handleChangeLocation}
                    input={<Input fullWidth />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {locationList.map((item, key) => (
                      <MenuItem key={item.id} value={item.locationName}>
                        <Checkbox
                          checked={
                            selectedNameList.indexOf(item.locationName) > -1
                          }
                        />
                        <ListItemText primary={item.locationName} />
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="updatedAt"
                    fullWidth
                    label="Updated Date"
                    variant="outlined"
                    value={new Date(data.updatedAt).toLocaleDateString() || ""}
                  />
                </Grid>

                <Grid item xs={7}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      fullWidth
                      onChange={handleInput}
                      label="New Password"
                      variant="outlined"
                      value={data.password || ""}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => history.push("/admin/users")}
                    >
                      Back
                    </Button>
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      style={{ backgroundColor: "orange", color: "white" }}
                      variant="contained"
                      color="inherit"
                      onClick={handleUpdate}
                    >
                      Update
                    </Button>
                  </Grid>

                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Modal
                  open={showDeleteModal}
                  onClose={toggle}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div className={classes.modalBody}>
                    <Typography>
                      Are you sure want to delete this user?
                    </Typography>
                    <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item >
                        <Button
                          onClick={handleProcess}
                          className={classes.modalButton} variant="contained" color='primary'>Yes</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={toggle}
                          className={classes.modalButton} variant="contained" color='secondary' >Cancel</Button>
                      </Grid>

                    </Grid>
                  </div>

                </Modal>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity={status}>
                    {message}
                  </Alert>
                </Snackbar>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
