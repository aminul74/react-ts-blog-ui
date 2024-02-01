import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import api, { apiResponseType } from "../utility/userApi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../utility/userFormValidation";
import { signInSchema } from "../utility/userFormValidation";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type UserFormProps = {
  isSignIn: boolean;
  isSignUp: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ isSignIn, isSignUp }) => {
  const schema = isSignIn ? signInSchema : signUpSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as never,
  });

  const { mutate: signInMutate } = useMutation<
    apiResponseType,
    Error,
    FormData
  >({
    mutationKey: ["signIn"],
    mutationFn: async (data: FormData) => api.signInFetch(data),
    onError: (error: Error) => {
      console.error("Error during signInMutate:", error);
    },
  });

  const { mutate: signUpMutate } = useMutation<
    apiResponseType,
    Error,
    FormData
  >({
    mutationKey: ["signUp"],
    mutationFn: async (data: FormData) => api.signUpFetch(data),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isSignUp) {
      if (data.password !== data.confirmPassword) {
        return;
      }
      signUpMutate(data);
    } else {
      signInMutate(data);
    }
  };
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
              <Button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
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
