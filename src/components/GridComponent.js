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

  let airportId;

  const [modalContent, setModalContent] = useState({show:false, itemId:""});

  console.log({ airportId });
  return (
    <div>
      <Grid container spacing={5}>
        {airports.map((airport) => {
          airportId = airport.name;
          console.log({ airportId });
          return (
            <Grid item xs key={airport.id}>
              <Card className={classes.root} onClick={() => setModalContent({show:true, itemId:airport.id})}>
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
          );
        })}
        <DataModal
          showModal={modalContent.show}
          handleClose={() => setModalContent({...modalContent, show:false})}
          itemId={modalContent.itemId}
        />
      </Grid>
    </div>
  );
};

export default GridComponent;

