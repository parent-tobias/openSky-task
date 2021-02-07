import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
    padding: theme.spacing(2, 4, 3),
  },
  flightsContainer: {
    height: '20vh',
    background: 'ivory',
    borderRadius: 5,
    overflow: 'scroll',
  }
}));

const FlightDetail = ({callsign, icao24, firstSeen, lastSeen, estDepartureAirport, estArrivalAirport}) =>{
  return (<div>
    <span>Callsign: {callsign}</span><br/>
    <span>Address of the transponder (icao24): {icao24}</span><br/>
    <span>Est. time of arrival: {new Date(lastSeen).toLocaleString('en-GB', {dateStyle:'full', timeStyle:'long'}) }</span><br />
    <span>Est. time of departure: {new Date(firstSeen).toLocaleString('en-GB', {dateStyle:'full', timeStyle:'long'}) }</span><br/>
    <span>Arrival airport: {estArrivalAirport }</span><br/>
    <span>Departure airport: {estDepartureAirport }</span>
  </div>)
}

const DataModal = ({ showModal, handleClose, url, itemId }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [arrivalUrl, setArrivalUrl] = useState('');
  const [departureUrl, setDepartureUrl] = useState('');
  const [whichTab, setWhichTab] = useState('arrivals');

  const setupUrls = (begin=Date.now(), end=Date.now()) => {
    const configureArrivalUrl = (airport, begin, end) => `https://opensky-network.org/api/flights/arrival?airport=${airport}&begin=${begin}&end=${end}` 
    const configureDepartureUrl = (airport, begin, end) => `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}` 

    begin = begin.valueOf().toString().substring(0, 10);
    end = end.valueOf().toString().substring(0, 10);

    setArrivalUrl(configureArrivalUrl(itemId, begin, end));
    setDepartureUrl(configureDepartureUrl(itemId, begin, end));
  }

  const onChangeHandler = async (timeOption) => {
    const begin = new Date()
    begin.setHours(timeOption.value);
    const end = Date.now();
    await setupUrls(begin, end);
  }

  const changeTab = (which) =>{
    setWhichTab(which);
    loadFlights();
  }

  const loadFlights = () =>{
    fetch(whichTab==='arrivals' ? arrivalUrl : departureUrl)
        .then(res => res.json())
        .then( (result) => setData(result) );
  }

  const checkAirport = ()=>{
    if(!arrivalUrl.includes(itemId)) setData([]);
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
          <div>
            <h3 onClick={()=>changeTab('departures')}>Departures</h3><h3 onClick={()=>changeTab('arrivals')}>Arrivals</h3>
          </div>
          <Combo
            label="For the last:"
            onChangeHandler={onChangeHandler}
          />

          <div className={classes.flightsContainer} >{data.length>0 
            ?data.map(record => <FlightDetail key={JSON.stringify(record)} {...record} />) : 'No results found'}
          
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
export default DataModal;
