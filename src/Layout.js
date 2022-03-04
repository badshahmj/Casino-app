import React, { useEffect, useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {

  useEffect(() => {
    localStorage.setItem("balance", 0);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        height: "100%",
        margin: "0px",
        width: "100%",
        position: "fixed",
      }}
    >
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default Layout;
