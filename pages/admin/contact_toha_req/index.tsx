import withAuth from "@/components/admin/withAuth";
import { NextPage } from "next/types";
import React, { useState } from "react";
import { appDispatch, appSelector } from "@/store/hooks";
import Layout from "@/components/admin/Layout/Layout";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import router from "next/router";
// Table
import { getComparator, stableSort, Order } from "@/components/table/Table";
import {
  EnhancedTableHead,
  EnhancedTableToolbarProps,
} from "@/components/table/admin/contact_toha_req/TableHeads";
import {
  getContactTohaReq,
  deleteContactTohaReq,
  deleteAllContactTohaReq,
  getContactTohaReqById,
} from "@/features/admin/contact_toha_req";
import saveAsExcel from "@/features/admin/contact_toha_req/export";
import exportPDFPublic from "@/features/admin/contact_toha_req/export_pdf";
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { TextField as TextFieldInput } from "formik-material-ui";
import Textarea from "@mui/joy/Textarea";
const Contact: NextPage = () => {
  const dispatch = appDispatch();
  const [searched, setSearched] = React.useState<string>("");
  const { data } = appSelector((state) => state.contact_toha_req);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openView, setOpenView] = React.useState(false);

  var rows: any = data ?? [];

  const formik: any = useFormik({
    initialValues: {
      contact_id: "",
      contact_date: "",
      contact_email: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_address: "",
      contact_city: "",
      contact_province: "",
      contact_postal_code: "",
      contact_message: "",
      contact_telephone: "",
      contact_model: "",
      contact_serial_number: "",
      contact_horsepower: ""
    },
    onSubmit: (values) => { },
  });
  const style = {
    position: "absolute" as "absolute",
    marginTop: "10%",
    left: "50%",
    transform: "translate(-50%, -10%)",
    width: "50%",
    overflow: "scroll",
    height: "130%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // *************************** Use Effect ***************************
  React.useEffect(() => {
    dispatch(getContactTohaReq(""));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getContactTohaReq(searched));
  }, [dispatch, searched]);
  // *************************** Use Effect ***************************

  // *************************** Action ***************************
  const Delete = (id: any) => {
    Swal.fire({
      title: "Are you sure to delete the selected item(s) ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      setSelected([]);
      if (result.isConfirmed) {
        let data = new FormData();
        data.append("contact_id", id);
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteContactTohaReq(data)).then((result: any) => {
              dispatch(getContactTohaReq(""));
            });
          }
        );
      }
    });
  };
  const DeleteAll = (id: any) => {
    Swal.fire({
      title: "Are you sure to delete the selected item(s) ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: any) => {
      setSelected([]);
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteAllContactTohaReq(id)).then((result: any) => {
              dispatch(getContactTohaReq(""));
            });
          }
        );
      }
    });
  };

  const exports = () => {
    saveAsExcel({ rows });
  };

  const exportspdf = (id: any) => {
    dispatch(getContactTohaReqById(id)).then((value: any) => {
      exportPDFPublic({
        rows: [
          {
            contact_date: value.payload[0].contact_date,
            contact_email: value.payload[0].contact_email,
            contact_first_name: value.payload[0].contact_first_name,
            contact_last_name: value.payload[0].contact_last_name,
            contact_address: value.payload[0].contact_address,
            contact_city: value.payload[0].contact_city,
            contact_province: value.payload[0].contact_province,
            contact_postal_code: value.payload[0].contact_postal_code,
            contact_message: value.payload[0].contact_message,
            contact_telephone: value.payload[0].contact_telephone,
            contact_model: value.payload[0].contact_model,
            contact_serial_number: value.payload[0].contact_serial_number,
            contact_horsepower: value.payload[0].contact_horsepower,
          },
        ],
      });
    });
    setTimeout(() => {
      setClose();
    }, 500);
  };

  const openViewModal = (id: any) => {
    dispatch(getContactTohaReqById(id)).then((value: any) => {
      formik.setValues({
        contact_id: value.payload[0].contact_id,
        contact_date: value.payload[0].contact_date,
        contact_email: value.payload[0].contact_email,
        contact_first_name: value.payload[0].contact_first_name,
        contact_last_name: value.payload[0].contact_last_name,
        contact_address: value.payload[0].contact_address,
        contact_city: value.payload[0].contact_city,
        contact_province: value.payload[0].contact_province,
        contact_postal_code: value.payload[0].contact_postal_code,
        contact_message: value.payload[0].contact_message,
        contact_telephone: value.payload[0].contact_telephone,
        contact_model: value.payload[0].contact_model,
        contact_serial_number: value.payload[0].contact_serial_number,
        contact_horsepower: value.payload[0].contact_horsepower,
      });
    });
    setClose();
    setOpenView(true);
    setSelected([]);
  };

  const setClose = () => {
    dispatch(getContactTohaReq(searched));
    setOpenView(false);
    setSelected([]);
  };
  // *************************** Action ***************************

  // *************************** Fix Table ***************************

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.contact_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, valSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {`Contact > Contact Tohatsu Outboards`}
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => DeleteAll(valSelected)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="">
            <IconButton></IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  // *************************** Fix Table ***************************
  return (
    <Layout>
      <TextField
        fullWidth
        value={searched}
        label="Search..."
        onChange={(e: React.ChangeEvent<any>) => {
          e.preventDefault();
          setSearched(e.target.value);
        }}
      />

      <Box sx={{ width: "100%", mt: 3 }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            valSelected={selected}
          />

          <Button
            sx={{ ml: 2, mb: 1, flexGrow: 1 }}
            onClick={exports}
            variant="contained"
            color="success"
          >
            Export to Excel
          </Button>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.length > 0
                  ? stableSort(rows, getComparator(order, orderBy))
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: any, index) => {
                      const isItemSelected = isSelected(row.contact_id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          // onClick={(event) =>
                          //   handleClick(event, row.contact_id)
                          // }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.contact_id}
                          selected={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox" align="center">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell> */}
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {row.contact_date}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_email}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_first_name + ' ' + row.contact_last_name}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_address + ' ' + row.contact_city + ' ' + row.contact_province + ' ' + row.contact_postal_code + ' '}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_message}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_telephone}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_model}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_serial_number}
                          </TableCell>
                          <TableCell align="center">
                            {row.contact_horsepower}
                          </TableCell>
                          <TableCell align="center">
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={0}
                            >
                              <IconButton
                                color="primary"
                                aria-label="edit"
                                size="large"
                                onClick={() => openViewModal(row.contact_id)}
                              >
                                <VisibilityIcon fontSize="inherit" />
                              </IconButton>

                              {/* <IconButton
                                  color="error"
                                  aria-label="delete"
                                  size="large"
                                  onClick={() => Delete(row.contact_id)}
                                >
                                  <DeleteIcon fontSize="inherit" />
                                </IconButton> */}
                            </Stack>
                          </TableCell>
                          {/* <TableCell align="center">
                            <IconButton
                              color="error"
                              aria-label="edit"
                              size="large"
                              onClick={() => exportspdf(row.contact_id)}
                            >
                              <PictureAsPdf fontSize="inherit" />
                            </IconButton>
                          </TableCell> */}
                        </TableRow>
                      );
                    })
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Modal
        open={openView}
        onClose={setClose}
        disableEnforceFocus={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "60%" }}
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="contact_date"
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Submitted"
                  id="contact_date"
                  name="text"
                  value={formik.values.contact_date}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="contact_email"
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Email"
                  id="contact_email"
                  name="contact_email"
                  value={formik.values.contact_email}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Name"
                  autoComplete="contact_fullname"
                  id="contact_fullname"
                  name="contact_fullname"
                  value={formik.values.contact_first_name + ' ' + formik.values.contact_last_name}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  multiline
                  rows={3}
                  inputProps={{ readOnly: true }}
                  label="Address"
                  autoComplete="contact_full_address"
                  id="contact_full_address"
                  name="contact_full_address"
                  value={formik.values.contact_address + ' ' + formik.values.contact_city + ' ' + formik.values.contact_province + ' ' + formik.values.contact_postal_code + ' '}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Message"
                  autoComplete="contact_message"
                  id="contact_message"
                  name="contact_message"
                  value={formik.values.contact_message}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Telephone"
                  autoComplete="contact_telephone"
                  id="contact_telephone"
                  name="contact_telephone"
                  value={formik.values.contact_telephone}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="filled-multiline-static"
                  label="Model"
                  multiline
                  fullWidth
                  // rows={6}
                  defaultValue="Default Value"
                  variant="filled"
                  value={formik.values.contact_model}
                />
                {/* <Textarea
                  minRows={3}
                  value={formik.values.contact_detail}
                  label="Quotation Details"
                /> */}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="filled-multiline-static"
                  label="Serial Number"
                  multiline
                  fullWidth
                  // rows={6}
                  defaultValue="Default Value"
                  variant="filled"
                  value={formik.values.contact_serial_number}
                />
                {/* <Textarea
                  minRows={3}
                  value={formik.values.contact_detail}
                  label="Quotation Details"
                /> */}
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Horsepower"
                  autoComplete="contact_horsepower"
                  id="contact_horsepower"
                  name="contact_horsepower"
                  value={formik.values.contact_horsepower}
                />
              </Grid>

              <Grid item xs={12} sm={12} mt={4}>
                {/* <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  onClick={() => exportspdf(formik.values.contact_id)}
                >
                  Download
                </Button> */}
                {/* <br />
                <br /> */}
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => setClose()}
                >
                  CLOSE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
};

export default withAuth(Contact);
