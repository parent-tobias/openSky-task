import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Combo({ url, label, onChangeHandler }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    {id:10, title:"10 hours", value:-10}, 
    {id:20, title:"20 hours", value:-20}, 
    {id:30, title:"30 hours", value:-30},
    {id:40, title:"40 hours", value:-40},
    {id:50, title:"50 hours", value:-50},
    {id:60, title:"60 hours", value:-60},
    {id:70, title:"70 hours", value:-70}
  ]);

  return (
    <Autocomplete
      id="hours-past"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => option.title}
      options={options}
      onChange={(event, values)=>onChangeHandler(values)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
}
