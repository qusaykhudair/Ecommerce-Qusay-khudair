"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Reset Password Response:", result);

      if (res.ok) {
        toast.success("Password reset successfully ✅");
        router.push("/login");
      } else {
        toast.error(result.message || "Failed to reset password ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
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

          {/* New Password */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
