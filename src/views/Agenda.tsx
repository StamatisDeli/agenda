import React from "react";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import { UserType } from "../types";
import * as api from "../services/api";
import Sidebar from "./Sidebar";
import Content from "views/ContactInfo";
import Layout from "../components/Layout";

export default function Agenda(): JSX.Element {
  return (
    <Layout>
      <div className="overflow-hidden border border-gray-200 flex flex-row max-w-4xl mx-auto shadow-sm">
        <Sidebar />
        <div className="w-96 bg-white">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
