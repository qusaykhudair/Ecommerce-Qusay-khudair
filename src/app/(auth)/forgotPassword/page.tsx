"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Request failed ❌");
      }

      toast.success("Reset link sent to your email ✅");
      router.push('/verifyCode');
      
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("Something went wrong ❌");
  }
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
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
                    <Input
                      placeholder="Enter your registered email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
