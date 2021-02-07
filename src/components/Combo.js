// import React from "react";
// import axios from "axios";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import CircularProgress from "@material-ui/core/CircularProgress";

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

// export default function Combo({ url, label }) {
//   const [open, setOpen] = React.useState(false);
//   const [options, setOptions] = React.useState([]);
//   const loading = open && options.length === 0;

//   React.useEffect(() => {
//     let active = true;

//     if (!loading) {
//       return undefined;
//     }

//     (async () => {
//       const response = await axios.get(url);
//       await sleep(1e3); // For demo purposes.
//       const countries = response.data;

//       if (active) {
//         setOptions(Object.keys(countries).map((key) => countries[key].item[0]));
//       }
//     })();

//     return () => {
//       active = false;
//     };
//   }, [loading]);

//   React.useEffect(() => {
//     if (!open) {
//       setOptions([]);
//     }
//   }, [open]);

//   return (
//     <Autocomplete
//       id="asynchronous-demo"
//       style={{ width: 300 }}
//       open={open}
//       onOpen={() => {
//         setOpen(true);
//       }}
//       onClose={() => {
//         setOpen(false);
//       }}
//       getOptionSelected={(option, value) => option.name === value.name}
//       getOptionLabel={(option) => option.name}
//       options={options}
//       loading={loading}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           variant="outlined"
//           InputProps={{
//             ...params.InputProps,
//             endAdornment: (
//               <React.Fragment>
//                 {loading ? (
//                   <CircularProgress color="inherit" size={20} />
//                 ) : null}
//                 {params.InputProps.endAdornment}
//               </React.Fragment>
//             ),
//           }}
//         />
//       )}
//     />
//   );
// }

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
    { id: 10, title: "10 hours", value: -10 },
    { id: 20, title: "20 hours", value: -20 },
    { id: 30, title: "30 hours", value: -30 },
    { id: 40, title: "40 hours", value: -40 },
    { id: 50, title: "50 hours", value: -50 },
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
      onChange={(event, values) => onChangeHandler(values)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
