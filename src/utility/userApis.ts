import axios from "axios";

const BASE_URL_SIGNIN = "http://localhost:4001/api/v1/auth/login";
const BASE_URL_SIGNUP = "http://localhost:4001/api/v1/auth/register";
// const BASE_URL_UPDATE = "http://localhost:4001/api/v1/users/:uuId";

 export type SignInSignUpResponse = {
  token: string;
};
type SignInSignUpRequest = {
  username: string;
  email: string;
  password: string;
};

export type updateApiType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
  token?: string | null;
  userId:string
};

const signInFetch = async ({
  username,
  password,
}: SignInSignUpRequest): Promise<SignInSignUpResponse> => {
  // console.log("1")
  try {
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
    console.log("SignIn", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

const signUpFetch = async ({
  username,
  email,
  password,
}: SignInSignUpRequest): Promise<SignInSignUpResponse> => {
  // console.log("CALLED")
  try {
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
    console.log("SignUP", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

const updatePasswordFetch = async ({
  old_password,
  new_password,
  token,
  userId
}: updateApiType): Promise<boolean> => {
  console.log("DDDDDDDDD", userId);
const BASE_URL_UPDATE = `http://localhost:4001/api/v1/users/${userId}`;

  try {
    const response = await axios.put(
      BASE_URL_UPDATE,
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
    console.log("RES", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching", error);
    throw error;
  }
};

export default { signUpFetch, signInFetch, updatePasswordFetch };
