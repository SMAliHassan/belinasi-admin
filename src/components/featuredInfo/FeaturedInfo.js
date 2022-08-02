import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import "./featuredInfo.css";

export default function FeaturedInfo({ sales, orders, visits }) {
  const history = useHistory();

  const renderIncrement = (increment) => {
    return (
      <span className="featuredMoneyRate">
        {(increment >= 1 ? "+" : "") + increment}
        {increment > 0 ? (
          <ArrowUpward className="featuredIcon" />
        ) : (
          <ArrowDownward className={"featuredIcon negative"} />
        )}
      </span>
    );
  };

  const FeaturedItem = ({ value, increment, title, sub, bottomSub }) => {
    return (
      <div
        className="featuredItem"
        onClick={() => history.push("/admin/analytics")}
      >
        <span className="featuredTitle">{title}</span>
        <span className="featuredSub" style={{ paddingLeft: "0.5rem" }}>
          {sub}
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{value}</span>
          {renderIncrement(increment)}
        </div>
        <span className="featuredSub">{bottomSub}</span>
      </div>
    );
  };

  return (
    <div className="featured">
      <FeaturedItem
        value={sales.sales + " Rp"}
        increment={sales.increment}
        title={"Sales"}
        sub="this month (till now)"
        bottomSub={"Compared to Last month"}
      />

      {/* <div
        className="featuredItem"
        onClick={() => history.push("/admin/analytics")}
      >
        <span className="featuredTitle">Sales</span>
        <span className="featuredSub" style={{ paddingLeft: "0.5rem" }}>
          this month (til now)
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{sales.sales} Rp</span>
          {renderIncrement(sales.increment)}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}

      <FeaturedItem
        value={orders.orders + " Rp"}
        increment={orders.increment}
        title={"Orders"}
        sub="this month (till now)"
        bottomSub={"Compared to Last month"}
      />

      {/* <div
        className="featuredItem"
        onClick={() => history.push("/admin/analytics")}
      >
        <span className="featuredTitle">Orders</span>
        <span className="featuredSub" style={{ paddingLeft: "0.5rem" }}>
          this month (til now)
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orders.orders}</span>
          {renderIncrement(orders.increment)}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}

      <FeaturedItem
        value={visits.visits}
        increment={visits.increment}
        title={"Visits"}
        sub="today (till now)"
        bottomSub={"Compared to Yesterday"}
      />

      {/* <div
        className="featuredItem"
        onClick={() => history.push("/admin/analytics")}
      >
        <span className="featuredTitle">Visits</span>
        <span className="featuredSub" style={{ paddingLeft: "0.5rem" }}>
          today (til now)
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{visits.visits}</span>
          {renderIncrement(visits.increment)}
        </div>
        <span className="featuredSub">Compared to yesterday</span>
      </div> */}
    </div>
  );
}
