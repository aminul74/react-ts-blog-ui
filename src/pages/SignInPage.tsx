import React, { useState } from "react";
import UserForm from "../components/UserForm";

const SignIn: React.FC = () => {
  const [isSignIn] = useState<boolean>(true);
  return (
    <div>
      <div className="bg-gray-900 h-screen">
        <UserForm isSignIn={isSignIn} isSignUp={false} />
      </div>
    </div>
  );
};

export default SignIn;
