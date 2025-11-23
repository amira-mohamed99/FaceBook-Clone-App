import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Select, SelectItem } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { regSchema } from "../../../Lib/validationSchemas/AuthSchema.js";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { registerUser } from "../../../Services/authServices.js";
import { toast } from "react-toastify";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(regSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
  });

  async function onSubmit(data) {
    console.log(data);

    try {
      const response = await registerUser(data);
      console.log(response);
      toast.success(response.data.message);
      navigate("/login")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }

  return (
    <>
    <title>Sign Up | Social App</title>
      <form
        className="w-full max-w-4xl space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-header space-y-4">
          <h1 className="text-4xl font-bold">Join Nexify Today 🚀</h1>
          <p className="text-xl">
            Create your free account and start connecting...
          </p>
        </div>
        <div className="space-y-4 ">
          <Input
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            isRequired
            type="text"
            label="name"
            {...register("name")}
          />
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
          <Input
            isInvalid={Boolean(errors.rePassword)}
            errorMessage={errors.rePassword?.message}
            isRequired
            type={showRepassword ? "text" : "password"}
            label="repassword"
            endContent={
              showRepassword ? (
                <IoEye
                  onClick={() => setShowRepassword(!showRepassword)}
                  className="text-2xl text-default-400 "
                />
              ) : (
                <IoEyeOff
                  onClick={() => setShowRepassword(!showRepassword)}
                  className="text-2xl text-default-400"
                />
              )
            }
            {...register("rePassword")}
          />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              isInvalid={Boolean(errors.dateOfBirth)}
              errorMessage={errors.dateOfBirth?.message}
              isRequired
              type="date"
              label="Birth date"
              {...register("dateOfBirth")}
            />
            <Select
              isInvalid={Boolean(errors.gender)}
              errorMessage={errors.gender?.message}
              isRequired
              label="Select your gender"
              {...register("gender")}
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">female</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Button type="submit" isLoading={isSubmitting} color="secondary">
            Submit
          </Button>
          <span>
            Already have an account?
            <Link className="font-bold ms-1" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}

export default Register;
