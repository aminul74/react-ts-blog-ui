import React from "react";

type InpuFieldProps = {
    label: string
    id: string
    name: string
    type: string
    autoComplete: string
    placeholder: string
    required: boolean
}


const InputField: React.FC<InpuFieldProps> = (InputProps) => {
    return (
        <div className="mb-2">
            <label className="block text-sm font-medium text-white pb-1">{InputProps.label}</label>
            <input
                id={InputProps.id}
                type={InputProps.type}
                autoComplete={InputProps.autoComplete}
                placeholder={InputProps.placeholder}
                required={InputProps.required}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
        </div>
    );
};

export default InputField;
