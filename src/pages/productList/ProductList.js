import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

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
        const { data } = await belinasiApi.get(
          "/products?limit=99999999&fields=name,id,status,campaign,price,images,type,sales"
        );

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
      width: 110,
      sortable: false,
    },

    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.images[0]}
              alt="prod-img"
            />
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
      width: 170,
      valueGetter: (params) => {
        return params.row.campaign.title;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      sortable: false,
    },
    {
      field: "sales",
      headerName: "Sales",
      width: 110,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      valueGetter: (params) => {
        return params.row.price + " Rp";
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 95,
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
