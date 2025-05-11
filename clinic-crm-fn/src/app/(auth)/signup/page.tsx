"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { signupSchema } from "@/lib/schema-embedded";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  isProfileCompleted: string;
};

function SignupPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          name: values.name,
          password: values.password,
          email: values.email,
          phoneNumber: values.phoneNumber,
        }
      );

      const token = response.data.token;
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      console.log(decoded);
      const isProfileCompleted = decoded.isProfileCompleted;

      // Set token in cookies
      Cookies.set("authToken", token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      Cookies.set("isProfileCompleted", isProfileCompleted, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      toast({
        title: "Signup Successful",
        description: "Your account has been created successfully!",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
        },
      });
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logo */}
      {/*<Image
        src={'/primewise-consulting.png'}
        alt='Primewise Consulting'
        width={100}
        height={100}
        className='relative top-2 left-2'
      />*/}

      <div className="flex gap-6 min-h-screen justify-evenly">
        <div className="hidden md:block my-auto">
          <Image
            src={"/online-doctor.svg"}
            alt="Online Doctor"
            width={600}
            height={600}
            draggable="false"
          />
        </div>

        <div className="flex justify-start items-center p-2">
          <div className="max-w-md w-full mx-auto p-4 sm:p-6 relative bg-white flex flex-col gap-4 border-2 border-[#ffffff] rounded-3xl dark:border-slate-50">
            <h1 className="text-2xl sm:text-4xl text-center font-semibold text-bluecolor">
              Create an Account
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name"
                          className="bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Email"
                          className="bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          {...field}
                          placeholder="Phone Number"
                          className="bg-white text-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Password</FormLabel>
                      <div className="relative -mb-2">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-white text-black"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute top-2 right-2 text-black"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-black text-sm">
                  Must be at Least 8 characters.
                </p>

                {loading ? (
                  <Button disabled className="w-full h-10 bg-bluecolor">
                    <Loader2 className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full h-10 bg-bluecolor text-white hover:bg-blue-900 active:translate-y-1"
                  >
                    Sign Up
                  </Button>
                )}

                <div className="text-center">
                  <Label className="text-md text-black">
                    Already have an account?{" "}
                  </Label>
                  <Link href={"/login"}>
                    <Button variant="link" className="text-black">
                      Login
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignupPage;
