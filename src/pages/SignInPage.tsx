import React, { useState } from "react";
import UserForm from "../components/UserForm";

const SignIn: React.FC = () => {
  const [isSignin, setSignin] = useState<boolean>(true);
  return (
    <div>
      <div className="bg-gray-900 h-screen">
        <UserForm isSignin={isSignin} isSignup={false} />
      </div>
    </div>
  );
};

export default SignIn;
