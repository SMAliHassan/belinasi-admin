import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Preloader from "../../components/Preloader/";
import belinasiApi from "../../apis/belinasiApi";
import "./home.css";

export default function Home() {
  const [pageStatus, setPageStatus] = useState("loading");
  const [newUsers, setNewUsers] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const history = useHistory();

  const [salesThisMonth, setSalesThisMonth] = useState({});
  const [ordersThisMonth, setOrdersThisMonth] = useState({});
  const [visitsToday, setVisitsToday] = useState({});

  const getSalesThisMonth = async () => {
    const { data } = await belinasiApi.get("/orders/salesThisMonth");
    setSalesThisMonth(data.data);
  };
  const getOrdersThisMonth = async () => {
    const { data } = await belinasiApi.get("/orders/ordersThisMonth");
    setOrdersThisMonth(data.data);
  };
  const getVisitsToday = async () => {
    const { data } = await belinasiApi.get("/visits/visitsToday");
    setVisitsToday(data.data);
  };
  const getNewUsers = async () => {
    const { data } = await belinasiApi.get("/users/new");
    setNewUsers(data.data.users);
  };
  const getNewOrders = async () => {
    const { data } = await belinasiApi.get("/orders/new");
    setNewOrders(data.data.orders);
  };

  useEffect(() => {
    (async function () {
      try {
        const requests = [
          getNewOrders(),
          getNewUsers(),
          getSalesThisMonth(),
          getOrdersThisMonth(),
          getVisitsToday(),
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
        <FeaturedInfo
          orders={ordersThisMonth}
          sales={salesThisMonth}
          visits={visitsToday}
        />

        <div className="homeWidgets">
          <WidgetSm users={newUsers} />
          <WidgetLg orders={newOrders} />
        </div>
      </div>
    </React.Fragment>
  );
}
