import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import Table from "../../../components/Table/Table";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";

import TablePagination from "@material-ui/core/TablePagination";
import { listVisitorPass, listVisitorRequests } from "apis";
import { useHistory } from "react-router-dom";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams, useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
  },
  title: {
    fontSize: 20
  },
  email: {
    fontSize: 20,
  }
}));

export default function VisitorRequests() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, []);

  const history = useHistory();

  const loadData = async () => {
    setLoading(true);
    listVisitorRequests(page + 1, size, param.id)
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
      tmp.push(item["idType"]);
      tmp.push(item["idNumber"]);
      tmp.push(item["escortName"]);
      tmp.push(item["escortAsicId"]);
      tmp.push(new Date(item["createdAt"]).toLocaleString());
      tmp.push(item["status"]);
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
    history.push(`${history.location.pathname}/${row[0]}`);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Card>
          <CardBody>
            <Typography className={classes.email}>
              { `${location?.state?.email}` }
            </Typography> 
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "Id",
                "Email",
                "First Name",
                "Last Name",
                "ID Type",
                "ID Number",
                "Escort Name",
                "Escort ASIC",
                "Created At",
                "Status"
              ]}
              tableData={ users }
              rowClick={ rowClick }
              refresh={ refresh }
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
      
    </GridContainer>
  );
}
