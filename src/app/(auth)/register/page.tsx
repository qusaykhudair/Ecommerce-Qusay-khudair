"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ استدعاء الراوتر
import Link from "next/link";

// ✅ Validation schema with Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string(),
    phone: z
      .string()
      .regex(/^01[0-9]{9}$/, "Invalid phone number (must start with 01)"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type RegisterFormType = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const onSubmit = async (values: RegisterFormType) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      console.log("✅ Register Response:", data);

      if (res.ok) {
        toast.success("Account created successfully 🎉");
        form.reset();
        router.push("/login");
      } else {
        toast.error(data.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error("❌ Register Error:", err);
      toast.error("Network error, please try again later ⚠️");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
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
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Re-Password */}
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showRePassword ? "text" : "password"}
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                        onClick={() => setShowRePassword((prev) => !prev)}
                      >
                        {showRePassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="010xxxxxxxx" {...field} />
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
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
              <Link href="/login" className="text-sm text-green-500 hover:underline mt-1 block text-center">
                Already have an account? Login
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
