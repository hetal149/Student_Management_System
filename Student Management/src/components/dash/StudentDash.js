import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import { visuallyHidden } from "@mui/utils";
import {
  Button,
  makeStyles,
} from "@material-ui/core";


import Modal from "react-bootstrap/Modal";
import EditAssignment from "../EditAssinment";
import { AssignmentContext } from "../Provider/AssignmentProvider";
import SearchBar from "material-ui-search-bar";
import NavBarStd from "../NavStd";

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
  
    boxShadow:'6px 2px 12px black',
  },
  head: {
    color: "#fffff",
    fontWeight: "bold",
 
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
// const rows=[]
const main = JSON.parse(localStorage.getItem('assignment'))





// console.log(rows)
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
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
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status"
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Student Email"
  },
  {
    id: "aname",
    numeric: false,
    disablePadding: true,
    label: "Assignment Name"
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Assignment Description"
  },
  {
    id: "Class",
    numeric: true,
    disablePadding: false,
    label: "Class"
  },

  {
    id: "file",
    numeric: true,
    disablePadding: false,
    label: ""
  },
  {
    id: "file",
    numeric: true,
    disablePadding: false,
    label: ""
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
          <TableCell className={classes.head}
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

export default function Home({afile,handleFunction}) {
  // console.log(file);
  const [show, setShow] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [currentId, setCurrentId] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClose = () => {setShow(false)
    setCurrentId(0);};
  const handleShow = () => setShow(true);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
    const[dele,setDele] = React.useState(false)
    const {deleteAssignments} = React.useContext(AssignmentContext)
    
  const del=(assignment)=>{

    if (window.confirm("Are you sure?") == true) {
      
    
      assignment.resolved = true;
      var id=assignment.id
     var  aname=assignment.aname
      var description = assignment.description
      var Class = assignment.Class
      var mobile = assignment.mobile
      var adress = assignment.adress
      var name = assignment.name
      var email = assignment.email
      var resolved = assignment.resolved
      const updatedAssignment = { id,resolved, aname, description, Class,email,mobile,adress,name }
      deleteAssignments(updatedAssignment,id)
      setDele(true)
    } else {
      
    }
  }

 
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

  
  
  const [searched, setSearched] = React.useState("");
  const [rows, setRows] = React.useState(main);
  const requestSearch = (searchedVal) => {
    const filteredRows = main.filter((row) => {
      return row.aname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


 

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
// const aprooved = JSON.parse(localStorage.getItem('assignment'))
const student = JSON.parse(localStorage.getItem('studentInfo'))

const ref = React.createRef();

  return (
   
    <Box sx={{ width: "100%" }}>
    <NavBarStd/>
      <Paper sx={{ width: "100%", mb: 2 }}>
     
       <Button color="primary" variant="contained"  style={{marginTop:"30px" ,marginLeft:"70px"}} onClick={handleFunction}>
       Add Assignment
      </Button>
  
        <SearchBar
          value={searched}
          style={{ width: "50%",marginLeft:"300px"}}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer ref={ref}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
             
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
             
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                 

                  return (
               
                    <TableRow
                     
                      onClick={(event) => handleClick(event, row.name)}
                      id='delete'
                      tabIndex={-1}
                      key={row.id}
                      sx={{
                        backgroundColor: row?.resolved
                          ? "#d9d9e8"
                          : "transparent",

                      
                        boxShadow: row?.resolved
                          ? "2px 0px 5px #000000 inset"
                          : "none",
                      }}
                    >  
                     
                     <TableCell><Button style={{ color: row.aprooved ? "green" : "red" }} id="delete">{row.aprooved ? "Aprooved" : "Pending"}</Button></TableCell><TableCell
                          component="th"
                          scope="row"
                          padding="none"
                        >
                          {row.email}</TableCell><TableCell
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.aname}
                          </TableCell><TableCell align="right">{row.description}</TableCell><TableCell align="right">{row.Class}</TableCell>
                          
                          {row.email===student?.email?
                         <><TableCell align="right">
                          <Button disabled={row.resolved || row.aprooved} variant="outlined" color="primary" onClick={() => {
                            handleShow();
                          } }>Edit</Button></TableCell><Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Edit Assignment
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <EditAssignment theAssignment={row} afile={afile} setShow={setShow} />

                            </Modal.Body>

                          </Modal><TableCell align="right"><Button disabled={row.resolved || row.aprooved} variant="outlined" color="secondary" id="delete" onClick={() => del(row)} key={row.id}>Delete</Button></TableCell></>
                  :<><TableCell disabled={row.resolved || row.aprooved}></TableCell><TableCell disabled={row.resolved || row.aprooved}></TableCell></>}
                
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
