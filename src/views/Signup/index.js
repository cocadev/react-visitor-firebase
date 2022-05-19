import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login, parseSignupToken } from 'apis';
import { Axios } from 'apis/axios';
import { makeStyles } from '@material-ui/core/styles';
import { getPortalToken } from "apis";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { requestSignup } from "apis";

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    backdrop: {
        zIndex: 9999,
        color: '#fff',
      },
  }));
function Signup() {
  const history = useHistory()
  const classes = useStyles();
  const params = useLocation()
  console.log("===========params======================", params)
  const { search } = params;
  const [ loading, setLoading ] = useState(true)
  let token ;
  if(search.split('token=').length > 1)
    token=search.split('token=')[1]
  const load = () =>{
    setLoading(true)
    parseSignupToken(token).then((resp)=>{
        setState({
            ...state,
            ...resp.data.data
        })
    })
    .catch((e)=>{
        alert(" invalid signup token")
    }).finally(()=>{
        setLoading(false)
    })
  }
  useEffect(()=>{
    if(token) load()
  }, [ token ])
  const handleSubmit = () => {
    if( !email || !firstName || !password || !asicId || !company || !location || !expDate){
        alert("Invalid Input");
        return
    }
    const data = {
        ...state,

    }
    setLoading(true)
    requestSignup(data).then((resp)=>{
        alert("Signup request sent, please wait for admin's approval")
    }).catch((e)=>{
        alert("Signup failed")
    }).finally(()=>{
        setLoading(false)
    })
  }

  const [state, setState] = useState({
    id: "",
    email : "",
    firstName: "",
    lastName: "",
    password: "",
    asicId: "",
    company: "",
    location: "",
    expDate: null
  })
  const { firstName, lastName, email, password, asicId, company, location, expDate } = state;

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === 'username') {
      setState({ ...state, [id]: value.toLowerCase() })
    } else {
      setState({ ...state, [id]: value })
    }
  };

  const handleClose = () => {
    return true;
  }

  return (
    <Grid container>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
      <Dialog
        maxWidth={"sm"}
        fullWidth={"xs"}
        disableBackdropClick
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Signup Digital Asic</DialogTitle>
        <DialogContent>
            
          <DialogContentText>
            Please input digital asic details
          </DialogContentText>
          <TextField
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            onChange={handleInput}
            
          />
          <TextField
            value={firstName}
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            onChange={handleInput}
            fullWidth
          />

          <TextField
            value={lastName}
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            onChange={handleInput}
            fullWidth
          />

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
            value={asicId}
            autoFocus
            margin="dense"
            id="asicId"
            label="Asic Id"
            onChange={handleInput}
            fullWidth
          />
           <TextField
            value={company}
            autoFocus
            margin="dense"
            id="company"
            label="company"
            onChange={handleInput}
            fullWidth
          />

          <TextField
            value={location}
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            onChange={handleInput}
            fullWidth
          />

        <TextField
            id="expDate"
            label="Expiration Date"
            type="date"
            defaultValue="2025-12-30"
            onChange={handleInput}
            value={expDate}
            fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="secondary">
            Request Register
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
export default Signup;
