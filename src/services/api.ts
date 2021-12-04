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
