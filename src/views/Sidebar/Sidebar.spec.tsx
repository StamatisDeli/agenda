import * as React from "react";
import { render, fireEvent, waitFor, cleanup } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Sidebar from "./Sidebar";
import { usersResponseFactory } from "../../utils/factories/users";

const renderSidebar = () => render(<Sidebar />);

describe("<Sidebar />", () => {
  let mock: MockAdapter;

  beforeEach(async () => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it("should render", () => {
    const { getByTestId } = renderSidebar();

    expect(getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should render a list of users", () => {
    const data = usersResponseFactory(5);
    console.log(data.data[0]);
    mock = new MockAdapter(axios);

    mock.onGet("/users").reply(200, { data });
    const { getByText } = renderSidebar();

    axios.get("/users").then(function (response) {
      console.log(JSON.stringify(response.data));
    });

    console.log(data.data[0]?.name);

    // await expect(getByText(data?.data[0]?.name)).toBeInTheDocument();
    // expect(getByText(data.data[1]?.name)).toBeInTheDocument();

    waitFor(async () => {
      expect(getByText(data.data[0]?.name)).toBeInTheDocument();
      expect(getByText(data.data[1]?.name)).toBeInTheDocument();
    });
  });
});
