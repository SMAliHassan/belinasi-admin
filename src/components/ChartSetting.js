import React, { useState } from "react";

const ChartSetting = ({ initialDuration, initialType, onSubmit }) => {
  const [duration, setDuration] = useState(initialDuration);
  const [type, setType] = useState(initialType);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(type, duration);
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "22rem",
      }}
    >
      <div>
        <label htmlFor="duration" style={{ paddingRight: "0.5rem" }}>
          Duration:
        </label>
        <select
          name="duration"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        >
          <option value="7">1 Week</option>
          <option value="14">2 Weeks</option>
          <option value="30">1 Month</option>
          <option value="60">2 Months</option>
          <option value="90">3 Months</option>
          <option value="180">6 Months</option>
          <option value="365">1 Year</option>
          <option value={365 * 2}>2 Years</option>
        </select>
      </div>

      <div>
        <label htmlFor="duration-type" style={{ paddingRight: "0.5rem" }}>
          Type:
        </label>
        <select
          name="duration-type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>
      <button
        type="submit"
        style={{
          cursor: "pointer",
          color: "#fff",
          background: "var(--secondary-color)",
          border: "none",
        }}
      >
        Update
      </button>
    </form>
  );
};

export default ChartSetting;
