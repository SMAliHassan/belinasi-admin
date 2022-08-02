import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Publish } from "@material-ui/icons";
import { toast } from "react-toastify";

import belinasiApi from "../../apis/belinasiApi";
import Chart from "../../components/chart/Chart";
import Preloader from "../../components/Preloader";
import "./order.css";

export default function Order() {
  const history = useHistory();
  const { orderId } = useParams();

  const [pageStatus, setPageStatus] = useState("loading");
  const [order, setOrder] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        const { data } = await belinasiApi.get("/orders/" + orderId);

        setOrder(data.data.order);
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

  if (pageStatus === "loading") return <Preloader status={pageStatus} />;

  const columns = [
    {
      field: "product.name",
      headerName: "Product",
      width: 140,
      sortable: false,

      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/admin/products/" + params.row.product?.id}
              style={{ margin: "0 auto" }}
            >
              {params.row.product?.name}
            </Link>
          </>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Qty",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      width: 110,
      sortable: false,
    },
    {
      field: "total",
      headerName: "Total",
      width: 110,
      valueGetter: (params) => {
        return params.row.product?.price * params.row.quantity + " Rp";
      },
    },
    {
      field: "size",
      headerName: "Size",
      width: 100,
      sortable: false,
    },
  ];

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />
      <div className="order">
        <div className="orderTitleContainer">
          <h1 className="orderTitle">Order</h1>
        </div>
        <div className="orderContainer">
          <div className="orderShow">
            <div className="orderShowTop">
              <div className="orderShowTopTitle">
                <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Overview:</h2>

                <div className="orderField">
                  <span>Total:</span> {order.total + " Rp"}
                </div>

                <div className="orderField">
                  <span>Customer: </span>
                  <Link to={`/admin/users/${order.user.id}`}>
                    {order.user.name}
                  </Link>
                </div>

                <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Contact:</h2>
                <div className="orderField">
                  <span>Contact Info: </span>
                  {order.contactInfo}
                </div>

                <div className="orderField">
                  <span>First Name: </span>
                  {order.address.firstName}
                </div>

                <div className="orderField">
                  <span>Last Name: </span>
                  {order.address.lastName}
                </div>

                <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Address:</h2>
                <div className="orderField">
                  <span>City: </span>
                  {order.address.city}
                </div>

                <div className="orderField">
                  <span>Postal Code: </span>
                  {order.address.postalCode}
                </div>

                <div className="orderField">
                  <span>Address: </span>
                  {order.address.addressComplete}
                </div>

                {order.address.addressMisc ? (
                  <div className="orderField">
                    <span>Address Misc.: </span>
                    {order.address.addressMisc}
                  </div>
                ) : null}

                <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Status:</h2>
                <div className="orderField">
                  <span>Payment Status: </span>
                  {order.paid ? "Paid" : "Unpaid"}
                </div>

                <div className="orderField">
                  <span>Fulfillment Status: </span>
                  {order.fulfilled ? "fulfilled" : "Unfulfilled"}
                </div>
              </div>
            </div>
          </div>

          {order.items.forEach((item) => (item.id = item._id))}

          <div className="orderItems">
            <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Items:</h2>

            <DataGrid
              rows={order.items}
              disableSelectionOnClick
              columns={columns}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
