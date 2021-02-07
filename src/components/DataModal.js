import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box';
import Combo from "./Combo";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "50%",
    padding: theme.spacing(2, 4, 3),
  },
  flightsContainer: {
    height: '40vh',
    background: 'ivory',
    borderRadius: 5,
    overflow: 'scroll',
  },
  flightDetail: {
    margin: '1em 0',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const FlightDetail = ({className, callsign, icao24, firstSeen, lastSeen, estDepartureAirport, estArrivalAirport}) =>{
  return (<div className={className} >
    <span>Callsign: {callsign}</span><br/>
    <span>Address of the transponder (icao24): {icao24}</span><br/>
    <span>Est. time of arrival: {new Date(lastSeen).toLocaleString('en-GB', {dateStyle:'full', timeStyle:'long'}) }</span><br />
    <span>Est. time of departure: {new Date(firstSeen).toLocaleString('en-GB', {dateStyle:'full', timeStyle:'long'}) }</span><br/>
    <span>Arrival airport: {estArrivalAirport }</span><br/>
    <span>Departure airport: {estDepartureAirport }</span>
  </div>)
}

const DataModal = ({ showModal, handleClose, itemId }) => {
  const icao24 = itemId;
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  
  const [data, setData] = useState({arrivals: [], departures: []});
  const [arrivalUrl, setArrivalUrl] = useState(`https://opensky-network.org/api/flights/arrival?airport=${itemId}&begin=${Number(Date.now().valueOf().toString().substring(0, 10))-36000}&end=${Date.now().valueOf().toString().substring(0, 10)}`);
  const [departureUrl, setDepartureUrl] = useState(`https://opensky-network.org/api/flights/departure?airport=${itemId}&begin=${Number(Date.now().valueOf().toString().substring(0, 10))-36000}&end=${Date.now().valueOf().toString().substring(0, 10)}`);

  const setupUrls = (begin = Date.now(), end = Date.now()) => {
    const configureArrivalUrl = (airport, begin, end) =>
      `https://opensky-network.org/api/flights/arrival?airport=${airport}&begin=${begin}&end=${end}`;
    const configureDepartureUrl = (airport, begin, end) =>
      `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;

    setArrivalUrl(configureArrivalUrl(icao24, begin, end));
    setDepartureUrl(configureDepartureUrl(icao24, begin, end));
  }

  const onChangeHandler = async (timeOption) => {
    timeOption = timeOption || {value: 0};

    const begin = Math.round(new Date()/1000)+(timeOption.value*3600)
    const end = Math.round(Date.now()/1000);
    setupUrls(begin, end);
    
    let arrivals = await fetch(arrivalUrl)
      arrivals = await arrivals.json()

    let departures = await fetch(departureUrl)
      departures = await departures.json();

    setData({arrivals, departures})
  }

  const changeTab = (event, newValue) =>{
    setTab(newValue);
  }



  const checkAirport = ()=>{
    if(!arrivalUrl.includes(itemId)) setData({arrivals:[], departures: []});
  }


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showModal}
      onRendered={checkAirport}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Flight Details</h2>
          <Tabs
            value={tab}
            onChange={changeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Departures" />
            <Tab label="Arrivals" />
          </Tabs>

          <Combo label="For the last:" onChangeHandler={onChangeHandler} />
          <TabPanel className={classes.flightsContainer} value={tab} index={0}>
            {data.departures?.length > 0 
              ? data.departures.map(record => <FlightDetail className={classes.flightDetail} key={JSON.stringify(record)} {...record} />)
              : 'No departures found'}
          </TabPanel>
          <TabPanel className={classes.flightsContainer} value={tab} index={1}>
            {data.arrivals?.length > 0 
              ? data.arrivals.map(record => <FlightDetail className={classes.flightDetail} key={JSON.stringify()} {...record} />)
              : 'No arrivals found'}
          </TabPanel>
        </div>
      </Fade>
    </Modal>
  );
};
export default DataModal;
