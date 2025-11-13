import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-all duration-300">
      <Navbar theme={theme} setTheme={setTheme} />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            zIndex: 999999,
          },
        }}
      />

      <main className="flex-1">
        <Outlet context={{ theme, setTheme }} />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
