import * as z from "zod";

export const regSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(5, "Name must be atleast 5 characters")
      .max(15, "Name must be atleast 15 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),
      password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters") 
      .max(20, "Password must be at most 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),
    rePassword: z.string(),
    dateOfBirth: z.coerce.string().refine(
      (date) => {
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(date).getFullYear();
        const age = currentYear - birthYear;
        return age >= 18;
      },
      { message: "Age must be 18 y.o" }
    ),
    gender: z.string().nonempty("You must select your gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password is not matched",
  });
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Invalid password format"
    ),
});
