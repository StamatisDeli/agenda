import React from "react";
import { UserGroupIcon } from "@heroicons/react/solid";

export default function Agenda(): JSX.Element {
  return (
    <article className="flex flex-col text-center justify-center items-center p-5 h-full flex-shrink-0 w-full bg-white overflow-y-auto">
      <UserGroupIcon className="text-gray-200 w-1/2" />
      <p className="text-gray-500 ">Select a user to edit</p>
    </article>
  );
}
