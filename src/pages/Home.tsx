import BarChartBox from "../components/barChartBox/BarChartBox";
import BigChartBox from "../components/bigChartBox/BigChartBox";
import ChartBox from "../components/chartBox/ChartBox";
import PieChartBox from "../components/pieCartBox/PieChartBox";
// import TopBox from "../../components/topBox/TopBox";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  barChartBoxRevenue,
  barChartBoxVisit,
  // chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../data";
import "../Design/Home.scss";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/homepage", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        if (response.status === 200) {
          toast.success(response.data.message, { theme: "dark" });
        }
      } catch (error:any) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Unauthenticated token / Session not found");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
        navigate("/login"); // Use navigate for redirection
      }
    };

    if (localStorage.getItem("jwt")) {
      fetchHomepageData();
    } else {
      navigate("/login"); // Use navigate for redirection
    }
  }, [navigate]);

  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      localStorage.removeItem("jwt");
      navigate("/login"); // Use navigate for redirection
    } catch (error:any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Unauthenticated token / Session not found");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
      navigate("/login"); // Use navigate for redirection
    }
  };
  return (
    <div className="home">
      {/* <div className="box box1">{<TopBox /> }</div> */}
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      {/* <div className="box box5">
        <ChartBox {...chartBoxConversion} />
      </div> */}
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
