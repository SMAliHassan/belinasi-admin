import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import Preloader from "../../components/Preloader";
import belinasiApi from "../../apis/belinasiApi";
import "./index.css";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    (async function () {
      const { data } = await belinasiApi.get("/orders/");

      setOrders(data.data.orders);
      console.log(data.data.orders);

      setPageStatus("loaded");
    })();
  }, []);

  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "name",
      headerName: "User",
      valueGetter: (params) => {
        return params.row.user.name;
      },
      width: 180,
    },
    {
      field: "items",
      headerName: "Items",
      width: 110,
      valueGetter: (params) => {
        return params.row.items.reduce((total, el) => total + el.quantity, 0);
      },
    },
    {
      field: "orderDate",
      headerName: "Date",
      width: 140,
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() > new Date(v2).getTime() ? -1 : 1;
      },
      valueGetter: (params) => {
        return new Date(params.row.orderDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      field: "paid",
      headerName: "Payment Status",
      valueGetter: (params) => {
        return params.row.paid ? "Paid" : "Unpaid";
      },
      width: 140,
      sortable: false,
    },
    {
      field: "fulfilled",
      headerName: "Fulfillment Status",
      valueGetter: (params) => {
        return params.row.fulfilled ? "Fulfilled" : "Unfulfilled";
      },
      width: 140,
      sortable: false,
    },
    {
      field: "total",
      headerName: "Total",
      width: 107,
    },
    {
      field: "action",
      headerName: "Action",
      width: 115,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/admin/orders/" + params.row.id}
              style={{ margin: "0 auto" }}
            >
              <button className="orderListEdit">View</button>
            </Link>
            {/* <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  if (!orders.length) return <Preloader status={pageStatus} />;

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="orderList">
        <h1 style={{ marginBottom: "1.2rem", fontSize: "2.2rem" }}>Orders</h1>

        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          pageSize={50}
        />
      </div>
    </React.Fragment>
  );
}
