import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
}));

const DataModal = ({ showModal, handleClose, itemId, children }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [arrivalUrl, setArrivalUrl] = useState("");
  const [departureUrl, setDepartureUrl] = useState("");
  const [whichTab, setWhichTab] = useState("arrivals");

  const setupUrls = (begin = Date.now(), end = Date.now()) => {
    const configureArrivalUrl = (airport, begin, end) =>
      `https://opensky-network.org/api/flights/arrival?airport=${airport}&begin=${begin}&end=${end}`;
    const configureDepartureUrl = (airport, begin, end) =>
      `https://opensky-network.org/api/flights/departure?airport=${airport}&begin=${begin}&end=${end}`;

    begin = begin.valueOf().toString().substring(0, 10);
    end = end.valueOf().toString().substring(0, 10);

    setArrivalUrl(configureArrivalUrl(itemId, begin, end));
    setDepartureUrl(configureDepartureUrl(itemId, begin, end));
  };

  const onChangeHandler = async (timeOption) => {
    const begin = new Date();
    begin.setHours(timeOption.value);
    const end = Date.now();
    await setupUrls(begin, end);
  };

  const onChangeTab = (which) => {
    setWhichTab(which);
    loadFlights();
  };

  const loadFlights = async () => {};

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showModal}
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
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab label="Departures" />
            <Tab label="Arrivals" />
          </Tabs>

          <Combo label="For the last:" onChangeHandler={onChangeHandler} />

          <p>{data.length > 0 ? data : "No results found"}</p>
        </div>
      </Fade>
    </Modal>
  );
};
export default DataModal;
