'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { forgotSchema } from '@/lib/schema-embedded'
import axios from 'axios'
import { toast } from "@/hooks/use-toast"
import Image from 'next/image'
import { Loader2 } from 'lucide-react'


function page() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof forgotSchema>) => {
    try {
      setLoading(true);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password/forgotPassword`, {
        email: values.email
      });
      console.log('Response:', response.data);

      toast({
        title: "Reset Link Sent",
        description: response.data.message || "Password reset link has been sent to your email.",
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
        },
      });
      route.push('/login');
    } catch (error) {
      console.log('Error:', error);
      toast({
        variant: "destructive",
        title: "Reset link Failed",
        description: `${error}`,
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex gap-6 min-h-screen justify-evenly'>
      <div className='hidden md:block my-auto ml-16'>
        <Image
          src={'/online-doctor.svg'}
          alt='Online Doctor'
          width={800}
          height={800}
          className=''
        />
      </div>
      <div className='w-full flex flex-col justify-center items-center'>

        <div className='max-w-sm space-y-6 p-8 bg-white border-slate-50 shadow-md rounded-3xl'>

          <div className='inline-flex ml-32 bg-gray-300 p-4 rounded-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-keyhole dark:text-black"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
          </div>

          <h1 className='sm:text-3xl text-2xl text-center font-semibold text-bluecolor'>Reset your password</h1>
          <p className='text-black'>Forgot your password? Enter your email, and we'll send you a password reset link.</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter your email" className='bg-white text-black' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? <Button disabled className='w-full h-10 bg-bluecolor'>
                <Loader2 className="animate-spin text-bluecolor" />
              </Button> : <Button className='w-full mt-4 h-8 bg-bluecolor text-white hover:bg-blue-900 active:translate-y-1'>Reset Your Password</Button>}
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default page