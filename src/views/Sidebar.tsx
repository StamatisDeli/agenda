import React from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

import { UserType } from "../types";
import Loader from "../components/Loader";
import * as api from "../services/api";
import UserItem from "components/UserItem";

export default function Sidebar(): JSX.Element {
  const {
    data: users,
    isFetching,
    error,
  } = useQuery("users,", api.getUsers, {
    onError: () => {
      toast.error("Failed to get users data");
    },
  });

  return (
    <aside className="flex flex-col h-full flex-shrink-0 w-96 bg-white border-r border-gray-200 overflow-y-auto">
      {isFetching && !error ? (
        <Loader />
      ) : error ? (
        <p>Error loading users</p>
      ) : users ? (
        users.map((user: UserType) => <UserItem key={user.id} user={user} />)
      ) : (
        <p>No users data</p>
      )}
    </aside>
  );
}
