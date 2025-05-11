import * as z from "zod";

const TIME_PATTERN = /^([0-1]?[0-9]|2[0-3]):00$/;

const URL_PATTERN = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.[a-z]{2,})(\/.*)?$/i;

// signup schema
export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d{10,}$/, "Phone number must contain only digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

// login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid Email!"),
  password: z.string().min(8, "Entered Wrong Password!"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(4, { message: "OTP must be 4 digits" })
    .regex(/^\d{4}$/, { message: "Must be a 4-digit number" }),
});

//reset password schema
export const resetSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmpassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  })
  .refine((data) => data.newPassword === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

// Forgot Password Schema
export const forgotSchema = z.object({
  email: z.string().nonempty("Enter the email").email("Invalid email"),
});
