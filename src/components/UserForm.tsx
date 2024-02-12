import React, { useEffect } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { ApiDataType } from "../utility/userApis";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../utility/userFormValidation";
import { signInSchema } from "../utility/userFormValidation";

type UserFormProps = {
  isSignIn: boolean;
  isSignUp: boolean;
  errorMessage: string | null;
  onSubmit: SubmitHandler<ApiDataType>;
  setErrorMessage: (erorMessage: string | null) => void;
};

const UserForm: React.FC<UserFormProps> = ({
  isSignIn,
  isSignUp,
  onSubmit,
  errorMessage,
  setErrorMessage,
}) => {
  const schema = isSignIn ? signInSchema : signUpSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiDataType>({
    resolver: yupResolver(schema) as never,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage, setErrorMessage]);
  return (
    <>
      <div className="flex items-center justify-center h-full min-w-screen">
        <div className="sm:w-full sm:max-w-sm bg-gray-800 px-10 py-4 m-10 rounded">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              {isSignIn
                ? "Sign in to your account"
                : "Sign up in to your account"}
            </h2>
            <p className="text-red-500">{errorMessage}</p>
            {(isSignIn || isSignUp) && (
              <div className="mt-2">
                <InputField
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="current-username"
                  placeholder="username"
                  label="Username"
                  required={true}
                  register={register}
                />
                <p className="text-red-500">{errors.username?.message}</p>
              </div>
            )}
            {isSignUp && (
              <div className="mt-2">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  placeholder="email"
                  label="Email"
                  required={true}
                  register={register}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
            )}

            {(isSignIn || isSignUp) && (
              <div className="mt-2">
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="password"
                  label="Password"
                  required={true}
                  register={register}
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
            )}
            {isSignUp && (
              <div className="mt-2">
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-confirm-password"
                  placeholder="confirm-password"
                  label="Confirm-Password"
                  required={true}
                  register={register}
                />
                <p className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </Button>
            </div>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500">
            Not a member?
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
