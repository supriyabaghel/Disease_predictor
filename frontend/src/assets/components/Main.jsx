import React from "react";
import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import DpWindow from "./DpWindow";

const Main = () => {
  const { currentUser } = useGlobalContext();

  if (!currentUser) {
    // Landing page for users not logged in
    return (
      <main className="flex items-center flex-col min-h-screen">
        <Hero />
        <Services />
        <About />
        <Modal />
      </main>
    );
  }

  // Dashboard window if logged in
  return (
    <main className="flex items-center flex-col min-h-screen pt-24">
      <DpWindow />
    </main>
  );
};

export default Main;
