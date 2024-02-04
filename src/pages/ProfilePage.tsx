import React from "react";
import UserUpdatePasswordForm from "../components/UserUpdateForm";

const UserProfile: React.FC = () => {
  return (
    <div className="bg-gray-900 h-screen p-2">
      <div className="p-4 shadow bg-gray-800 mx-auto mt-24 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first md:mt-0">
            <div>
              {/* <p className="text-gray-400">Status:</p> */}
              <p className="text-green-500">Active</p>
            </div>
          </div>
          <div className="relative">
            <div className=" bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 flex items-center justify-center text-indigo-500"></div>
          </div>
          <div className="space-x-8 flex justify-between md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Delete Account
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-2">
          <div className="bg-slate-900 p-4 rounded-md">
            <UserUpdatePasswordForm
              old_password=""
              new_password=""
              confirm_password=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
