import React from 'react'
import { TextField, FormControl, Button, InputLabel, Select, MenuItem } from "@mui/material";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  fd_busines_type: any;
  location_lat: any;
  location_long: any
}

function Form({ onSubmit }: FormProps) {
  const [fd_busines_type, setFdBusinestype] = React.useState<any>("")
  const [center_lat, setCenterLat] = React.useState<any>(32.90691);
  const [center_long, setCenterLong] = React.useState<any>(-96.413837);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position: any) {
    setCenterLat(position.coords.latitude);
    setCenterLong(position.coords.longitude);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const dataForm = {
      fd_busines_type: fd_busines_type,
      location_lat: center_lat,
      location_long: center_long,
    }

    onSubmit(dataForm);
  }

  const [myState, setMyState] = React.useState(null);

  const resetState = () => {
    setMyState(null);
    location.reload()
  };

  return (
    <form onSubmit={handleSubmit} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Busines Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fd_busines_type}
          label="Busines Type"
          onChange={(e: any) => {
            setFdBusinestype(e.target.value);
          }}
        >
          <MenuItem value={'Sales & Service'}>Sales & Service</MenuItem>
          <MenuItem value={'Service Only'}>Service Only</MenuItem>
          <MenuItem value={'Package Only'}>Package Only</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <Button variant="outlined" onClick={getLocation}>Location Here</Button>
      <br /><br />
      <TextField
        label="Location Center"
        variant="filled"
        InputProps={{
          readOnly: true,
        }}
        color="secondary"
        type="text"
        value={center_lat + ',' + center_long}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" color="secondary" type="submit">Search</Button>
      &nbsp;
      <Button variant="outlined" color="error" onClick={resetState}>Reset</Button>
      <br />
    </form>
  );
}

export default Form;