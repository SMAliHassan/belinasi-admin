import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import { EmailOutlined } from "@material-ui/icons";

import belinasiApi from "../../apis/belinasiApi";
import Preloader from "../../components/Preloader";

import "./mail.css";

const Mail = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");
  const [emailType, setEmailType] = useState("text");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const emailUsers = JSON.parse(localStorage.getItem("emailUsers"));
    if (emailUsers && emailUsers.length) {
      setSelected(emailUsers);
    } else {
      localStorage.setItem("emailUsers", JSON.stringify([]));
      setSelected([]);
    }

    (async function () {
      try {
        const { data } = await belinasiApi.get("/users");

        setUsers(data.data.users);

        setPageStatus("loaded");
      } catch (err) {
        setPageStatus("loaded");

        if (err.response.data) {
          toast.error(err.response.data.message);

          return err.response.status === 401
            ? history.push("/admin/login")
            : null;
        }

        console.log(err);

        toast.error("Something went wrong!");
      }
    })();
  }, []);

  const sendMail = async (e) => {
    try {
      e.preventDefault();

      if (!selected.length) {
        window.scrollTo(0, 400);
        return toast.error(
          "Please select the users you want to send the mail to!"
        );
      }

      const emailData = {
        subject: emailSubject,
        users: selected,
      };

      emailType === "html"
        ? (emailData.html = emailContent)
        : (emailData.message = emailContent);

      setPageStatus("loading");

      const { data } = await belinasiApi.post(`/users/mail`, emailData);

      setPageStatus("loaded");

      toast.success(data.message);
    } catch (err) {
      setPageStatus("loaded");

      console.log(err);

      if (err.response.data) return toast.error(err.response.data.message);

      console.log(err);

      toast.error("Something went wrong!");
    }
  };

  if (pageStatus === "loading") return <Preloader status={pageStatus} />;

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 140,
      sortable: false,
    },
    {
      field: "name",
      headerName: "User",
      width: 180,
    },
    { field: "email", headerName: "Email", width: 230, sortable: false },
    {
      field: "role",
      headerName: "Role",
      width: 130,
    },
    {
      field: "totalOrders",
      headerName: "Orders",
      width: 130,
    },
    {
      sortable: false,
      field: "action",
      headerName: "Action",
      width: 92,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/admin/users/" + params.row.id}
              style={{ margin: "0 auto" }}
            >
              <button className="userListEdit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="mail">
      <div style={{ display: "flex", alignItems: "center", width: "50%" }}>
        <h1>Send Email</h1>
        <div style={{ margin: "0 auto", fontSize: "1.15rem" }}>
          <label htmlFor="select-type">Select Type: </label>
          <select
            style={{ cursor: "pointer" }}
            name="select-type"
            value={emailType}
            onChange={(e) => setEmailType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>

      <form
        className="userEmailForm"
        onSubmit={sendMail}
        style={{
          maxWidth: "79vw",
          padding: "1rem 0",
          boxSizing: "border-box",
        }}
      >
        <div
          className="userEmailForm__section"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              paddingBottom: "0.3rem",
            }}
          >
            Subject:
          </label>
          <input
            style={{ maxWidth: "99%" }}
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
          />
        </div>

        <div
          className="userEmailForm__section"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              paddingBottom: "0.3rem",
            }}
          >
            {emailType === "html" ? "HTML" : "Message"}:
          </label>
          <textarea
            style={{ maxWidth: "99%" }}
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          ></textarea>
        </div>

        <button className="userEmailForm__btn-send" style={{ margin: "0" }}>
          <EmailOutlined style={{ marginRight: "0.2rem" }} /> Send Mail to{" "}
          {selected.length} users
        </button>
      </form>

      <h1 style={{ padding: "0.75rem 0 0.5rem 0" }}>Select Users</h1>

      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        hideFooterPagination
        selectionModel={selected}
        onSelectionModelChange={({ selectionModel }) => {
          setSelected(selectionModel);
          localStorage.setItem("emailUsers", JSON.stringify(selectionModel));
        }}
        checkboxSelection
      />
    </div>
  );
};

export default Mail;
