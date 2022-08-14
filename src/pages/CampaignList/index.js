import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import Preloader from "../../components/Preloader";
import belinasiApi from "../../apis/belinasiApi";
import "./index.css";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    (async function () {
      const { data } = await belinasiApi.get("/campaigns/");

      setCampaigns(data.data.campaigns);

      setPageStatus("loaded");
    })();
  }, []);

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "title",
      headerName: "Title",
      width: 185,
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "creator",
      headerName: "Creator",
      width: 130,
      renderCell: (params) => {
        return (
          <Link to={`/admin/users/${params.row.creator.id}`}>
            {params.row.creator.name}
          </Link>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Start",
      width: 140,
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() > new Date(v2).getTime() ? -1 : 1;
      },
      valueGetter: (params) => {
        return new Date(params.row.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      field: "endDate",
      headerName: "End",
      width: 140,
      sortComparator: (v1, v2) => {
        return new Date(v1).getTime() > new Date(v2).getTime() ? -1 : 1;
      },
      valueGetter: (params) => {
        return new Date(params.row.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
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
              to={"/admin/campaigns/" + params.row.id}
              style={{ margin: "0 auto" }}
            >
              <button className="CampaignListEdit">View</button>
            </Link>
          </>
        );
      },
    },
  ];

  if (!campaigns.length) return <Preloader status={pageStatus} />;

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="CampaignList">
        <h1 style={{ marginBottom: "1.2rem", fontSize: "2.2rem" }}>
          Campaigns
        </h1>

        <DataGrid
          rows={campaigns}
          disableSelectionOnClick
          columns={columns}
          pageSize={30}
        />
      </div>
    </React.Fragment>
  );
}
