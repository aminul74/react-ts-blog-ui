import React, { useState } from "react";
import UserForm from "../components/UserForm";

const Signup: React.FC = () => {
  const [isSignUp] = useState<boolean>(true);
  return (
    <div>
      <div className="bg-gray-900 h-screen pt-2 pb-1">
        <UserForm isSignUp={isSignUp} isSignIn={false} />
      </div>
    </div>
  );
};

export default Signup;
