import withAuth from "@/components/admin/withAuth";
import { NextPage } from "next/types";
import React, { useState } from "react";
import { appDispatch, appSelector } from "@/store/hooks";
import Layout from "@/components/admin/Layout/Layout";
import { Button, Stack, TextField } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import Image from "next/image";
import router from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Table
import { getComparator, stableSort, Order } from "@/components/table/Table";
import {
  EnhancedTableHead,
  EnhancedTableToolbarProps,
} from "@/components/table/admin/banner/TableHeads";
import {
  getBanner,
  deleteBanner,
  deleteAllBanner,
  sortableBanner,
} from "@/features/admin/banner";
import saveAsExcel from "@/features/admin/banner/export";

const Banner: NextPage = () => {
  const dispatch = appDispatch();
  const [searched, setSearched] = React.useState<string>("");
  const { data } = appSelector((state) => state.banner);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows: any = data ?? [];

  // *************************** Use Effect ***************************
  React.useEffect(() => {
    dispatch(getBanner(""));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getBanner(searched));
  }, [dispatch, searched]);
  // *************************** Use Effect ***************************
  const exports = () => {
    saveAsExcel({ rows });
  };
  // *************************** Action ***************************
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    let movedItems: any = reorder(
      rows,
      result.source.index,
      result.destination.index
    );
    dispatch(sortableBanner(movedItems)).then((value: any) => {
      dispatch(getBanner(searched));
    });
    dispatch(getBanner(searched));
  };
  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

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
        data.append("banner_id", id);
        Swal.fire("Deleted!", "Your data has been deleted.", "success").then(
          function () {
            dispatch(deleteBanner(data)).then((result: any) => {
              dispatch(getBanner(""));
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
            dispatch(deleteAllBanner(id)).then((result: any) => {
              dispatch(getBanner(""));
            });
          }
        );
      }
    });
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
      const newSelected = rows.map((n: any) => n.banner_id);
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

  const handleChangePage = (event: unknown, bannerPage: number) => {
    setPage(bannerPage);
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
            Banner
            <br />
            <span style={{ fontSize: 18, color: "red" }}>
              * drag sorting for vertical list items
            </span>
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
            sx={{ ml: 2, mb: 1 }}
            variant="contained"
            color="primary"
            onClick={() => router.push("/admin/banner/add")}
          >
            Add Banner
          </Button>

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
              <DragDropContext onDragEnd={onDragEnd} key={0}>
                <Droppable droppableId="droppable" key={0}>
                  {(provided, snapshot) => (
                    <TableBody
                      key={0}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {rows.length > 0
                        ? stableSort(rows, getComparator(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row: any, index) => {
                              const isItemSelected = isSelected(row.banner_id);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <Draggable
                                  key={row.banner_id}
                                  draggableId={"q-" + row.banner_id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <TableRow
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      hover
                                      onClick={(event) =>
                                        handleClick(event, row.banner_id)
                                      }
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.banner_id}
                                      selected={isItemSelected}
                                    >
                                      <TableCell
                                        padding="checkbox"
                                        align="center"
                                      >
                                        <Checkbox
                                          color="primary"
                                          checked={isItemSelected}
                                          inputProps={{
                                            "aria-labelledby": labelId,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                        align="center"
                                      >
                                        {row.post_date}
                                      </TableCell>
                                      <TableCell align="center">
                                        {row.topic}
                                      </TableCell>
                                      <TableCell align="center" width={200}>
                                        <Image
                                          loading="lazy"
                                          src={`/upload/banner/${row.filename}`}
                                          alt={row.topic}
                                          width={200}
                                          height={100}
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        {row.status == "Active"
                                          ? "Active"
                                          : "In Active"}
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
                                            onClick={() =>
                                              router.push(
                                                `/admin/banner/edit?id=${row.banner_id}`
                                              )
                                            }
                                          >
                                            <EditIcon fontSize="inherit" />
                                          </IconButton>

                                          <IconButton
                                            color="error"
                                            aria-label="delete"
                                            size="large"
                                            onClick={() =>
                                              Delete(row.banner_id)
                                            }
                                          >
                                            <DeleteIcon fontSize="inherit" />
                                          </IconButton>
                                        </Stack>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Draggable>
                              );
                            })
                        : ""}
                    </TableBody>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[{ label: "All", value: rows.length }]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Layout>
  );
};

// export const getStaticProps: any = wrapper.getStaticProps(
//   (store) => async () => {
//     const data: any = await store.dispatch(getBannerEN());
//     console.log(data);
//     return {
//       props: {
//         initData: data.payload,
//       },
//     };
//   }
// );

export default withAuth(Banner);
