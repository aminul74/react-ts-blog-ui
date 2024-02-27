import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      role="footer"
      className="bg-indigo-900 fixed bottom-0 left-0 w-full h-20"
    >
      <div className="w-full max-w-screen-xl mx-auto p-2 md:py-4">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-300 mt-5">
          © 2023 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
