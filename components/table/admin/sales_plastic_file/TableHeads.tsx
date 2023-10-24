import { Order } from "@/components/table/Table";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";

export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
  valSelected: any;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "sals_plas_date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "sals_plas_fullname",
    numeric: false,
    disablePadding: true,
    label: "Name - Surname",
  },
  {
    id: "sals_plas_company_name",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "sals_plas_tel",
    numeric: false,
    disablePadding: true,
    label: "Phone no.",
  },
  {
    id: "sals_plas_email",
    numeric: false,
    disablePadding: true,
    label: "E-mail",
  },
  {
    id: "sals_plas_doc_type",
    numeric: false,
    disablePadding: true,
    label: "Document Type",
  },
  {
    id: "sals_plas_printing_type",
    numeric: false,
    disablePadding: true,
    label: "Printing Type",
  },
  {
    id: "sals_plas_amount",
    numeric: false,
    disablePadding: true,
    label: "Amount (THB)",
  },
  {
    id: "sals_plas_quotation_request",
    numeric: false,
    disablePadding: true,
    label: "Quotation Request",
  },
  {
    id: "sals_plas_finished_size",
    numeric: false,
    disablePadding: true,
    label: "Finished Size",
  },
  // {
  //   id: "sals_plas_page",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Page",
  // },
  {
    id: "sals_plas_paper",
    numeric: false,
    disablePadding: true,
    label: "Paper",
  },
  {
    id: "sals_plas_printing",
    numeric: false,
    disablePadding: true,
    label: "Printing Color",
  },
  {
    id: "sals_plas_binding",
    numeric: false,
    disablePadding: true,
    label: "Binding",
  },
  {
    id: "sals_plas_printing_volume",
    numeric: false,
    disablePadding: true,
    label: "Printing Volume",
  },
  {
    id: "sals_plas_quotation_sending",
    numeric: false,
    disablePadding: true,
    label: "Quotation Sending",
  },
  // {
  //   id: "-",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Action",
  // },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  let {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" align="center">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={"none"}
            sx={{ fontWeight: "bold" }}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
