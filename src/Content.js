import { Button, TableSortLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import club_icon from "./assets/club_icon.png";
import spade_icon from "./assets/spade_icon.png";
import diamond_icon from "./assets/diamond_icon.png";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import heart_icon from "./assets/heart_icon.png";
import { addBalance, Balance } from "./features/userSlice";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useTable } from "react-table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { DataGrid } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const map = new Map();
map.set(0, spade_icon);
map.set(1, club_icon);
map.set(2, diamond_icon);
map.set(3, heart_icon);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//     height: "20px",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
const Content = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [enterGame, setEnterGame] = useState(false);
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();
  const total_balance = useSelector(Balance);
  useEffect(() => {
    const a = Math.floor(Math.random() * 10) % 4;
    const b = Math.floor(Math.random() * 10) % 4;
    const c = Math.floor(Math.random() * 10) % 4;
    console.log(a + " " + b + " " + c);
    setFirst(a);
    setSecond(b);
    setThird(c);
  }, []);
  // Each spin costs $2 from the balance

  // - Thee different symbols XYZ does nothing

  // - Each pair XXY XYX YXX adds $0.5 to the balance

  // - Each three in row XXX adds $2 to the balance

  // - ♠♠♠ adds $5 to the balance
  const handleSpin = () => {
    const x = parseInt(localStorage.getItem("balance")) - 2;
    dispatch(addBalance(-2));
    localStorage.setItem("balance", x);
    const a = Math.floor(Math.random() * 10) % 4;
    const b = Math.floor(Math.random() * 10) % 4;
    const c = Math.floor(Math.random() * 10) % 4;
    if (a === 0 && a === b && a === c) {
      const x = parseInt(localStorage.getItem("balance")) + 5;
      localStorage.setItem("balance", x);
      dispatch(addBalance(5));
    } else if (a === b && a === c) {
      const x = parseInt(localStorage.getItem("balance")) + 2;
      localStorage.setItem("balance", x);
      dispatch(addBalance(2));
    } else if (a === b && a != c) {
      const x = parseInt(localStorage.getItem("balance")) + 0.5;
      localStorage.setItem("balance", x);
      dispatch(addBalance(0.5));
    } else if (a === c && a != b) {
      const x = parseInt(localStorage.getItem("balance")) + 0.5;
      localStorage.setItem("balance", x);
      dispatch(addBalance(0.5));
    } else if (b === c && a != b) {
      const x = parseInt(localStorage.getItem("balance")) + 0.5;
      localStorage.setItem("balance", x);
      dispatch(addBalance(0.5));
    }
    const temp = [];
    temp.push(a);
    temp.push(b);
    temp.push(c);
    temp.push(new Date());
    temp.push(tableData.length + 1);
    const tempData = tableData;
    tempData.push(temp);
    setTableData(tempData);
    setFirst(a);
    setSecond(b);
    setThird(c);
  };
  const handleFakeSpin = () => {
    const x = parseInt(localStorage.getItem("balance")) + 3;
    localStorage.setItem("balance", x);
    dispatch(addBalance(3));
    const temp = [];

    temp.push(0);
    temp.push(0);
    temp.push(0);
    temp.push(new Date());
    temp.push(tableData.length + 1);
    const tempData = tableData;
    tempData.push(temp);
    setTableData(tempData);
    setFirst(0);
    setSecond(0);
    setThird(0);
  };
  // const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  //   { field: "time", headerName: "Time", width: 70 },
  //   { field: "slots", headerName: "Slots Data", width: 130 },
  // ];

  // const rowData = tableData.map((data, index) => {
  //   return {
  //     id: index,
  //     time: 2,
  //     slots: <div>Hello</div>,
  //   };
  // });
  // const rows = rowData;
  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [ascId, setAscId] = useState(true);
  const [ascDate, setAscDate] = useState(true);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sortAscById = () => {
    setAscId(false);
    const tempData = tableData;
    tempData.sort((a, b) => a[4] - b[4]);
    //console.log("ASCCCCCCC =>", tempData);
    setTableData(tempData);
  };
  const sortDescById = () => {
    setAscId(true);
    const tempData = tableData;
    tempData.sort((a, b) => b[4] - a[4]);
    //console.log("DESSSSSSCCCCCCC =>", tempData);
    setTableData(tempData);
  };
  const sortAscByDate = () => {
    setAscDate(false);
    const tempData = tableData;
    tempData.sort((a, b) => a[3] - b[3]);
    setTableData(tempData);
  };
  const sortDescByDate = () => {
    setAscDate(true);
    const tempData = tableData;
    tempData.sort((a, b) => b[3] - a[3]);
    setTableData(tempData);
  };
  const columns = [
    { id: "name", label: "Id", minWidth: 50 },
    { id: "code", label: "Time", minWidth: 140 },
    {
      id: "population",
      label: "Slots Data",
      minWidth: 140,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(name, code, population) {
    return { name, code, population };
  }
  // const tempData = tableData((data) => {
  //   return createData("India", <h1>'IN'</h1>, 1324171354);
  // });
  const getDateString = (date_str) => {
    const date = new Date(date_str); // 2009-11-10
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    function getOrdinalNum(n) {
      return (
        n +
        (n > 0
          ? ["th", "st", "nd", "rd"][
              (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
            ]
          : "")
      );
    }
    const day = getOrdinalNum(date.getDate());

    const full_date = day + " " + month + " " + year;
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var secs = date.getSeconds();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }

    const full_time = formatAMPM(date);
    return full_date + " " + full_time;
  };
  const tempData = tableData.map((data, index) =>
    createData(
      <p style={{ width: "50px" }}>{data[4]}</p>,
      <p style={{ width: "140px" }}>{getDateString(data[3])}</p>,
      <div style={{ width: "140px" }}>
        <img
          src={map.get(data[0])}
          style={{ height: "30px", widht: "30px" }}
        />
        <img
          src={map.get(data[1])}
          style={{
            height: "30px",
            widht: "30px",
            margin: "0px 10px",
          }}
        />
        <img
          src={map.get(data[2])}
          style={{ height: "30px", widht: "30px" }}
        />
      </div>
    )
  );
  // const rows = [
  //   createData("India", <h1>'IN'</h1>, 1324171354),
  //   createData("China", "CN", 1403500365, 9596961),
  //   createData("Italy", "IT", 60483973, 301340),
  // ];
  const rows = tempData;
  const incrementBalance = () => {
    const x = parseInt(localStorage.getItem("balance")) + 100;
    console.log(x);
    localStorage.setItem("balance", x);
    dispatch(addBalance(100));
  };
  return (
    <div
      style={{
        flex: 1,
        border: "0px solid",
        display: "flex",
        flexDirection: "column",
        justifyContent: enterGame ? "flex-start" : "center",
        alignItems: "center",
        overflow: "auto",
        background: "#d3dbbd",
      }}
    >
      {console.log("table dataaaaaa =>  ", tableData)}
      {enterGame ? (
        <>
          {" "}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {total_balance > 2 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ margin: 0 }}>Click on Spin to try your luck</p>
                  <p style={{ margin: 0 }}>Each spin costs 2 dollars</p>
                  <div
                    style={{
                      display: "flex",
                      border: "5px solid #c5c0d3",
                      marginTop: "40px",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        border: "0px solid black",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        borderWidth: "0px",
                        borderRadius: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={map.get(first)}
                        style={{ height: "40px", widht: "40px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "50px",
                        border: "0px solid black",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={map.get(second)}
                        style={{ height: "40px", widht: "40px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "50px",
                        border: "0px solid black",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        borderWidth: "0px",
                        borderRadius: "5px",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={map.get(third)}
                        style={{ height: "40px", widht: "40px" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <Button variant="outlined" onClick={() => handleSpin()}>
                      Spin
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ margin: "0px 15px" }}
                      onClick={() => handleFakeSpin()}
                    >
                      Fake Spin
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Exit Game
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p style={{ margin: 0, padding: 0 }}>
                    You Don't have Enough balance
                  </p>
                  <Button
                    variant="outlined"
                    style={{ marginTop: "30px" }}
                    onClick={() => incrementBalance()}
                  >
                    Get 100$ for free
                  </Button>
                </div>
              )}
            </Box>
          </Modal>
          <h3>Welcome {localStorage.getItem("name")}</h3>
          <Button variant="outlined" onClick={handleOpen}>
            Start the game
          </Button>
          <p
            style={{
              padding: 0,
              margin: 0,
              fontWeight: 600,
              fontSize: "20px",
            }}
          >
            Results
          </p>
          <div style={{ flex: 1 }}>
            <Paper
              sx={{ width: "100%" }}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TableContainer style={{ flex: 1 }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            border: "0px solid",
                            minWidth: column.minWidth,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              border: "0px solid",
                              justifyContent: "space-between",
                            }}
                          >
                            {column.label}

                            {index === 0 && ascId ? (
                              <ArrowUpward
                                onClick={sortAscById}
                                style={{ fontSize: "19px" }}
                              />
                            ) : index === 0 ? (
                              <ArrowDownward
                                style={{ fontSize: "19px" }}
                                onClick={sortDescById}
                              />
                            ) : (
                              <></>
                            )}
                            {index === 1 && ascDate ? (
                              <ArrowUpward
                                onClick={sortAscByDate}
                                style={{ fontSize: "19px" }}
                              />
                            ) : index === 1 ? (
                              <ArrowDownward
                                onClick={sortDescByDate}
                                style={{ fontSize: "19px" }}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody
                    style={{
                      border: "0px solid red",
                      flex: 1,
                    }}
                  >
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                            style={{ border: "0px solid blue" }}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </div>
        </>
      ) : (
        <>
          <p>
            It looks like you have never played this game,you can login or
            start playing right away
          </p>
          <Button variant="outlined" onClick={() => setEnterGame(true)}>
            Start the game
          </Button>
        </>
      )}
    </div>
  );
};

export default Content;
