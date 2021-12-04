import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Layout from "../components/Layout";

export default function Agenda(): JSX.Element {
  return (
    <Layout>
      <div
        data-testid="agenda"
        className="mx-auto overflow-hidden border border-gray-200 flex flex-row w-full max-w-4xl shadow-sm"
      >
        <Sidebar />
        <div className="w-full md:w-1/2 bg-white">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
