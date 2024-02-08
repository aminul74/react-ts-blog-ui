import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contextApi/UseAuthContext";
import Button from "./Button";

type DropDownProps = {
  userLabel?: string;
  userEmail?: string;
};

const UserProfileDropdown: React.FC<DropDownProps> = () => {
  const { user, logout } = useAuth();
  const userEmail = user?.email || "";
  const userLabel = user?.username || "";
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      dropdownRef.current
        ? !dropdownRef.current.contains(event.target as Node) &&
          setDropdownOpen(false)
        : null;
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative mb-5" ref={dropdownRef}>
      <Button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-xl pe-5 ps-2 p-1 mt-2 rounded-md font-medium text-white hover:text-slate-300 md:me-0 transition-transform border border-gray-600 hover:bg-indigo-800 transform hover:scale-105 duration-300 ease-in-out"
        type="button"
        onClick={toggleDropdown}
      >
        <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-5">
          <svg
            className="absolute w-6 h-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            ></path>
          </svg>
        </div>
        <span className="top-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
        {userLabel}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </Button>

      <div
        id="dropdownAvatarName"
        className={`z-10 ${
          isDropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-full right-0 mt-1`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="font-medium">Wellcome!</div>
          <div className="truncate">{userEmail}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownAvatarNameButton"
        >
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              MyBlogs
            </Link>
          </li>
          <li>
            <Link
              to={"/profile"}
              onClick={() => setDropdownOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Profile
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <Button
            type="submit"
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-start"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
