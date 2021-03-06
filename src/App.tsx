import React from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Agenda from "views/Agenda";
import ContactInfo from "views/ContactInfo";
import Empty from "views/Empty";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Agenda />}>
        <Route index element={<Empty />} />
        <Route path="/:id" element={<ContactInfo />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
