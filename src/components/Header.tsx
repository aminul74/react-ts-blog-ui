import React, { useState } from "react";
import ListItem from "./NavListItem";
import DropDown from "../components/DropDown";
import { useAuth } from "../contextApi/useAuth";

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <header
      className={`flex items-center bg-indigo-900 dark:bg-dark fixed top-0 left-0 w-full z-50`}
    >
      <div className="container mx-auto px-5">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-28 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src="src/assets/logo.png"
                alt="logo"
                className="hidden dark:block"
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <div className="block lg:flex text-xl text-white">
                  <ListItem to="/">Home</ListItem>
                  <ListItem to="/blogs">Blog</ListItem>
                  <ListItem to="/about">About</ListItem>
                </div>
              </nav>
            </div>
            {!token && (
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                <ListItem to="/signin">Sign In</ListItem>
                <ListItem to="/signup">Sign Up</ListItem>
              </div>
            )}
            {token && <DropDown />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
