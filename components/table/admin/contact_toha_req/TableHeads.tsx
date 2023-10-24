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
    id: "contact_date",
    numeric: false,
    disablePadding: true,
    label: "Submitted",
  },
  {
    id: "contact_email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "contact_fullname",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "contact_full_address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "contact_message",
    numeric: false,
    disablePadding: true,
    label: "Message",
  },
  {
    id: "contact_telephone",
    numeric: false,
    disablePadding: true,
    label: "Telephone",
  },
  {
    id: "contact_model",
    numeric: false,
    disablePadding: true,
    label: "Model",
  },
  {
    id: "contact_serial_number",
    numeric: false,
    disablePadding: true,
    label: "Serial Number",
  },
  {
    id: "contact_horsepower",
    numeric: false,
    disablePadding: true,
    label: "Horsepower",
  },
  {
    id: "-",
    numeric: false,
    disablePadding: true,
    label: "-",
  },
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
