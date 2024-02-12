import React, { useState } from "react";
import api, { ApiDataType } from "../utility/userApis";
import UserForm from "../components/UserForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextApi/UseAuthContext";
import { SubmitHandler } from "react-hook-form";

type SignInError  = {
  response: {
    data: {
      errMessage: string;
    }[];
  };
};

const SignIn: React.FC = () => {
  const [isSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, getUser } = useAuth();

  const { mutate: signInMutate } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: ApiDataType) => api.signInFetch(data),
    onError: (error: SignInError ) => {
      setErrorMessage(error.response?.data[0].errMessage);
    },
    onSuccess: async (data) => {
      setErrorMessage(null);
      const { token } = data[0];
      const userInfo = await getUser(token);
      const user = userInfo.data[0];
      login(token, user);
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<ApiDataType> = (data) => {
    signInMutate(data);
  };
  return (
    <div>
      <div className="bg-gray-900 h-screen">
        <UserForm
          isSignIn={isSignIn}
          isSignUp={false}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default SignIn;
