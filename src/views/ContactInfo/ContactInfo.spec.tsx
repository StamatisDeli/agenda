import * as React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import ContactInfo from "./ContactInfo";

import { userFactory } from "../../utils/factories/users";

const renderContactInfo = () => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter initialEntries={[`/:id`]}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* <Route path="/" element={<Agenda />}> */}
          <Route path="/:id" element={<ContactInfo />} />
          {/* </Route> */}
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("<ContactInfo />", () => {
  let mock: MockAdapter;

  beforeEach(async () => {
    mock = new MockAdapter(axios, { onNoMatch: "throwException" });
  });

  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it("should render", () => {
    const { getByTestId } = renderContactInfo();

    expect(getByTestId("contact-info")).toBeInTheDocument();
  });

  it("should render the contact info of given user", async () => {
    const user = userFactory();
    mock = new MockAdapter(axios);
    console.log(user);

    mock.onGet(`/users/${user.id}`).reply(200, { user });
    const { getByText } = renderContactInfo();

    // axios.get(`/users/${user.id}`).then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // });

    await waitFor(() => {
      expect(getByText(user.name)).toBeInTheDocument();
      expect(getByText(user.address)).toBeInTheDocument();
    });
  });
});
