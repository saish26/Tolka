import { APILoginUser } from "@/apis/auth/auth";
import CommonButton from "@/components/common/form/CommonButton";
import CommonTextField from "@/components/common/form/CommonTextField";
// import SmeNavBar from "@/components/partials/SmeNavBar";
import useIsAuth from "@/hooks/useIsAuth";
import { authDTO } from "@/utils/formatters/authDTO";
import notify from "@/utils/helpers/notify";
import { ILoginData, ILoginResponse } from "@/utils/interface/auth";
import { Button, Checkbox } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const isAuth = useIsAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    try {
      setLoading(true);
      const formattedData = authDTO.login({ ...data, rememberMe: remember });
      const response: any = await APILoginUser(formattedData);
      const responseData: ILoginResponse = response?.data;
      // localStorage.setItem("data", JSON.stringify(responseData));
      localStorage.setItem("token", responseData?.accessToken);
      // localStorage.setItem("refreshToken", response?.refreshToken);
      router.push("/dashboard");
      notify("success", response?.message);

      reset();
    } catch (error: any) {
      setLoading(false);
      notify("error", error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.back();
    }
  }, [isAuth]);

  return (
    <main className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-[450px] card-layout p-5 lg:p-10 bg-white space-y-6 ">
        <h1 className="text-title-active font-medium text-2xl lg:text-3xl pb-5">
          Sign In
        </h1>
        <span className="text-lg">Login to your existing account</span>
        <form className="pt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            rules={{
              required: "required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
            control={control}
            render={({ field }) => (
              <CommonTextField
                {...field}
                placeholder="Email"
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            rules={{
              required: "required",
            }}
            control={control}
            render={({ field }) => (
              <CommonTextField
                {...field}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
              />
            )}
          />

          <div className="flex justify-between items-center pt-5 text-sm hover:cursor-pointer sm:text-lg">
            <div className="flex gap-2 items-center">
              <Checkbox
                size="xs"
                color="green"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </div>
            {/* <div>
              <Link href="">Forgot password</Link>
            </div> */}
          </div>

          <div className="pt-10">
            <Button
              className="bg-[#164E99] hover:bg-[#164E99] h-14 text-lg w-full "
              type="submit"
              size="xl"
              loading={loading}
            >
              Sign in
            </Button>
          </div>
          {/* <div className="flex w-full justify-end py-2">
            <span>
              Don&apos;t have an account? <Link href="/login">Sign Up</Link>
            </span>
          </div> */}
        </form>
      </div>
    </main>
  );
};

// Login.Layout = SmeNavBar;
export default Login;
