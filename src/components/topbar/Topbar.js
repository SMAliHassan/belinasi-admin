import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { LockOutlined } from "@material-ui/icons";

import Preloader from "../Preloader/";
import belinasiApi from "../../apis/belinasiApi";
import "./topbar.css";

export default function Topbar() {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageStatus, setPageStatus] = useState("loaded");

  useEffect(() => {
    // Initial
    if (localStorage.getItem("adminId")) {
      loggedIn || setLoggedIn(true);
    } else {
      setLoggedIn(false);

      history.location.pathname !== "/admin/login" &&
        history.push("/admin/login");
    }

    const refreshIntervalId = setInterval(() => {
      const adminId = localStorage.getItem("adminId");

      if (adminId) {
        loggedIn || setLoggedIn(true);
      } else {
        setLoggedIn(false);

        history.location.pathname !== "/admin/login" &&
          history.push("/admin/login");
      }
    }, 600);

    return () => clearInterval(refreshIntervalId);
  }, [history, loggedIn]);

  const logout = async () => {
    setModalOpen(false);
    setPageStatus("loading");
    await belinasiApi.delete("/users/logout");

    toast.info("User logged out.");

    localStorage.removeItem("adminId");

    setPageStatus("loaded");
    history.replace("/admin/login");
  };

  return (
    <div className="topbar">
      <Preloader status={pageStatus} />
      <ToastContainer position="top-center" />

      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/admin" className="logo" style={{ textDecoration: "none" }}>
            <h2>BELINASI</h2>
          </Link>
        </div>

        <div className="topRight">
          {loggedIn ? (
            <button
              className="primary__btn"
              onClick={() => setModalOpen(true)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize: "1.2rem",
              }}
            >
              <LockOutlined style={{ marginRight: "0.3rem" }} /> Logout
            </button>
          ) : null}
        </div>

        <Popup open={modalOpen} modal onClose={() => setModalOpen(false)}>
          <div className="modal">
            <h2>Are you sure you want to Logout?</h2>

            <div className="modal__btn-container">
              <button onClick={() => setModalOpen(false)}>Cancel</button>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}
