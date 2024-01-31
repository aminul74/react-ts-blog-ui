import React, { useState } from "react";
import UserForm from "../components/UserForm";

const Signup: React.FC = () => {
  const [isSignup, setSignup] = useState<boolean>(true);
  return (
    <div>
      <div className="bg-gray-900 h-screen pt-2 pb-1">
        <UserForm isSignup={isSignup} isSignin={false} />
      </div>
    </div>
  );
};

export default Signup;