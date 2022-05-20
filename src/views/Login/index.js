import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from 'apis';
import { Axios } from 'apis/axios';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from "@material-ui/core/FormControl";
import { CircularProgress, InputLabel, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Login() {
  const history = useHistory()
  const handleSubmit = () => {
    setLoading(true);
    login(username, password).then(async resp => {
      Axios.defaults.headers = {
        "Content-Type": "application/json",
        "Authorization": null
      }
      let user = resp.data.result;
      let token = resp.data.token;
      const request = {
        ClientId: "1",
        ClientSecret: "test1",
        GrantType: "password",
        Password: "orangePotatoe54$",
        Username: "melaev-api"
      }

      setLoading(false);

      if (user.roles.includes('Admin')) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", "admin")
        Axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        history.push('admin/')

      } else if (user.roles.includes('Read')) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", "user")
        Axios.defaults.headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        history.push('user/')
      }
    })
      .catch(e => {
        setLoading(false);
        setOpen(true);
      })
  }

  const [state, setState] = useState({
    username: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { username, password } = state;

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

  const onhandleClose = () => {
    setOpen(false);
  }

  return (
    <Grid container>
      <Dialog
        maxWidth={"sm"}
        fullWidth={"xs"}
        disableBackdropClick
        open={true}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ textAlign: 'center', }}>Login</DialogTitle>
        <br />
        <DialogContent >
          {/* <DialogContentText>
            Please input username and password.
          </DialogContentText> */}

          <TextField
            variant="outlined"
            value={username}
            autoFocus
            id="username"
            label="UserName"
            onChange={handleInput}
            fullWidth
          />
          <br /><br />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-password">Password</InputLabel>
            <OutlinedInput
              value={password}
              // margin="dense"
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleInput}
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
        </DialogContent>
        <br />
        <div style={{ textAlign: 'center'}}>
          <Button onClick={handleSubmit} color="primary" size='large' variant='contained' style={{width: 200}}>
            {loading? <CircularProgress color='#fff' size={26}/> : 'Log In'}
          </Button>
        </div>
        <br />
      </Dialog>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onhandleClose}
      >
        <Alert onClose={onhandleClose} severity={'error'}>
          Login failed!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
export default Login;
