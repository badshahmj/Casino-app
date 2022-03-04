import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addBalance, Balance } from "./features/userSlice";
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
const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (localStorage.getItem("name")) {
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPasssword] = useState("");

  const dispatch = useDispatch();
  const total_balance = useSelector(Balance);
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submit form");
    localStorage.setItem("name", userName);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("password", userPassword);
    setOpen(false);
  };
  const incrementBalance = () => {
    const x = parseInt(localStorage.getItem("balance")) + 100;
    console.log(x);
    localStorage.setItem("balance", x);
    dispatch(addBalance(100));
  };
  return (
    <div
      style={{
        border: "0px solid",
        padding: "10px 15px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#d3dbbd",
      }}
    >
      <div
        style={{
          border: "0px solid",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            padding: 0,
            margin: 0,
            fontWeight: 600,
            fontFamily: "cursive",
          }}
        >
          Mayank Jain
        </p>
        <Button
          variant="outlined"
          style={{ margin: "0px 30px" }}
          onClick={() => incrementBalance()}
        >
          Get 100$ for free
        </Button>
      </div>
      <div
        style={{
          border: "0px solid",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            padding: 0,
            margin: "0 30px",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Balance: ${total_balance}
        </p>
        <Button variant="outlined" onClick={handleOpen}>
          {localStorage.getItem("name") ? "Log out" : "Log In"}
        </Button>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              onSubmit={submitForm}
              style={{
                border: "0px solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Name"
                variant="filled"
                required
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                style={{
                  border: "0px solid",
                  width: "100%",
                  margin: "10px 0px",
                }}
              />
              <TextField
                label="Email"
                variant="filled"
                onChange={(e) => setUserEmail(e.target.value)}
                type="email"
                required
                style={{
                  border: "0px solid",
                  width: "100%",
                  margin: "10px 0px",
                }}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                onChange={(e) => setUserPasssword(e.target.value)}
                required
                style={{
                  border: "0px solid",
                  width: "100%",
                  margin: "10px 0px",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ margin: "10px 0px" }}
              >
                Log in
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
