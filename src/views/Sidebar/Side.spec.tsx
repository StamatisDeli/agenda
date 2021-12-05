import * as React from "react";
import { render, fireEvent, waitFor, cleanup } from "../../utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import mockAxios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BASE_URL } from "../../services/request";

import Sidebar from "./Sidebar";
import Agenda from "../Agenda";
import Empty from "../Empty";
import ContactInfo from "../ContactInfo";
import { usersResponseFactory } from "../../utils/factories/users";
import * as api from "../../services/api";

const renderSidebar = () => render(<Sidebar />);

// const renderSidebar = () => {
//   const queryClient = new QueryClient();

//   return render(
//     <MemoryRouter>
//       <QueryClientProvider client={queryClient}>
//         <Routes>
//           <Route path="/" element={<Agenda />}>
//             <Route index element={<Empty />} />
//             <Route path="/:id" element={<ContactInfo />} />
//           </Route>
//         </Routes>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );
// };

const users = [
  {
    id: "f6e8c41e-9050-4957-bb25-58e654112a91",
    name: "Dortha",
    photo: "http://placeimg.com/640/480/people",
    company: "Product Brand Producer",
    email: "Mozell1@hotmail.com",
    phone: "627-496-4038 x13596",
    address: "Shakira Club",
  },
  {
    id: "2687ff51-9086-41c8-bd96-9195a10e3deb",
    name: "Elva",
    photo: "http://placeimg.com/640/480/people",
    company: "Internal Data Executive",
    email: "Monique_Waters8@hotmail.com",
    phone: "402-470-2080 x0563",
    address: "Block Prairie",
  },
  {
    id: "e7f0c751-09f2-4fd7-9aa7-b1468f834cee",
    name: "Casandra",
    photo: "http://placeimg.com/640/480/people",
    company: "Senior Division Coordinator",
    email: "Dorothea75@gmail.com",
    phone: "788.473.9060",
    address: "Jonatan Islands",
  },
  {
    id: "39f8005c-f656-46e2-84d9-e4a76dbe04c9",
    name: "Carlo",
    photo: "http://placeimg.com/640/480/people",
    company: "Regional Mobility Strategist",
    email: "Karine_Keeling38@yahoo.com",
    phone: "613.262.6320",
    address: "Nikolas Court",
  },
  {
    id: "46249c83-66bf-42b7-b77d-9c8a910b5a3a",
    name: "Jarrett",
    photo: "http://placeimg.com/640/480/people",
    company: "Forward Functionality Developer",
    email: "Serena.Schimmel95@hotmail.com",
    phone: "1-892-515-5113",
    address: "Rau Isle",
  },
];

describe("<Sidebar />", () => {
  beforeEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const { getByTestId } = renderSidebar();

    expect(getByTestId("sidebar")).toBeInTheDocument();
  });

  it("should render a list of users", async () => {
    // const mockGetUsers = (result: any) =>
    //   jest.spyOn(api, "getUsers").mockResolvedValue(result);

    const mock = jest.spyOn(api, "getUsers");
    mock.mockImplementation(() => Promise.resolve(users));

    const { queryByText } = renderSidebar();

    // jest.spyOn(api, "getUsers").mockResolvedValue(users);
    // mockGetUsers(users);

    // axios.get(`${BASE_URL}/users`).then(function (response) {
    //   console.log(JSON.stringify(response.data));
    // });

    // console.log(data.data[0]?.name);

    await waitFor(() => {
      expect(queryByText(users[0]?.name)).toBeInTheDocument();
      expect(queryByText(users[1]?.name)).toBeInTheDocument();
    });
  });
});
