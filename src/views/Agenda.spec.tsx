import * as React from "react";
import { render, waitFor, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import request from "../services/request";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Agenda from "./Agenda";
import ContactInfo from "./ContactInfo";
import Empty from "./Empty";
import { usersResponseFactory } from "../utils/factories/users";

const renderAgenda = () => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Agenda />}>
            <Route index element={<Empty />} />
            <Route path="/:id" element={<ContactInfo />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("<Sidebar />", () => {
  let mock: MockAdapter;

  beforeEach(async () => {
    mock = new MockAdapter(request, { onNoMatch: "throwException" });
  });

  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it("should render Agenda", () => {
    const { getByTestId } = renderAgenda();

    expect(getByTestId("agenda")).toBeInTheDocument();
  });

  it("should render a list of users in Sidebar", async () => {
    const data = usersResponseFactory(5);
    const nameOne = data[0]?.name as string;
    const nameTwo = data[1]?.name as string;

    mock.onGet(`/users`).reply(200, data);
    const { getByText } = renderAgenda();

    await waitFor(() => {
      expect(getByText(nameOne)).toBeInTheDocument();
      expect(getByText(nameTwo)).toBeInTheDocument();
    });
  });

  it("should render 'Select a user to edit' on the right side", async () => {
    const data = usersResponseFactory(5);

    mock.onGet(`/users`).reply(200, data);
    const { getByText } = renderAgenda();

    await waitFor(() => {
      expect(getByText("Select a user to edit")).toBeInTheDocument();
    });
  });

  // No users data
  it("should render No users data if there is no users in endpoint", async () => {
    const data = usersResponseFactory(0);

    mock.onGet(`/users`).reply(200, data);
    const { getByText } = renderAgenda();

    await waitFor(() => {
      expect(getByText("No users data")).toBeInTheDocument();
    });
  });

  it("should render user info on the left when a user is clicked on the right", async () => {
    const data = usersResponseFactory(5);
    const user = data[0];
    console.log(user);

    window.HTMLElement.prototype.scrollIntoView = function () {};

    mock.onGet(`/users`).reply(200, data);
    mock.onGet(`/users/${user?.id}`).reply(200, user);

    const { getByText, getByLabelText } = renderAgenda();

    await waitFor(() => {
      expect(getByText("Select a user to edit")).toBeInTheDocument();
    });

    fireEvent.click(getByText(user?.name as string));

    await waitFor(() => {
      expect(getByLabelText("Name")).toBeInTheDocument();
      expect(getByLabelText("Name")).toHaveValue(user?.name);
    });
  });
});
