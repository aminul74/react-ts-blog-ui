import React, { useState } from "react";
import UserForm from "../components/UserForm";
import api, { SignInProps } from "../utility/userApis";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/UseAuthContext";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";

type SignUpError  = {
  response: {
    data: {
      errMessage: string;
    }[];
  };
};

const Signup: React.FC = () => {
  const [isSignUp] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, getUser } = useAuth();

  const { mutate: signUpMutate } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data: SignInProps) => api.signUpFetch(data),
    onError: (error: SignUpError ) => {
      setErrorMessage(error.response?.data[0].errMessage);
    },
    onSuccess: async (data) => {
      const { token } = data[0];
      const userInfo = await getUser(token);
      const user = userInfo.data[0];
      login(token, user);
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<SignInProps> = (data) => {
    signUpMutate(data);
  };
  return (
    <div>
      <div className="bg-gray-900 h-screen pt-2 pb-1">
        <UserForm
          isSignUp={isSignUp}
          isSignIn={false}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Signup;
