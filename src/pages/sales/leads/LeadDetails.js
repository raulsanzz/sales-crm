import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Pdf from "react-to-pdf";
const ref = React.createRef();

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
    fontSize: "2rem"
  },
  card: {
    maxWidth: "623px",
    margin: "0 auto"
  },
  cardHeader1: {
    border: "2px solid #000",
    // marginBottom: "23px",
    padding: "10px"
  },
  cardBody1: {
    border: "1px solid #000",
    padding: "20px"
  },
  cardContentRight: {
    padding: "20px",
    borderRight: "1px solid"
  },
  cardContentLeft: {
    padding: "20px"
  },
  cardContentInner: {
    marginBottom: "8px"
  },  
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },
}));

const LeadDetails = ({ history, location }) => {
  const classes = useStyles();

  const [formData, setFormData] = React.useState(location.state.detail);
  return (
    <React.Fragment>
      <div class="container">
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <div class="card" className={classes.card} ref={ref}>
          <div class="card-header" className={classes.cardHeader1}>
            <strong>Time :</strong>
            {/* {formData.createdAt} */}
              0:0:0
            <span class="float-right">
              <strong>Date:</strong> 
              {/* {formData.status} */}
              20/20/20
            </span>
          </div>
          <div class="card-body" className={classes.cardBody1}>
            <div className="row">
              <div className="col-sm-6">
                <div className={classes.cardContentRight}>
                  <div className={classes.cardContentInner}>
                    <strong>Name: </strong>
                    {formData.client_name}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Company Name: </b>
                    {formData.companyName}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Job Title: </b>
                    {formData.job_title}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Location: </b>
                    {formData.location}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Time Zone: </b> {formData.time_zone}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Website: </b> {formData.website}
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div className={classes.cardContentLeft}>
                  <div className={classes.cardContentInner}>
                    <strong>Device: </strong>
                    Some Device
                  </div>
                  <div className={classes.cardContentInner}>
                    <strong>Client Number: </strong>
                    {formData.phone_number}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Interview Status: </b>
                      Some Status
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Call Status: </b>
                    {formData.call_status}
                  </div>
                  <div className={classes.cardContentInner}>
                    <b>Job Link: </b>
                    Some Job Link
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-header" className={classes.cardHeader1}>
          <FormControl className={classes.formControl}>
                <InputLabel id="call-status-label">call status</InputLabel>
                <Select
                  labelId="call-status-label"
                  id="call-status-select">
                  <MenuItem value={"Reschedule"}>Reschedule</MenuItem>
                  <MenuItem value={"Not Done"}>Not Done</MenuItem>
                  <MenuItem value={"Not Taken By Client"}>Not Taken By Client</MenuItem>
                </Select>
            </FormControl>
          </div>
          <div class="card-header" className={classes.cardBody1}>
            <form className={classes.root} noValidate autoComplete="off">
              <strong>Are the ok with Remote? </strong>
              <TextField id="Q1" label="" /><br></br>
              <strong>Are they Firm on Relocation? </strong>
              <TextField id="Q2" label="" /><br></br>
              <strong>Type of Work? </strong>
              <TextField id="Q3" label="" /><br></br>
              <strong>F/T, P/T, Hourly Project? </strong>
              <TextField id="Q4" label="" /><br></br>
              <strong>What is the hourly rate/salary? </strong>
              <TextField id="Q5" label="" /><br></br>
              <strong>Technical interview required? </strong>
              <TextField id="Q6" label="" /><br></br>
              <strong>Is the same person on next call? </strong>
              <TextField id="Q7" label="" /><br></br>
              <strong>Next Step? </strong>
              <TextField id="Q8" label="" /><br></br>
              <strong>Is client ok with 1099? </strong>
              <TextField id="Q9" label="" /><br></br>
            </form>
          </div>
          <div class="card-header" className={classes.cardHeader1}>
            <TextField
            id="outlined-full-width"
            label="Notes"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LeadDetails;
