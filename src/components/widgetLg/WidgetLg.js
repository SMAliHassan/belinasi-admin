import "./widgetLg.css";

export default function WidgetLg({ orders }) {
  const Button = ({ type, children }) => {
    return <button className={"widgetLgButton " + type}>{children}</button>;
  };

  const renderOrders = () => {
    return orders.map((order) => {
      return (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.user.name}</span>
          </td>
          <td className="widgetLgDate">
            {new Date(order.orderDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </td>
          <td className="widgetLgAmount">{order.total} Rp</td>
          <td className="widgetLgStatus">
            <Button type={order.paid ? "success" : "error"}>
              {order.paid ? "Paid" : "Unpaid"}
            </Button>
          </td>
        </tr>
      );
    });
  };

  if (!orders.length)
    return (
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Latest Orders</h3>
        <h4 style={{ paddingTop: "0.5rem" }}>No Order sice 5 days!</h4>
      </div>
    );

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Orders</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {renderOrders()}
      </table>
    </div>
  );
}
