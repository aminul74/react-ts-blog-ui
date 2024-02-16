import React from "react";
import { UseFormRegister } from "react-hook-form";

type InpuFieldProps = {
  label: string;
  id: string;
  name: string;
  type: "text" | "password" | "email" | "number";
  autoComplete: string;
  placeholder: string;
  required: boolean;
  // eslint-disable-next-line
  register: UseFormRegister<any>;
  defaultValue?: string;
};

const InputField: React.FC<InpuFieldProps> = ({
  label,
  id,
  name,
  type,
  autoComplete,
  placeholder,
  required,
  register,
  defaultValue,
}) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-white pb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        {...register(name, { required })}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 bg-white"
      />
    </div>
  );
};

export default InputField;
