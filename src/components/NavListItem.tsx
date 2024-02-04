import React from "react";
import { NavLink, useMatch } from "react-router-dom";

type ListItemProps = {
  to: string;
  children: React.ReactNode;
};

const ListItem: React.FC<ListItemProps> = ({ to, children }) => {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      className={`flex py-2 font-medium text-xl text-white hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex ${
        match ? "underline" : ""
      }`}
    >
      {children}
    </NavLink>
  );
};

export default ListItem;
