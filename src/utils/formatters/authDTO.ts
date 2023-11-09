import { ILoginData, ISignUpData } from "../interface/auth";

export const authDTO = {
  signup: (data: ISignUpData, userType: any) => {
    return {
      password: data?.password,
      fullName: data?.fullName,
      email: data?.email,
      userType: userType,
      contactNumber: "",
    };
  },
  login: (data: ILoginData) => {
    return {
      email: data?.email,
      password: data?.password,
      appId: "lang-inst-g",
    };
  },
};
