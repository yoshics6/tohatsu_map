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
} from "@/components/table/admin/sales_perfect_binding/TableHeads";
import {
  getSalesPerfectBinding,
  deleteSalesPerfectBinding,
  deleteAllSalesPerfectBinding,
  getSalesPerfectBindingById,
} from "@/features/admin/sales_perfect_binding";
import saveAsExcel from "@/features/admin/sales_perfect_binding/export";
// import exportPDFPublic from "@/features/admin/sales_perfect_binding/export_pdf";
import { Field, Form, Formik, FormikProps, useFormik } from "formik";
import { TextField as TextFieldInput } from "formik-material-ui";
import Textarea from "@mui/joy/Textarea";
const SalesPerfectBinding: NextPage = () => {
  const dispatch = appDispatch();
  const [searched, setSearched] = React.useState<string>("");
  const { data } = appSelector((state) => state.sales_perfect_binding);
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
      sals_perf_id: "",
      sals_perf_date: "",
      sals_perf_company_name: "",
      sals_perf_tel: "",
      sals_perf_email: "",
      sals_perf_doc_type: "",
      sals_perf_printing_type: "",
      sals_perf_amount: "",
      sals_perf_quotation_request: "",
      sals_perf_finished_size: "",
      sals_perf_cover: "",
      sals_perf_text: "",
      sals_perf_cover_paper: "",
      sals_perf_text_paper: "",
      sals_perf_printing: "",
      sals_perf_cover_coating: "",
      sals_perf_text_coating: "",
      sals_perf_printing_volume: "",
    },
    onSubmit: (values) => {},
  });
  const style = {
    position: "absolute" as "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    overflow: "scroll",
    height: "auto",
    display: "block",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // *************************** Use Effect ***************************
  React.useEffect(() => {
    dispatch(getSalesPerfectBinding(""));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getSalesPerfectBinding(searched));
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
        data.append("sals_perf_id", id);
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteSalesPerfectBinding(data)).then((result: any) => {
              dispatch(getSalesPerfectBinding(""));
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
            dispatch(deleteAllSalesPerfectBinding(id)).then((result: any) => {
              dispatch(getSalesPerfectBinding(""));
            });
          }
        );
      }
    });
  };

  const exports = () => {
    saveAsExcel({ rows });
  };

  // const exportspdf = (id: any) => {
  //   dispatch(getSalesPerfectBindingById(id)).then((value: any) => {
  //     exportPDFPublic({
  //       rows: [
  //         {
  //           contact_date: value.payload[0].contact_date,
  //           contact_fullname: value.payload[0].contact_fullname,
  //           contact_company_name: value.payload[0].contact_company_name,
  //           contact_phone_number: value.payload[0].contact_phone_number,
  //           contact_email: value.payload[0].contact_email,
  //           contact_detail: value.payload[0].contact_detail,
  //         },
  //       ],
  //     });
  //   });
  // };

  // const openViewModal = (id: any) => {
  //   dispatch(getContactById(id)).then((value: any) => {
  //     formik.setValues({
  //       sals_perf_id: value.payload[0].sals_perf_id,
  //       contact_date: value.payload[0].contact_date,
  //       contact_fullname: value.payload[0].contact_fullname,
  //       contact_company_name: value.payload[0].contact_company_name,
  //       contact_phone_number: value.payload[0].contact_phone_number,
  //       contact_email: value.payload[0].contact_email,
  //       contact_detail: value.payload[0].contact_detail,
  //     });
  //   });
  //   setOpenView(true);
  //   setSelected([]);
  // };

  // const setClose = () => {
  //   dispatch(getContact(searched));
  //   setOpenView(false);
  //   setSelected([]);
  // };
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
      const newSelected = rows.map((n: any) => n.sals_perf_id);
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
            Sales Amount {">"} Perfect Binding
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
                        const isItemSelected = isSelected(row.sals_perf_id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) =>
                            //   handleClick(event, row.sals_perf_id)
                            // }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.sals_perf_id}
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
                              {row.sals_perf_date}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_fullname}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_company_name}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_tel}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_email}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_doc_type}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_printing_type}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_amount?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_quotation_request}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_finished_size}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_cover}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_text}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_cover_paper}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_text_paper}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_printing}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_cover_coating}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_text_coating}
                            </TableCell>
                            <TableCell align="center">
                              {row.sals_perf_printing_volume?.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 3,
                                }
                              )}
                            </TableCell>
                            {
                            row.sals_perf_quotation_request != 'No' ? 
                            <TableCell align="center">
                            {row.sals_send_quotation == 'Send' ?
                              'Wait sending'
                              : row.sals_send_quotation }
                            </TableCell>
                            : <TableCell align="center">-</TableCell> 
                            }
                            {/* <TableCell align="center">
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
                                  onClick={() => openViewModal(row.sals_perf_id)}
                                >
                                  <VisibilityIcon fontSize="inherit" />
                                </IconButton>
                              </Stack>
                            </TableCell> */}
                            {/* <TableCell align="center">
                              <IconButton
                                color="error"
                                aria-label="edit"
                                size="large"
                                onClick={() => exportspdf(row.sals_perf_id)}
                                onBlur={() => setClose()}
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
        // onClose={setClose}
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
                  label="Date"
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
                  autoComplete="contact_fullname"
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Name - Surname"
                  id="contact_fullname"
                  name="contact_fullname"
                  value={formik.values.contact_fullname}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Company Name"
                  autoComplete="contact_company_name"
                  id="contact_company_name"
                  name="contact_company_name"
                  value={formik.values.contact_company_name}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="Phone no."
                  autoComplete="contact_phone_number"
                  id="contact_phone_number"
                  name="contact_phone_number"
                  value={formik.values.contact_phone_number}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  inputProps={{ readOnly: true }}
                  label="E-mail"
                  autoComplete="contact_email"
                  id="contact_email"
                  name="contact_email"
                  value={formik.values.contact_email}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="filled-multiline-static"
                  label="Quotation Details"
                  multiline
                  fullWidth
                  rows={6}
                  defaultValue="Default Value"
                  variant="filled"
                  value={formik.values.contact_detail}
                />
                {/* <Textarea
                  minRows={3}
                  value={formik.values.contact_detail}
                  label="Quotation Details"
                /> */}
              </Grid>
              <Grid item xs={12} sm={12} mt={4}>
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  // onClick={() => exportspdf(formik.values.sals_perf_id)}
                  // onBlur={() => setClose()}
                >
                  Download
                </Button>
                <br />
                <br />
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  // onClick={() => setClose()}
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

export default withAuth(SalesPerfectBinding);
