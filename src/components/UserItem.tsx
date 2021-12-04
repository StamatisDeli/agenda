import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { UserType } from "../types";

interface Props {
  user: UserType;
}

export default function UserItem({ user }: Props): JSX.Element {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);
  const { pathname } = useLocation();
  const id = pathname.split("/")[1];
  const isCurrent = user.id === id;

  return (
    <NavLink
      data-testid={user.id}
      onClick={() => setIsSelected(!isSelected)}
      to={`/${user.id}`}
      key={user.id}
      className={`${
        isCurrent && "bg-blue-500"
      }  py-2 px-4 flex cursor-pointer items-center relative flex-shrink-0 flex-grow-0 ${
        !isSelected && "hover:bg-gray-300"
      }`}
    >
      <img
        alt={user.name}
        className="rounded-full bg-gray-500 w-14 h-14 mr-2"
        src={user.photo}
      />
      <div className="text-left hidden md:block">
        <p className="font-semibold">{user.name}</p>
        <p className="text-xs text-gray-400">{user.email}</p>
      </div>
    </NavLink>
  );
}
