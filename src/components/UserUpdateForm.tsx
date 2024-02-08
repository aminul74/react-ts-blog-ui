import React from "react";
import Button from "./Button";
import InputField from "./InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import api, { ApiDataType } from "../utility/userApis";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contextApi/UseAuthContext";
import { useNavigate } from "react-router-dom";
import { schema } from "../utility/userUpdateFormValidation";

// interface UpdatePasswordDataType {
//   old_password: string;
//   new_password: string;
//   confirmPassword: string;
// }
const UpdatePassword: React.FC<ApiDataType> = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiDataType>({
    resolver: yupResolver(schema) as never,
  });

  const { mutate: updataMutate } = useMutation({
    mutationKey: ["updatePass", user?.id, token || ""],
    mutationFn: async (data: ApiDataType) =>
      api.updatePasswordFetch({
        old_password: data.old_password,
        new_password: data.new_password,
        confirmPassword: data.confirmPassword,
        userId: user?.id ?? "",
        token: token,
      }),
    onSuccess: async () => {
      logout();
      navigate("/signin");
    },
  });
  const onSubmit: SubmitHandler<ApiDataType> = (data) => {
    console.log("ONSUBMIT", data);
    updataMutate(data);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col lg:px-8">
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold text-white text-xl">Update Your Password</h2>

          <div className="mt-1">
            <InputField
              id="oldPassword"
              name="old_password"
              type="password"
              autoComplete="current-password"
              placeholder="old-password"
              required={true}
              label="Old Password"
              register={register}
            />
            <p className="text-red-500">{errors.old_password?.message}</p>
          </div>

          <div className="mt-1">
            <InputField
              id="newPassword"
              name="new_password"
              type="password"
              autoComplete="new-password"
              placeholder="new-password"
              required={true}
              label="New Password"
              register={register}
            />
            <p className="text-red-500">{errors.new_password?.message}</p>
          </div>

          <div className="mt-1">
            <InputField
              id="confirmPassword"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              placeholder="confirm-password"
              required={true}
              label="Confirm Password"
              register={register}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>

          <Button type="submit">{"Update"}</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
