import withAuth from "@/components/admin/withAuth";
import { NextPage } from "next/types";
import * as React from "react";
import Layout from "@/components/admin/Layout/Layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#1976d2",
  ...theme.typography.body2,
  padding: "20px",
  textAlign: "center",
  color: "#fff",
  fontSize: "1.2rem",
}));

const SalesAmount: NextPage = () => {
  // *************************** Fix Table ***************************
  return (
    <Layout>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_summary" className="text-white">
                Summary
              </Link>
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_saddle_stitch" className="text-white">
                Saddle Stitch
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_perfect_binding" className="text-white">
                Perfect Binding
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_folding" className="text-white">
                Folding
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_cutting_sheet" className="text-white">
                Cutting Sheet
              </Link>
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_calendar" className="text-white">
                Calendar
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_paper_bag" className="text-white">
                Paper Bag
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_plastic_file" className="text-white">
                Plastic File
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_envelope" className="text-white">
                Envelope
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default withAuth(SalesAmount);
