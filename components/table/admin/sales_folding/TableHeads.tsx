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
    id: "sals_fold_date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  {
    id: "sals_fold_fullname",
    numeric: false,
    disablePadding: true,
    label: "Name - Surname",
  },
  {
    id: "sals_fold_company_name",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "sals_fold_tel",
    numeric: false,
    disablePadding: true,
    label: "Phone no.",
  },
  {
    id: "sals_fold_email",
    numeric: false,
    disablePadding: true,
    label: "E-mail",
  },
  {
    id: "sals_fold_doc_type",
    numeric: false,
    disablePadding: true,
    label: "Document Type",
  },
  {
    id: "sals_fold_printing_type",
    numeric: false,
    disablePadding: true,
    label: "Printing Type",
  },
  {
    id: "sals_fold_amount",
    numeric: false,
    disablePadding: true,
    label: "Amount (THB)",
  },
  {
    id: "sals_fold_quotation_request",
    numeric: false,
    disablePadding: true,
    label: "Quotation Request",
  },
  {
    id: "sals_fold_finished_size",
    numeric: false,
    disablePadding: true,
    label: "Finished Size",
  },
  {
    id: "sals_fold_open_size",
    numeric: false,
    disablePadding: true,
    label: "Open Size",
  },
  {
    id: "sals_fold_column",
    numeric: false,
    disablePadding: true,
    label: "Fold",
  },
  {
    id: "sals_fold_page",
    numeric: false,
    disablePadding: true,
    label: "Page",
  },
  {
    id: "sals_fold_text_paper",
    numeric: false,
    disablePadding: true,
    label: "Paper",
  },
  {
    id: "sals_fold_printing",
    numeric: false,
    disablePadding: true,
    label: "Printing Color",
  },
  {
    id: "sals_fold_text_coating",
    numeric: false,
    disablePadding: true,
    label: "Coating",
  },
  {
    id: "sals_fold_printing_volume",
    numeric: false,
    disablePadding: true,
    label: "Printing Volume",
  },
  {
    id: "sals_fold_quotation_sending",
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
