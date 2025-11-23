import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../Lib/validationSchemas/AuthSchema";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { loginUser } from "../../../Services/authServices";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { userContext } from "../../../Components/Context/UserContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useContext(userContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    try {
      const { data } = await loginUser(formData);
      console.log(data);
      toast.success(data.message);
      localStorage.setItem("userToken", data?.token);
      setToken(data?.token);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }

  return (
    <>
    <title>Sign In | Social App</title>
      <form
        className="w-full max-w-4xl space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-header space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Nexify 🚀</h1>
          <p className="text-xl">Open your account and start connecting...</p>
        </div>
        <div className="space-y-4 ">
          <Input
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            isRequired
            type="email"
            label="email"
            {...register("email")}
          />
          <Input
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            isRequired
            type={showPassword ? "text" : "password"}
            label="password"
            endContent={
              showPassword ? (
                <IoEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-2xl text-default-400 "
                />
              ) : (
                <IoEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-2xl text-default-400"
                />
              )
            }
            {...register("password")}
          />
        </div>
        <div className="flex justify-between items-center">
          <Button type="submit" isLoading={isSubmitting} color="secondary">
            Submit
          </Button>
          <span>
            if you don't have an account?
            <Link className="font-bold ms-1" to="/register">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default Login;
