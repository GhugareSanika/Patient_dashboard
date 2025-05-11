"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schema-embedded";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  isProfileCompleted: string;
};

function LoginPage() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    {
      /*Integrate login API*/
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
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

      route.push("/dashboard");

      toast({
        title: "Login Successfully",
        description: "You've loged in successfully!",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
        },
      });
    } catch (error) {
      console.log("Login Failed:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid Email or Password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* logo */}

      {/* <Image
    src={'/primewise-consulting.png'}
    alt='Primewise Consulting'
    width={100}
    height={100}
    className='relative top-2 left-2'
    /> */}

      <div className="flex gap-6 min-h-screen justify-evenly">
        <div className="hidden md:block my-auto">
          <Image
            src={"/online-doctor.svg"}
            alt="Online Doctor"
            width={600}
            height={600}
            className=""
          />
        </div>
        <div className="flex justify-start items-center my-auto outline-none">
          <div className="max-w-lg mx-auto p-12 relative bg-white flex flex-col gap-3 rounded-3xl dark:border-slate-50">
            <h1 className="sm:text-4xl text-2xl text-center font-semibold text-bluecolor">
              Welcome Back!
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Email"
                          className="bg-white outline-none text-black"
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
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
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
                          className="absolute top-2 right-2"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <Eye className="text-black" />
                          ) : (
                            <EyeOff className="text-black" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <Link href={"forgot-password"}>
                    <Button variant="link" className="text-black">
                      Forgot Password?
                    </Button>
                  </Link>
                </div>

                {loading ? (
                  <Button disabled className="w-full h-10 bg-bluecolor">
                    <Loader2 className="animate-spin" />
                  </Button>
                ) : (
                  <Button className="w-full active:translate-y-1 h-10 bg-bluecolor text-white hover:bg-blue-900">
                    Log In
                  </Button>
                )}

                <div className="text-center">
                  <Label className="text-md text-black">
                    Don't have an Account?{" "}
                  </Label>
                  <Link href={"signup"} className="-ml-3 text-md">
                    <Button variant="link" className="text-black">
                      Signup
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

export default LoginPage;
