import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Table from "../../components/Table/Table";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import TablePagination from "@material-ui/core/TablePagination";
import { listAsics, listSubmissions, exportSubmissions } from "../../apis";
import { useHistory } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Axios} from "apis/axios"
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import Modal from '@material-ui/core/Modal';
import { UTCToLocalTime } from "utils/date-time-helper";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  modalBody: {
    top: 300,
    width: "800",
    position: 'absolute',
    left: "50%",
    transform: `translate(${-400}px, ${0}px)`
  }
}));

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function Submission() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = useState({});

  const [asics, setAsics] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const toggle = useCallback(()=>{
    setOpen(!open)
  }, [ open ])
  const loadData = async () => {
    setLoading(true);
    listSubmissions(page + 1, size)
      .then((result) => {
        setData(result.data.data);
        makeTableData(result.data.data);
        setCount(result.data.totalCount);
      })
      .catch((e) => {
        if(e.response.status == 401 || e.response.status==403)
        {
          history.push('/logout')
        }
      });
  };
  const toLocalTime = useCallback((utime)=>{

  }, [])
  const exportData = useCallback((range)=>{
    // setLoading(true)
    const payload = {
      startDate: range.startDate,
      endDate: range.endDate
    }
    if (range && range.endDate) {
      const d = new Date(range.endDate).getMinutes();
      if (d === 0) {
        payload.endDate = addDays(range.endDate, 1)
      }
    }
    exportSubmissions(payload).then((resp)=>{
      console.log(resp.data);
      // accessLevel: "SRA"
      // accessLocation: {id: 1, locationName: "Adaptalift"}
      // active: true
      // airportCode: "AUS"
      // asicId: "ML66779"
      // asicStatus: 0
      // asicType: null
      // company: "ADAPTALIFT GSE"
      // dob: null
      // expDate: null
      // facialMatchPass: null
      // facialMatchScore: 99.9919434
      // firstName: "Andre"
      // id: 147
      // imageFaceUrl: "public/submissions/147/face.jpg"
      // imageIdUrl: "public/submissions/147/id.jpg"
      // notes: null
      // operationalRequirement: "Carrying out repairs and maintenance on GSE"
      // site: {id: 1, siteName: "Melbourne", active: true}
      // siteName: null
      // submittedBy: {id: 5, username: "admin", email: null, createdAt: "2021-05-12T13:12:38.297Z", updatedAt: "2021-05-12T13:12:38.297Z", …}
      // submittedLatitude: null
      // submittedLongitude: null
      // submittedOn: "2021-06-14T19:42:53.133Z"
      // surName: "HEATH"
      // suspended: false
      const rows = []
      resp.data.data.map((item) => {
        console.log(UTCToLocalTime(item.submittedOn))
        let row = []
        row.push(item.id)
        row.push(item.asicId)
        row.push(item.firstName)
        row.push(item.surName)
        row.push(item.asicStatus)
        row.push(item.company)
        row.push(item.operationalRequirement)
        row.push(item.submittedOn)
        row.push(UTCToLocalTime(item.submittedOn))
        row.push(item.accessLevel)
        row.push(item.accessLocation?.locationName || item.aevLocation?.name)
        rows.push(row)
      })
      let csvContent = `SubmissionID, AsicId,FirstName,LastName,Status,Company,OperationalRequirement,submittedOn,SubmittedOnLocal, AccessLevel, Location\n`
        + rows.map(e => e.join(",")).join("\n");
      // var encodedUri = encodeURI(csvContent);
      // window.open(encodedUri);

        const blob = new Blob([csvContent], {type: "text/csv", encoding:'UTF-8'});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'file.csv';
        link.click();
        setLoading(false)
    }).catch((e)=>{
      console.log("============export==failed=============", e)
      setLoading(false)
    })
  }, [asics])
  useEffect(() => {
    ref.current.scrollIntoView();
  }, [asics, ref]);

  const makeTableData = async (_data) => {
    let tmpAll = [];
    _data.map(async (item, key) => {
      let tmp = [];
      tmp.push(item["asicId"]);
      
      tmp.push(item["firstName"]);
      tmp.push(item["surName"]);
      
      tmp.push(item["company"]);
      tmp.push(UTCToLocalTime(item["submittedOn"]));
      tmp.push(item.site?.siteName || " ");
      tmp.push(item.accessLocation?.locationName || item.aevLocation?.name)
      
      tmp.push(item["id"]);
      tmpAll.push(tmp);
    });
    setAsics(tmpAll);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [page, size]);

  const rowClick = (row) => {
    console.log(row)
    history.push(`submission/${row[7]}`);
  };
  const refresh = ()=>{
    if(page==0)
      loadData()
    else
      setPage(0)
  }
  const ref = useRef(null);
  return (
    <div ref={ref}>
      <GridContainer>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          open={open}
          onClose={toggle}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div  className={classes.modalBody}>
            <DateRangePicker
              open={open}
              toggle={toggle}
              onChange={(range) => {
                console.log(range)
                setDateRange(range)
                exportData(range)
                toggle()
              }}
            />
          </div>  
        </Modal>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <Table
                action={ toggle }
                actionTitle={"Export"}
                tableHeaderColor="primary"
                tableHead={[
                  "Asic",
                  "First Name",
                  "Last Name",
                  "Company",
                  "Submitted On",
                  "Site Name",
                  "Location",
                  
                ]}
                tableData={ asics }
                rowClick={ rowClick }
                refresh = { refresh }
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
    </div>
  );
}
