import React from "react";
import { Menu, X } from "lucide-react";

const MobileMenu = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <>
      <button
        className="lg:hidden fixed z-10 top-4 left-4 p-2 rounded-md bg-white shadow-md text-gray-700"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
