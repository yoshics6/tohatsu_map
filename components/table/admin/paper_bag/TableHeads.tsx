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
    id: "papb_type",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "papb_finished_size",
    numeric: false,
    disablePadding: true,
    label: "Finished Size",
  },
  // {
  //   id: "papb_page",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Page",
  // },
  {
    id: "papb_paper",
    numeric: false,
    disablePadding: true,
    label: "Paper",
  },
  {
    id: "papb_printing",
    numeric: false,
    disablePadding: true,
    label: "Printing color",
  },
  {
    id: "papb_coating",
    numeric: false,
    disablePadding: true,
    label: "Coating",
  },
  {
    id: "papb_binding",
    numeric: false,
    disablePadding: true,
    label: "Binding",
  },
  {
    id: "papb_100",
    numeric: false,
    disablePadding: true,
    label: "100",
  },
  {
    id: "papb_200",
    numeric: false,
    disablePadding: true,
    label: "200",
  },
  {
    id: "papb_300",
    numeric: false,
    disablePadding: true,
    label: "300",
  },
  {
    id: "papb_400",
    numeric: false,
    disablePadding: true,
    label: "400",
  },
  {
    id: "papb_500",
    numeric: false,
    disablePadding: true,
    label: "500",
  },
  {
    id: "-",
    numeric: false,
    disablePadding: true,
    label: "Action",
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
        <TableCell padding="checkbox" align="center">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
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
