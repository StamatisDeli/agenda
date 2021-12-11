import * as React from "react";
// import { render, waitFor, cleanup, screen } from "@testing-library/react";
import { render, waitFor, cleanup } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import MockAdapter from "axios-mock-adapter";
import { QueryClient, QueryClientProvider } from "react-query";
import { createMemoryHistory } from "history";

import ContactInfo from "./ContactInfo";
import request from "../../services/request";
import { userFactory } from "../../utils/factories/users";

import { MemoryRouter, Route, Routes, Router } from "react-router-dom";
import axios from "axios";

const renderContactInfo = () => render(<ContactInfo />);
const user = userFactory();
// const renderContactInfo = () => {
//   const queryClient = new QueryClient();

//   return render(
//     <MemoryRouter initialEntries={[`/${user.id}`]}>
//       <QueryClientProvider client={queryClient}>
//         <Routes>
//           <Route path={`/:id`} element={<ContactInfo />} />
//         </Routes>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );
// };

describe("<ContactInfo />", () => {
  let mock: MockAdapter;

  beforeEach(async () => {
    mock = new MockAdapter(request, { onNoMatch: "throwException" });
  });

  afterEach(() => {
    cleanup();
    mock.restore();
  });

  it("should render", () => {
    const { getByTestId } = renderContactInfo();

    expect(getByTestId("contact-info")).toBeInTheDocument();
    expect(window.location.pathname).toBe(`/${user.id}`);
  });

  it("should render the contact info of given user", async () => {
    mock.onGet(`/users/${user.id}`).reply(200, user);
    console.log(user);
    const { getByText, getByLabelText, debug } = renderContactInfo();
    // const name = getByLabelText("Name");

    await waitFor(() => {
      debug();
      // expect(name).toBe(user.name);
      // expect(getByText(user.name)).toBeInTheDocument();
      // expect(getByText(user.address)).toBeInTheDocument();
    });
  });
});
