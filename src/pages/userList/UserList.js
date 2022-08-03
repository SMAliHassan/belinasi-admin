import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { toast } from "react-toastify";
import { EmailOutlined } from "@material-ui/icons";

import Preloader from "../../components/Preloader/";
import belinasiApi from "../../apis/belinasiApi";
import "./userList.css";

export default function UserList() {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    localStorage.setItem("emailUsers", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    window.scrollTo(0, 0);

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
    { field: "email", headerName: "Email", width: 220, sortable: false },
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

  if (!users.length) return <Preloader status={pageStatus} />;

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="userList">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ marginBottom: "1.2rem", fontSize: "2.2rem" }}>Users</h1>

          {selected.length ? (
            <Link
              to={`/admin/mail`}
              className="primary__btn"
              style={{
                margin: "0 auto",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
              }}
            >
              <EmailOutlined /> Send Email to selected ({selected.length})
            </Link>
          ) : null}
        </div>

        <DataGrid
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
          onSelectionModelChange={({ selectionModel }) =>
            setSelected(selectionModel)
          }
          checkboxSelection
        />
      </div>
    </React.Fragment>
  );
}
