import React, { useState, useEffect } from "react";
// @material-ui/core components
import { createStyles, makeStyles } from "@material-ui/core/styles";
// core components
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { getSubmission, listAsics, listSubmissions } from "../../../apis";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Typography } from '@material-ui/core';
import Field from "components/Field";

const styles = createStyles({
  myPad: {
    paddingLeft: "30px",
    paddingRight: "10px",
  },
 
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(2),
  },
}));

export default function SubmissionDetail() {
  const param = useParams();
  const [data, setData] = useState({});
  const classes = useStyles(styles);
  const [state, setstate] = useState({
    name: ""
  })
  const { name } = state;
  const [asicStatus, setAsicStatus] = useState('');
  const getDetail = (id) => {
    getSubmission(id).then((resp) => {
      setData(resp.data.data);
      let tmp = resp.data.data.submittedBy;
      let status = resp.data.data.asicStatus;
      if(tmp){
        if(tmp.firstName || tmp.lastName){
          setstate({...state, name: tmp.firstName + " " + tmp.lastName})
        }else{
          setstate({...state, name: tmp.username})
        }
      }
      switch(status){
        case 0:
          setAsicStatus("Active")
          break;
        case 4:
          setAsicStatus("Lost")
          break;
        case 5:
          setAsicStatus("Suspended")
          break;
        case 6:
          setAsicStatus("Deleted")
          break;          
      }
    }).catch((e) => {
      if(!e.response){
        console.log("====unknown error===", e)
        return
      }
      if(e.response.status == 401 || e.response.status==403)
      {
        history.push('/logout')
      }
    });;
  };

  useEffect(() => {
    getDetail(param.id);
  }, [param]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <img
                  alt="Face Image"
                  src={data.imageFaceUrl}
                  style={{ width: "100%" }}
                />
              </Grid>

              <Grid item xs={4}>
                <img
                  alt="ID Image"
                  src={data.imageIdUrl}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Paper>
          
          <Paper className={classes.paper}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={4}
            defaultValue="Default Note"
            variant="outlined"
            value={data.notes || ''}
          />
          </Paper>
        
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="txtAsicId"
                  placeholder="heheheh"
                  name="asic"
                  fullWidth
                  label="Asic ID"
                  variant="outlined"
                  value={data.asicId || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtAirportCode"
                  fullWidth
                  label="Airport Code"
                  variant="outlined"
                  value={data.airportCode || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtFirstName"
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  value={data.firstName || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLastName"
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={data.surName || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtCompany"
                  fullWidth
                  label="Company"
                  data-shrink={true}
                  variant="outlined"
                  value={data.company || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtExpDate"
                  fullWidth
                  label="Expires"
                  variant="outlined"
                  value={new Date(data.expDate).toLocaleDateString() || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={data.accessLocation?.locationName || data.aevLocation?.name ||" "}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="Submitted On"
                  variant="outlined"
                  value={new Date(data.submittedOn).toLocaleDateString() || ""}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="Submitted By"
                  variant="outlined"
                  value={name || " "}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="Asic Status "
                  variant="outlined"
                  value={asicStatus || " "}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="Match "
                  variant="outlined"
                  value={`${data.facialMatchScore?.toFixed(2) || " "}%`}
                />
              </Grid>
              <Grid item xs={6}>
                <Field label="GPS ">
                  {dataToGMaps(data)}
                </Field>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="AccessLevel "
                  variant="outlined"
                  value={`${data.accessLevel || " "}`}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="txtLocation"
                  fullWidth
                  label="OperationalRequirement "
                  variant="outlined"
                  value={`${data.operationalRequirement?.toString() || " "}`}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function dataToGMaps(data) {
  if (data.hasOwnProperty("submittedLatitude") && data.hasOwnProperty("submittedLongitude") &&
      data.submittedLatitude !== null && data.submittedLongitude !== null) {
    return (
      <Link href={`https://maps.google.com/?q=${data.submittedLatitude},${data.submittedLongitude}`} target="_blank">
        GPS Location
      </Link>
    );
  }
  return <span>Location not found</span>;
}
