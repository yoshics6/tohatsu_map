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
    id: "fd_no",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "fd_code",
    numeric: false,
    disablePadding: true,
    label: "Code",
  },
  {
    id: "fd_dealer",
    numeric: false,
    disablePadding: true,
    label: "Dealer",
  },
  {
    id: "fd_shop",
    numeric: false,
    disablePadding: true,
    label: "Shop",
  },
  {
    id: "fd_busines_type",
    numeric: false,
    disablePadding: true,
    label: "Busines Type",
  },
  {
    id: "fd_province",
    numeric: false,
    disablePadding: true,
    label: "province",
  },
  {
    id: "fd_address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "fd_road",
    numeric: false,
    disablePadding: true,
    label: "Road",
  },
  {
    id: "fd_subdistrict",
    numeric: false,
    disablePadding: true,
    label: "Subdistrict",
  },
  {
    id: "fd_district",
    numeric: false,
    disablePadding: true,
    label: "District",
  },
  {
    id: "fd_zipcode",
    numeric: false,
    disablePadding: true,
    label: "Zipcode",
  },
  {
    id: "fd_tel",
    numeric: false,
    disablePadding: true,
    label: "Tel",
  },
  {
    id: "fd_latitude",
    numeric: false,
    disablePadding: true,
    label: "Latitude",
  },
  {
    id: "fd_longitude",
    numeric: false,
    disablePadding: true,
    label: "Longitude",
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
