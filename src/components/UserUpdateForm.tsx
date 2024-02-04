import React from "react";
import Button from "./Button";
import InputField from "./InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../utility/userApi";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contextApi/useAuth";

interface UpdatePasswordDataType {
  old_password: string;
  new_password: string;
  confirm_password: string;
  token?: string | null;
}

const schema = yup.object().shape({
  old_password: yup.string().required("Old Password is required"),
  new_password: yup.string().required("New Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const UpdatePassword: React.FC<UpdatePasswordDataType> = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordDataType>({
    resolver: yupResolver(schema),
  });

  const { mutate: updataMutate } = useMutation({
    mutationKey: ["updatePass", user?.id],
    mutationFn: async (data: UpdatePasswordDataType) =>
      api.updatePasswordFetch(data),
  });
  const onSubmit: SubmitHandler<UpdatePasswordDataType> = (data) => {
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
            <p className="text-red-500">{errors.confirm_password?.message}</p>
          </div>

          <Button type="submit">{"Update"}</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
