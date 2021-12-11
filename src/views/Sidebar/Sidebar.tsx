import React from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

import { UserType } from "types";
import Loader from "components/Loader";
import * as api from "services/api";
import UserItem from "./UserItem";

export default function Sidebar(): JSX.Element {
  const isFirstRender = React.useRef<boolean>(true);
  const selectedRef = React.useRef<HTMLAnchorElement>();
  const { data, isLoading, isSuccess, error } = useQuery(
    "users",
    api.getUsers,
    {
      onError: () => {
        toast.error("Failed to get users data");
      },
    }
  );

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

  const users = data ?? [];
  const hasResults = users.length > 0;

  return (
    <aside
      data-testid="sidebar"
      className="flex flex-col h-full text-center flex-shrink-0 w-24 md:w-1/2 bg-white border-r border-gray-200 overflow-y-auto"
    >
      {isLoading && <Loader />}

      {isSuccess &&
        hasResults &&
        users.map((user: UserType) => (
          <UserItem key={user.id} user={user} onScrollTo={handleScroll} />
        ))}

      {error && (
        <p className="flex flex-col p-5 h-full justify-center text-center text-red-400 flex-shrink-0 bg-white overflow-y-auto">
          Error loading users
        </p>
      )}

      {!hasResults && !isLoading && (
        <p className="flex flex-col p-5 h-full justify-center text-center flex-shrink-0 bg-white overflow-y-auto">
          No users data
        </p>
      )}
    </aside>
  );
}
