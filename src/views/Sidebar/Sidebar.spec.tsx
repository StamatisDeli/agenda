import * as React from "react";
import { render, waitFor, cleanup } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import request from "../../services/request";

import Sidebar from "./Sidebar";
import { usersResponseFactory } from "../../utils/factories/users";

const renderAgenda = () => render(<Sidebar />);

describe("<Sidebar />", () => {
  let mock: MockAdapter;

  beforeEach(async () => {
    mock = new MockAdapter(request, { onNoMatch: "throwException" });
  });

  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it("should render", () => {
    const { getByTestId } = renderAgenda();

    expect(getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should render a list of users", async () => {
    const data = usersResponseFactory(5);

    mock.onGet(`/users`).reply(200, data);
    const { getByText } = renderAgenda();

    await waitFor(() => {
      expect(getByText(data[0]?.name)).toBeInTheDocument();
      expect(getByText(data[1]?.name)).toBeInTheDocument();
    });
  });

  it("should render a", async () => {
    const data = usersResponseFactory(0);

    mock.onGet(`/users`).reply(200, data);
    const { getByText } = renderAgenda();

    await waitFor(() => {
      expect(getByText("No users data")).toBeInTheDocument();
    });
  });
});
