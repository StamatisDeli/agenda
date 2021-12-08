import React from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

import { UserType } from "../../types";
import Loader from "../../components/Loader";
import * as api from "../../services/api";
import UserItem from "components/UserItem";

export default function Sidebar(): JSX.Element {
  const isFirstRender = React.useRef<boolean>(true);
  const selectedRef = React.useRef<HTMLAnchorElement>();
  const {
    data: users,
    isFetching,
    error,
  } = useQuery("users,", api.getUsers, {
    onError: () => {
      toast.error("Failed to get users data");
    },
  });

  const handleScroll = (el: HTMLAnchorElement) => {
    selectedRef.current = el;

    el &&
      isFirstRender.current && //only run the once
      el.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });

    isFirstRender.current = false;
  };

  return (
    <aside
      data-testid="sidebar"
      className="flex flex-col h-full flex-shrink-0 w-24 md:w-1/2 bg-white border-r border-gray-200 overflow-y-auto"
    >
      {isFetching && !error ? (
        <Loader />
      ) : error ? (
        <p>Error loading users</p>
      ) : users ? (
        users.map((user: UserType) => (
          <UserItem key={user.id} user={user} onScrollTo={handleScroll} />
        ))
      ) : (
        <p>No users data</p>
      )}
    </aside>
  );
}
