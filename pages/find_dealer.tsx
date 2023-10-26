import React, { useState } from "react";
import Map from "@/components/Map";
import Form from "@/components/Map/Form";
import { Grid } from "@mui/material";

const Index = () => {

  interface FormProps {
    onSubmit: (data: FormData) => void;
  }

  interface FormData {
    fd_busines_type: any;
  }

  const [data, setData] = useState<any>("");

  function handleSubmit(formData: FormData) {
    setData(formData)
  }

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2} sx={{ color: 'error.main' }}>
          Sales & Service
        </Grid>
        <Grid item xs={2} sx={{ color: 'success.main' }}>
          Service Only
        </Grid>
        <Grid item xs={2} sx={{ color: 'gold' }}>
          Package Only
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <Form onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>

      <br />
      <Grid container spacing={2} >
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={2}>
          <Map search={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
