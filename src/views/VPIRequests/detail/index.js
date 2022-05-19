import React, { useState, useEffect, useCallback } from "react";
// @material-ui/core components
import { createStyles, makeStyles } from "@material-ui/core/styles";
// core components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  getVisitorPassById,
  approveVisitorPass,
  rejectVisitorPass
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
import { UTCToLocalTime } from "utils/date-time-helper";
import { InputOutlined } from "@material-ui/icons";
import Backdrop from "@material-ui/core/Backdrop";

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
  },
  imageContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  modalInput: {
    margin: theme.spacing(2),
  },
  backdrop: {
    zIndex: 99999,
    color: "#fff",
  },
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

export default function VPIDetail() {
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
  const [showReject, setShowReject] = useState(false)
  const [state, setState] = React.useState({
    loading: false,
    reason
  });
  const { loading, reason } = state;
  const handleApprove = useCallback(async (id)=>{
    setState({ ...state, loading: true });
    try{
      await approveVisitorPass(id)
      getDetail(param.reqId)
      setState({ ...state, loading: false });
    }catch(e){
      console.log(e)
      setState({ ...state, loading: false });
    }
  }, [])
  const toggle = useCallback(() => {
    setShowDeleteModal(!showDeleteModal)
  }, [showDeleteModal])

  const handleProcess = useCallback(() => {
    deleteUser(param.reqId).then((resp) => {
      console.log(resp.data)
    }).catch((e) => {
      console.log(e)
    }).finally(() => {
      toggle()
      history.push("/admin/users")
    })
  }, [param, history, toggle])
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleInput = (e) => {
    let newData = { ...data, [e.target.id]: e.target.value };
    setData({ ...data, ...newData });
  };

  const handleReject = async () =>{
    setState({ ...state, loading: true });
    try{
      await rejectVisitorPass(data.id, { reason: data.reason })
      setState({ ...state, loading: false });
    }catch(e){
      console.log(e)
      setState({ ...state, loading: false });
    }
  }

  const getDetail = (id) => {
    setState({ ...state, loading: true });
    getVisitorPassById(id)
      .then((resp) => {
        setState({ ...state, loading: false });
        setData(resp.data.data);
      })
      .catch((e) => {
        if (e.response.status == 401 || e.response.status == 403) {
          history.push("/logout");
        }
        setState({ ...state, loading: false });
      });
  };

  useEffect(() => {
    getDetail(param.reqId);
    setState({ ...state, loading: true });
  }, [param]);
  return (
    <div className={classes.root}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container spacing={3}>
          <Grid item xs={12} md={11}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}  className={classes.imageContainer}>
                {
                  data.status === 'requested' ?
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={()=>{}}
                      >
                        {data.status}
                  </Button>
                  :
                  <Button
                      variant="contained"
                      style={{backgroundColor: "orange"}}
                      onClick={()=>{}}
                    >
                      {data.status}
                  </Button>
                }
                
              </Grid>
                <Grid item xs={12} sm={6} md={6}  className={classes.imageContainer}>
                  <img
                    style={{width: "100%", maxWidth: 300, height: '100%'}}
                    src={data.photo}
                  />
                  <Typography>Face Photo</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className={classes.imageContainer}>
                  <Grid item xs={12} className={classes.imageContainer} style={{justifyContent: 'flex-start'}}>
                    <img
                      style={{width: "100%", maxWidth: 400, border:"solid 2px grey"}}
                      src={data.id_photo_front}
                    />
                    <Typography>ID Front Photo</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.imageContainer} style={{justifyContent: 'flex-start'}}>
                    <img
                      style={{width: "100%", maxWidth: 400}}
                      src={data.id_photo_back}
                    />
                    <Typography>ID Back Photo</Typography>
                  </Grid>

                </Grid>

                <Grid item xs={7}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="email"
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={data.email || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="firstName"
                    InputProps={{readOnly: true}}
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={data.firstName || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="lastName"
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={data.lastName || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="firstName"
                    InputProps={{readOnly: true}}
                    fullWidth
                    label="Company"
                    variant="outlined"
                    value={data.company || ""}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="lastName"
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    value={data.phone || ""}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="updatedAt"
                    fullWidth
                    label="ID Type"
                    variant="outlined"
                    value={data.idType || ""}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="updatedAt"
                    fullWidth
                    label="ID #"
                    variant="outlined"
                    value={data.idNumber || ""}
                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="updatedAt"
                    fullWidth
                    label="Escort Name"
                    variant="outlined"
                    value={data.escortName || ""}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="updatedAt"
                    fullWidth
                    label="Escort ASIC ID"
                    variant="outlined"
                    value={data.escortAsicId || ""}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="operational_need"
                    fullWidth
                    label="Operational Need"
                    variant="outlined"
                    value={data.operationalNeed || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      id="startTime"
                      InputProps={{readOnly: true}}
                      fullWidth
                      label="Reason"
                      variant="outlined"
                      value={data.reason || ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="startTime"
                    InputProps={{readOnly: true}}
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    value={UTCToLocalTime(data.startTime) || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    InputProps={{readOnly: true}}
                    id="endTime"
                    fullWidth
                    label="End Date"
                    variant="outlined"
                    value={UTCToLocalTime(data.endTime) || ""}
                  />
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={3} className={classes.imageContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => history.goBack()}
                    >
                      Back
                    </Button>
                  </Grid>

                  <Grid item xs={3} className={classes.imageContainer}>
                    {
                      <Button
                          style={{ backgroundColor: data.status!=="Requested"?"grey":"green", color: "white" }}
                          variant="contained"
                          color="inherit"
                          disabled={(data.status!=="Requested")}
                          onClick={()=>{
                            handleApprove(data.id)
                          }}
                        >
                          Approve
                      </Button>
                    }
                  </Grid>
                  <Grid item xs={3} className={classes.imageContainer}>
                      <Button
                          style={{ backgroundColor: data.status!=="Requested"?"grey":"red", color: "white" }}
                          variant="contained"
                          color="inherit"
                          onClick={()=>{
                            setShowReject(!showReject)
                          }}
                          disabled={(data.status!=="Requested")}
                        >
                          Reject
                      </Button>
                  </Grid>
                  <Grid item xs={3} className={classes.imageContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ backgroundColor: "black"}}
                      onClick={()=>{}}
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

                <Modal
                  open={showReject}
                  onClose={()=>{
                    setShowReject(!showReject)
                  }}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  
                  <div className={classes.modalBody}>
                    <Typography>
                      Are you sure want to reject this request
                    </Typography>

                    <TextField
                      className={classes.modalInput}
                      id="reason"
                      fullWidth
                      label="Please input the reason why you reject this"
                      variant="outlined"
                      value={reason}
                      onChange={handleInput}
                    />
                    <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                    >
                      <Grid item >
                        <Button
                          onClick={()=>{
                              handleReject()
                              setShowReject(false)
                            }
                          }
                          className={classes.modalButton} variant="contained" color='primary'>Yes</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={()=>setShowReject(!showReject)}
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
    </div>
  );
}
