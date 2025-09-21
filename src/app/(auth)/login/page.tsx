"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import {signIn} from 'next-auth/react'
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

async function onSubmit(data: FormData){
const response = await signIn('credentials', {
  email: data.email,
  password: data.password,
  redirect: false,
  callbackUrl: '/',
});

if (response?.ok) {
  toast.success('logged in successfully', {
    position: 'top-center',
    duration: 2000
  });

  window.location.href = '/'

} else {
  toast.error(response?.error, {
    position: 'top-center',
    duration: 2000
  });
}

    // try {
    //   setLoading(true);
    //   const res = await fetch(
    //     "https://ecommerce.routemisr.com/api/v1/auth/signin",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );

    //   const result = await res.json();

    //   if (!res.ok) {
    //     throw new Error(result.message || "Login failed ❌");
    //   }

    //   toast.success("Logged in successfully ✅");

    //   localStorage.setItem("token", result.token);

    //   router.push("/");
    // } catch (error: any) {
    //   toast.error(error.message || "Login failed ❌");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Login
          </Button>

          <div className="flex flex-row justify-between">
            <Link
              href="/forgotPassword"
              className="text-sm text-red-500 hover:underline mt-3 block text-center"
            >
              Forgot Password?
            </Link>

            <Link
              href="/register"
              className="text-sm text-green-500 hover:underline mt-3 block text-center"
            >
              Dont have an account? Register
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
