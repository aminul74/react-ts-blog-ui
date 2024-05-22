import * as yup from "yup";

export const schema = yup.object().shape({
  old_password: yup.string().required("Old Password is required"),
  new_password: yup.string().required("New Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
    .required("Confirm Password is required"),
});
