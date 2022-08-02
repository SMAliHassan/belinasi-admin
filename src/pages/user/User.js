import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  ShoppingCartSharp,
  Publish,
} from "@material-ui/icons";

import Preloader from "../../components/Preloader";
import belinasiApi from "../../apis/belinasiApi";
import "./user.css";

export default function User() {
  const history = useHistory();

  const [pageStatus, setPageStatus] = useState("loading");
  const [user, setUser] = useState();
  const [emailType, setEmailType] = useState("text");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const { data } = await belinasiApi.get("/users/" + userId);

        setUser(data.data.user);
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

  const sendMail = async (e) => {
    try {
      e.preventDefault();

      const emailData = {
        subject: emailSubject,
      };

      emailType === "html"
        ? (emailData.html = emailContent)
        : (emailData.message = emailContent);

      setPageStatus("loading");

      const { data } = await belinasiApi.post(
        `/users/${userId}/mail`,
        emailData
      );

      setPageStatus("loaded");

      toast.success(data.message);
    } catch (err) {
      setPageStatus("loaded");
      if (err.response.data) return toast.error(err.response.data.message);

      console.log(err);

      toast.error("Something went wrong!");
    }
  };

  if (pageStatus === "loading") return <Preloader status={pageStatus} />;

  return (
    <React.Fragment>
      <Preloader status={pageStatus} />
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">User</h1>
          {/* <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link> */}
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <p
                  className="userShowUsername"
                  style={{ paddingBottom: "0.4rem" }}
                >
                  <b>Name: </b> {user.name}
                </p>
                <p className="userShowUserTitle" style={{ fontWeight: 400 }}>
                  <b>Email: </b> {user.email}
                </p>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <b>Role: </b> {user.role}
                </span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <b>Created At: </b>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="userShowInfo">
                <ShoppingCartSharp className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <b>Total Orders: </b>
                  {user.totalOrders}
                </span>
              </div>

              <span className="userShowTitle">Contact Details (Last Used)</span>
              {user.orders.length ? (
                <>
                  <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      <b>Contact: </b>
                      {user.orders[user.orders.length - 1].contactInfo}
                    </span>
                  </div>
                  {/* <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      syedalihassan6651@gmail.com
                    </span>
                  </div> */}
                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      <b>Address: </b>
                      {
                        user.orders[user.orders.length - 1].address
                          .addressComplete
                      }
                    </span>
                  </div>
                </>
              ) : (
                <div style={{ marginTop: "0.5rem" }}>No Contact Details</div>
              )}
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Send Custom Email</span>

            <span style={{ marginLeft: "18%" }}>
              <label htmlFor="select-type">Select Type: </label>
              <select
                name="select-type"
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
              >
                <option value="text">Text</option>
                <option value="html">HTML</option>
              </select>
            </span>

            <form className="userEmailForm" onSubmit={sendMail}>
              <div className="userEmailForm__section">
                <label style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  Subject:
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div className="userEmailForm__section">
                <label style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  {emailType === "html" ? "HTML" : "Message"}:
                </label>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                ></textarea>
              </div>

              <button className="userEmailForm__btn-send">
                <MailOutline /> Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
