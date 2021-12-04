import React from "react";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/solid";

import { UserType } from "../types";
import * as api from "../services/api";
import Sidebar from "./Sidebar";
import Content from "views/ContactInfo";
import Layout from "../components/Layout";

export default function Agenda(): JSX.Element {
  return (
    <article className="flex flex-col text-center justify-center items-center p-5 h-full flex-shrink-0 w-96 bg-white overflow-y-auto">
      <UserGroupIcon className="text-gray-200 w-1/2" />
      <p className="text-gray-500 w-1/2">Select a user to edit</p>
    </article>
  );
}
