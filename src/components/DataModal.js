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
}));

const DataModal = ({ showModal, handleClose, url, itemId }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

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
          <Combo
            label="Departures"
            url="https://country.register.gov.uk/records.json?page-size=5"
          />
          <br />
          <Combo
            label="Arrivals"
            url="https://country.register.gov.uk/records.json?page-size=3"
          />
          <p>{itemId}</p>
        </div>
      </Fade>
    </Modal>
  );
};
export default DataModal;
