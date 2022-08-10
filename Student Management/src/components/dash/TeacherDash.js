import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import * as XLSX from 'xlsx'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import SearchBar from "material-ui-search-bar";
import { visuallyHidden } from "@mui/utils";
import { Button, makeStyles } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
const useStyles = makeStyles({
  button: {
    fontSize: "15px",

    color: "Green",
    width: "70px",
  },
  close: {
    fontSize: "15px",
  
    color: "red",
    width: "70px",
  },

  Tablehead: {
    backgroundColor: "#9c9ce2",
    color: "#33eaff",
    fontWeight: "bold",
    fontSize: "20px",
    boxShadow:'6px 2px 12px black',
  },
  head: {
    color: "#fffff",
    fontWeight: "bold",
    fontSize: "20px",
  },
});




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const main = JSON.parse(localStorage.getItem('students'))
// console.log(rows)
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Student Name"
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Student Email"
  },
  {
    id: "Class",
    numeric: true,
    disablePadding: false,
    label: "Class"
  },
  {
    id: "mobile",
    numeric: true,
    disablePadding: false,
    label: "Student Mobile"
  },
  {
    id: "adress",
    numeric: true,
    disablePadding: false,
    label: "Adress"
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy,  onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow className={classes.Tablehead}>
        {headCells.map((headCell) => (
          <TableCell classNaame={classes.head}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={()=>createSortHandler(headCell.id)}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

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
            )
        })
      }}
    >
      
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default function EnhancedTable({handleFunction}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const Export = () => {

    const workSheet = XLSX.utils.json_to_sheet(rows);

    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Articals");

    let buf = XLSX.write(workBook, { bookType: "pdf", type: "buffer" });

    XLSX.write(workBook, { bookType: "pdf", type: "binary" });

    XLSX.writeFile(workBook, "Student.pdf");

  };
  
  const [searched, setSearched] = React.useState("");
  const [rows, setRows] = React.useState(main);
  const requestSearch = (searchedVal) => {
    const filteredRows = main.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
   const exportPDF = () => {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(15);
  
      const title = "StudentList";
      const headers = [["NAME", "Email","Class","Mobile","Adress"]];
  
      const data = rows.map(row=> [row.name, row.email,row.Class,row.mobile,row.adress]);
  
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("StudentList.pdf")
    }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
         
      <Button color="primary" variant="contained"  style={{marginTop:"30px" ,marginLeft:"70px"}} onClick={()=>handleFunction()}>
       Add Student
      </Button>
     
        <Button  style={{marginTop:"30px",marginLeft:"1000px"}} onClick={()=>exportPDF()} color="secondary" variant="contained">Generate PDF</Button>
        <TableContainer>
        <SearchBar
          value={searched}
          style={{ width: "50%",marginLeft:"300px"}}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
             
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                  
                      tabIndex={-1}
                      key={row.name}
                      
                    >
                     
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.Class}</TableCell>
                      <TableCell align="right">{row.mobile}</TableCell>
                      <TableCell align="right">{row.adress}</TableCell>
                      {/* <TableCell align="right">{row.aname}</TableCell>
                      <TableCell align="right">{row.description}</TableCell> */}
                      
                    
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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
  );
}
