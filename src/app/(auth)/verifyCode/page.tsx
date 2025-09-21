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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  resetCode: z
    .string()
    .min(6, "Reset code must be 6 digits")
    .max(6, "Reset code must be 6 digits"),
});

type FormData = z.infer<typeof formSchema>;

export default function VerifyCodePage() {
  const [loading, setLoading] = useState(false);
const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      console.log("🔍 Verify Code Response:", result);

      if (!res.ok) {
        toast.error(result.message || "Invalid reset code ❌");
        return;
      }

      toast.success("Code verified successfully ✅");
      router.push('/resetPassword')
    } catch (error) {
      console.error("❌ Verify Code Error:", error);
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
            Verify Reset Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Reset Code */}
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reset Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter the 6-digit code"
                        maxLength={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
