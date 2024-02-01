import * as yup from "yup";

export const signUpSchema: yup.ObjectSchema<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }> = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[^\s]+$/, "Spaces are not allowed in the username"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  
  export const signInSchema: yup.ObjectSchema<{
    username: string;
    password: string;
  }> = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[^\s]+$/, "Spaces are not allowed in the username"),
    password: yup.string().required("Password is required"),
  });
