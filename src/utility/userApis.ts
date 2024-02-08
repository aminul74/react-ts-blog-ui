import axios from "axios";

const BASE_URL_SIGNIN = "http://localhost:4001/api/v1/auth/login";
const BASE_URL_SIGNUP = "http://localhost:4001/api/v1/auth/register";
const BASE_URL_COMMON = "http://localhost:4001/api/v1/users/";

export interface ApiDataType {
  username?: string;
  email?: string;
  password?: string;
  old_password?: string;
  new_password?: string;
  confirmPassword?: string;
  token?: string | null;
  userId?: string | null;
}

const signInFetch = async ({
  username,
  password,
}: ApiDataType): Promise<ApiDataType> => {
  const response = await axios.post(
    BASE_URL_SIGNIN,
    {
      username,
      password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const signUpFetch = async ({
  username,
  email,
  password,
}: ApiDataType): Promise<ApiDataType> => {
  const response = await axios.post(
    BASE_URL_SIGNUP,
    {
      username,
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const updatePasswordFetch = async ({
  old_password,
  new_password,
  token,
  userId,
}: ApiDataType): Promise<void> => {

  const response = await axios.put(
    `${BASE_URL_COMMON}${userId}`,
    {
      old_password,
      new_password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

const deleteUser = async ({ userId, token }: ApiDataType): Promise<void> => {
  const response = await axios.delete(
    `${BASE_URL_COMMON}${userId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  console.log("INSIDE",response.data)
  return response.data;
};

export default { signUpFetch, signInFetch, updatePasswordFetch, deleteUser };
