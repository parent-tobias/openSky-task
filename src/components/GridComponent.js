import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import DataModal from "./DataModal";
import { airports } from "./Airports";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 380,
    height: 233,
  },
}));

const GridComponent = () => {
  const classes = useStyles();

  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Grid container spacing={5}>
        {airports.map((airport) => (
          <Grid item xs>
            <Card className={classes.root} onClick={() => setShowModal(true)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={airport.name}
                  height="150"
                  image={airport.image}
                  title={airport.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h4">
                    {airport.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <DataModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
        />
      </Grid>
    </div>
  );
};

export default GridComponent;
