import React, { useState } from "react";
import ListItem from "./NavListItem";
import DropDown from "../components/DropDown";
import { useAuth } from "../contextApi/UseAuthContext";
import Button from "./Button";
import { Link } from "react-router-dom";
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
            <Link to="/" className="block w-full py-5">
              <img
                src="src/assets/logo.png"
                alt="logo"
                className="hidden dark:block"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <Button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                type="button"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </Button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-gray-700 px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <div className="block lg:flex text-xl text-white">
                  <ListItem to="/">Home</ListItem>
                  <ListItem to="/blogs">Blog</ListItem>
                  <ListItem to="/about">About</ListItem>
                </div>
                {!token && (
                  <div className="lg:hidden justify-center">
                    <ListItem to="/signin">Sign In</ListItem>
                    <ListItem to="/signup">Sign Up</ListItem>
                  </div>
                )}
                {token && (
                  <div className="lg:hidden justify-center">
                    <DropDown />
                  </div>
                )}
              </nav>
            </div>
            {!token && (
              <div className="hidden lg:flex justify-center">
                <ListItem to="/signin">Sign In</ListItem>
                <ListItem to="/signup">Sign Up</ListItem>
              </div>
            )}
            {token && (
              <div className="hidden lg:flex justify-center mt-2">
                <DropDown />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
