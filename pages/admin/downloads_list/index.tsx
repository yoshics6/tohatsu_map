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
              <Link href="/admin/downloads_brochure" className="text-white">
                Brochure
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/downloads_manuals" className="text-white">
                Manuals
              </Link>
            </Item>
          </Grid>
          {/* <Grid item xs={3}>
            <Item>
              <Link href="/admin/contact_toha_req" className="text-white">
                Contact Tohatsu Outboards
              </Link>
            </Item>
          </Grid> */}
          {/* <Grid item xs={3}>
            <Item>
              <Link href="/admin/sales_cutting_sheet" className="text-white">
                Cutting Sheet
              </Link>
            </Item>
          </Grid> */}
        </Grid>
      </Box>
    </Layout>
  );
};

export default withAuth(SalesAmount);
