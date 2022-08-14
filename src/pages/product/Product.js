import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";

import { renderProductImages } from "../../utils/productUtils";
import belinasiApi from "../../apis/belinasiApi";
import ChartSetting from "../../components/ChartSetting";
import Preloader from "../../components/Preloader";
import "./product.css";

export default function Product() {
  const { productId } = useParams();
  const history = useHistory();

  const [product, setProduct] = useState();
  const [analytics, setAnalytics] = useState({ sales: [] });

  const [pageStatus, setPageStatus] = useState("loading");

  const getAnalytics = async (type, duration) => {
    const { data } = await belinasiApi.get(
      `/products/analytics/${productId}/${type}/${duration}`
    );
    setAnalytics(data.data);
  };

  useEffect(() => {
    (async function () {
      try {
        const { data } = await belinasiApi.get(`/products/${productId}`);
        setProduct(data.data.product);

        await getAnalytics("week", 60);

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

  if (pageStatus === "loading") return <Preloader status={pageStatus} />;

  const imagesMarkup = renderProductImages(product).map((img) => {
    return <div className="productInfoImg">{img} </div>;
  });

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={analytics.sales}
            dataKey="sold"
            fontSize={analytics.sales.length > 7 ? "0.8rem" : "1rem"}
          >
            <ChartSetting
              initialType={"week"}
              initialDuration={60}
              onSubmit={async (type, duration) => {
                setPageStatus("loading");
                await getAnalytics(type, duration);
                setPageStatus("loaded");
              }}
            />

            <h3
              style={{ fontSize: "1.3rem", paddingTop: "0.5rem" }}
              className="chartTitle"
            >
              Sales Performance
            </h3>
          </Chart>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName" style={{ paddingRight: "5rem" }}>
              {product.name} ({product.type})
            </span>
            {product.id}
          </div>
          <div className="productInfoBottom">
            {/* <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue"></span>
            </div> */}
            <div className="productInfoItem">
              <span className="productInfoKey">Sales:</span>
              <span className="productInfoValue">{product.sales}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Clicks:</span>
              <span className="productInfoValue">{product.clicks}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Conv. Rate:</span>
              <span className="productInfoValue">
                {product.clicks
                  ? ((+product.sales / +product.clicks) * 100).toFixed(3)
                  : 0}
                %
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Views:</span>
              <span className="productInfoValue">{product.views}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Active:</span>
              <span className="productInfoValue">
                {product.active ? "True" : "False"}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Campaign:</span>
              <span className="productInfoValue">
                <Link to={`/admin/campaigns/${product.campaign.id}`}>
                  {product.campaign.title}
                </Link>
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Creator:</span>
              <span className="productInfoValue">
                <Link to={`/admin/users/${product.creator.id}`}>
                  {product.creator.name}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="productImgContainer">
        <div className="productImgs"> {imagesMarkup}</div>
        <div className="productDesigns">
          <img src={product.designs.front} alt="" style={{ width: "50%" }} />
          {product.designs.back ? (
            <img src={product.designs.back} alt="" style={{ width: "50%" }} />
          ) : null}
        </div>
      </div>

      {/* <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder="Apple AirPod" />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div> */}
    </div>
  );
}
