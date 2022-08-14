import { Link } from "react-router-dom";
import { Visibility } from "@material-ui/icons";

import "./widgetSm.css";

export default function WidgetSm({ users }) {
  const renderUsers = () => {
    return users.map((user) => {
      return (
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.name}</span>
            <span className="widgetSmUserTitle">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="widgetSmUser">
            <span className="widgetSmUsername">
              {user.role.slice(0, 1).toUpperCase() + user.role.slice(1)}
            </span>
          </div>
          <Link
            to={`/admin/users/${user.id}`}
            className="widgetSmButton"
            style={{ textDecoration: "none" }}
          >
            <Visibility className="widgetSmIcon" />
            View
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Users</span>
      <ul className="widgetSmList">
        {renderUsers()}
        {/* <li className="widgetSmListItem">
          <img
            src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">SM Ali Hassan</span>
            <span className="widgetSmUserTitle">Lahore</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">SM Ali Hassan</span>
            <span className="widgetSmUserTitle">Lahore</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">SM Ali Hassan</span>
            <span className="widgetSmUserTitle">Lahore</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">SM Ali Hassan</span>
            <span className="widgetSmUserTitle">Lahore</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">SM Ali Hassan</span>
            <span className="widgetSmUserTitle">Lahore</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li> */}
      </ul>
    </div>
  );
}
