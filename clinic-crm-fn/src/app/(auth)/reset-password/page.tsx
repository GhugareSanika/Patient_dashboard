'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetSchema } from '@/lib/schema-embedded';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, useToast } from "@/hooks/use-toast"
import Image from 'next/image';
import { Eye, EyeOff, Loader2 } from 'lucide-react';


function ResetPage() {

  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: '',
      confirmpassword: ''
    }
  })



  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No email provided. Please start the reset process again.",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/resetPassword`, {
        newPassword: values.newPassword
      },
        {
          params: { email }
        }
      )

      toast({
        title: "Reset Password Successful",
        description: "Your Password have been Reset successfully!",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
        },
      });
      route.push('/login')
    } catch (error) {
      console.log("Error", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: `${error}`,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='flex gap-6 min-h-screen justify-evenly'>
      <div className='my-auto ml-16'>
        <Image
          src={'/online-doctor.svg'}
          alt='Online Doctor'
          width={800}
          height={800}
          className=''
        />
      </div>
      <div className='min-h-screen w-full flex flex-col justify-center items-center'>
        <div className='max-w-sm space-y-6 p-8 bg-white dark:border-slate-50 shadow-md rounded-3xl'>
          <h1 className='sm:text-3xl text-2xl text-center font-semibold text-bluecolor'>Set new password</h1>
          <p className='text-black'>Must be at least 8 characters.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black'>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password" className='bg-white text-black'
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute top-2 right-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Eye className='text-black' /> : <EyeOff className='text-black' />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black'>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password" className='bg-white text-black'
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute top-2 right-2"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Eye className='text-black' /> : <EyeOff className='text-black' />}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? <Button disabled className='w-full h-10 bg-bluecolor'>
                <Loader2 className="animate-spin text-bluecolor" />
              </Button> : <Button className='w-full mt-4 h-8 bg-bluecolor text-white hover:bg-blue-900 active:translate-y-1'>Set new password</Button>}
            </form>
          </Form>

        </div>
      </div>
    </div>
  )
}

export default ResetPage