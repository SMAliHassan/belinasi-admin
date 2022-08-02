import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import ChartSetting from "../../components/ChartSetting";
import Preloader from "../../components/Preloader";
import Chart from "../../components/chart/Chart";
import belinasiApi from "../../apis/belinasiApi";
import "./analytics.css";

const Analytics = () => {
  const history = useHistory();

  const [pageStatus, setPageStatus] = useState("loading");
  const [salesAnalytics, setSalesAnalytics] = useState([]);
  const [ordersAnalytics, setOrdersAnalytics] = useState([]);
  const [visitsAnalytics, setVisitsAnalytics] = useState([]);

  const getVisitsAnalytics = async (type, duration) => {
    const { data } = await belinasiApi.get(
      `/visits/visitsAnalytics/${type}/${duration}`
    );

    setVisitsAnalytics(data.data.visits);
  };
  const getOrdersAnalytics = async (type, duration) => {
    const { data } = await belinasiApi.get(
      `/orders/ordersAnalytics/${type}/${duration}`
    );

    setOrdersAnalytics(data.data.orders);
  };
  const getSalesAnalytics = async (type, duration) => {
    const { data } = await belinasiApi.get(
      `/orders/salesAnalytics/${type}/${duration}`
    );

    setSalesAnalytics(data.data.sales);
  };

  useEffect(() => {
    (async function () {
      try {
        const requests = [
          getSalesAnalytics("week", 60),
          getOrdersAnalytics("week", 60),
          getVisitsAnalytics("day", 30),
        ];

        await Promise.all(requests);

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

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />

      <div className="home">
        {/* <FeaturedInfo
          orders={ordersThisMonth}
          sales={salesThisMonth}
          visits={visitsToday}
        /> */}

        {/* Sales Chart */}
        <Chart
          data={salesAnalytics}
          grid
          dataKey="sales"
          fontSize={salesAnalytics.length > 20 ? "0.8rem" : "1rem"}
        >
          <ChartSetting
            initialDuration={60}
            initialType={"week"}
            onSubmit={async (type, duration) => {
              setPageStatus("loading");
              await getSalesAnalytics(type, duration);
              setPageStatus("loaded");
            }}
          />

          <h1 className="chartTitle">Sales</h1>
        </Chart>

        {/* Orders Chart */}
        <Chart
          data={ordersAnalytics}
          grid
          dataKey="orders"
          fontSize={ordersAnalytics.length > 20 ? "0.8rem" : "1rem"}
        >
          <ChartSetting
            initialDuration={60}
            initialType={"week"}
            onSubmit={async (type, duration) => {
              setPageStatus("loading");
              await getOrdersAnalytics(type, duration);
              setPageStatus("loaded");
            }}
          />

          <h1 className="chartTitle">Orders</h1>
        </Chart>

        {/* Visits Chart */}
        <Chart
          data={visitsAnalytics}
          grid
          dataKey="visits"
          fontSize={visitsAnalytics.length > 20 ? "0.8rem" : "1rem"}
        >
          <ChartSetting
            initialDuration={30}
            initialType={"day"}
            onSubmit={async (type, duration) => {
              setPageStatus("loading");
              await getVisitsAnalytics(type, duration);
              setPageStatus("loaded");
            }}
          />

          <h1 className="chartTitle">Visits</h1>
        </Chart>
      </div>
    </React.Fragment>
  );
};

export default Analytics;
