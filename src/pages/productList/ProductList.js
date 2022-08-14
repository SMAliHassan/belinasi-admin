import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";

import { renderProductImages } from "../../utils/productUtils";
import Preloader from "../../components/Preloader";
import belinasiApi from "../../apis/belinasiApi";
import "./productList.css";

export default function ProductList() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        const { data } = await belinasiApi.get("/products?limit=99999999");

        setProducts(data.data.products);

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

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      sortable: false,
    },

    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem" style={{ height: "2rem" }}>
            {/* <img
              className="productListImg"
              src={params.row.designs.front}
              alt="prod-img"
            /> */}
            <div className="productListImg">
              {renderProductImages(params.row)[0]}
            </div>
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "type",
      headerName: "Type",
      width: 100,
      sortable: false,
    },

    {
      field: "campaign",
      headerName: "Campaign",
      width: 155,
      valueGetter: (params) => {
        return params.row.campaign.title;
      },
    },
    {
      field: "active",
      headerName: "Status",
      width: 95,
      sortable: false,
      valueGetter: (params) => {
        return params.row.active ? "Active" : "Inactive";
      },
    },
    {
      field: "sales",
      headerName: "Sales",
      width: 110,
    },
    {
      field: "clicks",
      headerName: "Clicks",
      width: 107,
    },
    {
      field: "price",
      headerName: "Price",
      width: 115,
      valueGetter: (params) => {
        return params.row.price + " Rp";
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 92,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={"/admin/products/" + params.row.id}
              style={{ margin: "0 auto" }}
            >
              <button className="productListEdit">View/Edit</button>
            </Link>
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];

  if (!products.length) return <Preloader status={pageStatus} />;

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="productList">
        <h1 style={{ marginBottom: "1.2rem", fontSize: "2.2rem" }}>Products</h1>

        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={25}
        />
      </div>
    </React.Fragment>
  );
}
