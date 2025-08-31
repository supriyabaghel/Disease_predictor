import "./App.css";  // ✅ match the actual filename (lowercase)
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Footer from "./assets/components/Footer";
import Dashboard from "./assets/components/Dashboard";
import ContactDoctor from "./assets/components/ContactDoctor";
import Modal from "./assets/components/Modal";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactdoctor" element={<ContactDoctor />} />
      </Routes>

      <Footer />
      <Modal />
    </BrowserRouter>
  );
}

export default App;
