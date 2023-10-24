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
    id: "fold_type",
    numeric: false,
    disablePadding: true,
    label: "Type",
  },
  {
    id: "fold_finished_size",
    numeric: false,
    disablePadding: true,
    label: "Finished Size",
  },
  {
    id: "fold_open_size",
    numeric: false,
    disablePadding: true,
    label: "Open Size",
  },
  {
    id: "fold_column",
    numeric: false,
    disablePadding: true,
    label: "Fold",
  },
  {
    id: "fold_page",
    numeric: false,
    disablePadding: true,
    label: "Page",
  },
  {
    id: "fold_text_paper",
    numeric: false,
    disablePadding: true,
    label: "Text Paper",
  },
  {
    id: "fold_printing",
    numeric: false,
    disablePadding: true,
    label: "Printing color",
  },
  {
    id: "fold_text_coating",
    numeric: false,
    disablePadding: true,
    label: "Coating",
  },
  {
    id: "fold_500",
    numeric: false,
    disablePadding: true,
    label: "500",
  },
  {
    id: "fold_1000",
    numeric: false,
    disablePadding: true,
    label: "1,000",
  },
  {
    id: "fold_2000",
    numeric: false,
    disablePadding: true,
    label: "2,000",
  },
  {
    id: "fold_3000",
    numeric: false,
    disablePadding: true,
    label: "3,000",
  },
  {
    id: "fold_4000",
    numeric: false,
    disablePadding: true,
    label: "4,000",
  },
  {
    id: "fold_5000",
    numeric: false,
    disablePadding: true,
    label: "5,000",
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
