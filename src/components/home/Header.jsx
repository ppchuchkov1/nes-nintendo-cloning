import React from "react";
import { Search, LogOut } from "lucide-react";

const Header = ({
  currentUser,
  handleLogout,
  signInWithGoogle,
  handleSearch,
}) => {
  return (
    <header className="bg-white shadow-sm p-4 gap-5 flex items-center justify-between">
      <div className="relative flex-1 max-w-xl ml-10 mr-10 lg:ml-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for game..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <button
                className="transition duration-150 ease-in-out cursor-pointer"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls="headlessui-menu-items-117"
              >
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {currentUser?.displayName?.substring(0, 2)?.toUpperCase()}
                </span>
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} className="mr-1" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              class="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
