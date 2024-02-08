"use client";
import React from "react";

const Dashboard = () => {
  const handlerLogout = async () => {
    const result = await fetch("/api/user/logOut", {
      method: "GET",
    });
    if (result.status === 200) {
      window.location.href = "/auth/login";
    }
  };
  return (
    <div>
      Dashboard
      <div>
        <button onClick={handlerLogout}>logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
