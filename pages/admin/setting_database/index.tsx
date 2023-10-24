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

const Database: NextPage = () => {
  // *************************** Fix Table ***************************
  return (
    <Layout>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/cover_paper" className="text-white">
                Cover Paper
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/text_paper" className="text-white">
                Text Paper
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/text_no" className="text-white">
                Text No
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Link href="/admin/printing" className="text-white">
                Printing
              </Link>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default withAuth(Database);
