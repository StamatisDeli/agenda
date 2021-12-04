// GET ALL
// https://my-json-server.typicode.com/tsevdos/epignosis-users/users
// GET ONE
// https://my-json-server.typicode.com/tsevdos/epignosis-users/users/5c093af1c6ee9117a581c7d6
// PUT
// https://my-json-server.typicode.com/tsevdos/epignosis-users/users/5c093af1c6ee9117a581c7d6

import request from "./request";
import { UserType, FormType } from "../types";

export const getUsers = async () => {
  const { data } = await request.get("/users");

  return data;
};

export const getUser = async (id: string) => {
  const { data } = await request.get(`/users/${id}`);

  return data as UserType;
};

export const putUser = async (id: string, formData: FormType) => {
  const { data } = await request.put(`/users/${id}`, { formData });

  return data;
};
