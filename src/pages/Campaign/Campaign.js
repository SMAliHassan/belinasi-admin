import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import ReactPlayer from "react-player";

import { renderProductImages } from "../../utils/productUtils";
import belinasiApi from "../../apis/belinasiApi";
import Preloader from "../../components/Preloader";
import "./campaign.css";

export default function Campaign() {
  const { campaignId } = useParams();
  const history = useHistory();

  const [campaign, setCampaign] = useState();
  const [campaignProducts, setCampaignProducts] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    (async function () {
      try {
        const { data } = await belinasiApi.get(`/campaigns/${campaignId}`);
        setCampaign(data.data.campaign);

        const res = await belinasiApi.get(`/products/?campaign=${campaignId}`);
        setCampaignProducts(res.data.data.products);

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

        history.push("/admin/");
        toast.error("Something went wrong!");
      }
    })();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
      sortable: false,
    },

    {
      field: "product",
      headerName: "Product",
      width: 260,
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
            <Link to={`/admin/products/${params.row.id}`}>
              {params.row.name}
            </Link>
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
      width: 115,
    },
    {
      field: "price",
      headerName: "Price",
      width: 115,
      valueGetter: (params) => {
        return params.row.price + " Rp";
      },
    },
  ];

  if (pageStatus === "loading") return <Preloader status={pageStatus} />;

  return (
    <div className="campaign">
      <div className="campaignTitleContainer">
        <h1 className="campaignTitle">campaign</h1>
      </div>
      <div className="campaignTop">
        <div className="campaignTopLeft">
          <div className="campaignInfoTop">
            <span className="campaignName" style={{ paddingRight: "5rem" }}>
              {campaign.title}
            </span>
            {campaign.id}
          </div>
          <div className="campaignInfoBottom">
            <div className="campaignInfoItem">
              <span className="campaignInfoKey">Creator:</span>
              <span className="campaignInfoValue">
                <Link to={`/admin/users/${campaign.creator.id}`}>
                  {campaign.creator.name}
                </Link>
              </span>
            </div>
            <div className="campaignInfoItem">
              <span className="campaignInfoKey">Category:</span>
              <span className="campaignInfoValue">
                {campaign.category.slice(0, 1).toUpperCase() +
                  campaign.category.slice(1)}
              </span>
            </div>
            <div className="campaignInfoItem">
              <span className="campaignInfoKey">Description:</span>
              <span className="campaignInfoValue">{campaign.description}</span>
            </div>
            <div className="campaignInfoItem">
              <span className="campaignInfoKey">Start Date:</span>
              <span className="campaignInfoValue">
                {new Date(campaign.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="campaignInfoItem">
              <span className="campaignInfoKey">End Date:</span>
              <span className="campaignInfoValue">
                {new Date(campaign.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {campaignProducts.length ? (
        <div
          className="campaignBottom"
          style={{
            height:
              campaignProducts.length > 10
                ? "56rem"
                : campaignProducts.length * 5.6 + "rem",
          }}
        >
          <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Products:</h2>

          <DataGrid
            rows={campaignProducts}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
          />
        </div>
      ) : null}

      <div className="campaignImages" style={{ marginTop: "3rem" }}>
        <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Images:</h2>

        {campaign.images.map((img) => (
          <img src={img} alt="" />
        ))}
      </div>
      <div className="campaignVideo">
        <h2 style={{ padding: "0.5rem 0 0.3rem 0" }}>Video:</h2>
        {campaign.video ? (
          <ReactPlayer url={campaign.video} controls />
        ) : (
          <h3>This campaign has no video!</h3>
        )}
      </div>
    </div>
  );
}
