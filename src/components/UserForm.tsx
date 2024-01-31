import React from "react";
import InputField from "./InputField";
import Button from "./Button";

type UserFormProps = {
  isSignin: boolean;
  isSignup: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ isSignin, isSignup }) => {
  return (
    <>
      <div className="flex items-center justify-center h-full min-w-screen">
        <div className="sm:w-full sm:max-w-sm bg-gray-800 px-10 py-4 m-10 rounded">
          <form className="space-y-6">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              {isSignin
                ? "Sign in to your account"
                : "Sign up in to your account"}
            </h2>
            {(isSignin || isSignup) && (
              <div className="mt-2">
                <InputField
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="current-username"
                  placeholder="username"
                  label="Username"
                  required={true}
                />
              </div>
            )}
            {isSignup && (
              <div className="mt-2">
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  placeholder="email"
                  label="Email"
                  required={true}
                />
              </div>
            )}

            {(isSignin || isSignup) && (
              <div className="mt-2">
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="password"
                  label="Password"
                  required={true}
                />
              </div>
            )}
            {isSignup && (
              <div className="mt-2">
                <InputField
                  id="confirm-password"
                  name="confirm-password"
                  type="confirm-password"
                  autoComplete="current-confirm-password"
                  placeholder="confirm-password"
                  label="Confirm-Password"
                  required={true}
                />
              </div>
            )}

            <div>
              <Button type="submit">{isSignin ? "Sign In" : "Sign Up"}</Button>
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
