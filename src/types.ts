// import { AxiosResponse } from "axios";

// export type Response<T> = Promise<AxiosResponse<T>>;

export interface UserType {
  id: string;
  photo: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface FormType {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}
