"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { makeCashPayment, makeOnlinePayment } from "@/api/checkout.api";
import { useParams, useRouter } from "next/navigation";
import { CartContext } from "@/context/cart.context";
import { toast } from "sonner";

const shippingSchema = z.object({
  details: z.string().min(3, "Address must be at least 3 characters"),
  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits (numbers only)"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

type ShippingForm = z.infer<typeof shippingSchema>;

type Props = {
  onOnline?: (data: ShippingForm) => Promise<void> | void;
  onCash?: (data: ShippingForm) => Promise<void> | void;
};

export default function CheckoutForm({ onOnline, onCash }: Props) {
 const {id}:{id:string} = useParams()
 const router = useRouter();
 const cart = useContext(CartContext);
  const form = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    mode :'all'
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;


  const handleOnline = handleSubmit(async (values) => {
    if (onOnline) await onOnline(values);
    else {
      console.log("Pay Online -> payload:", values);
    const data = await makeOnlinePayment(id , 'https://ecommerce-qusay-khudair.vercel.app' , values)
      if(data.status == 'success'){
        window.location.href = data.session.url;
      }
  }
  });

 const handleCash = handleSubmit(async (values) => {
  if (onCash) {
    await onCash(values);
  } else {
    const cashData = await makeCashPayment(id, values);

    const orderId = cashData?.data?._id || cashData?._id;

    if (orderId) {
// router.push(`/orders?id=${cashData?.data?._id}`);
toast.success("Payment Successfly")
cart?.handleCart()
router.push('/')
console.log(cashData);
    } else {
      console.error("Order ID not found in API response", cashData);
    }
  }
});

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter shipping details to continue to payment
        </p>

        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Street, building, floor..."
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="010xxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Cairo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-4">
              <Button
                type="button"
                onClick={handleOnline}
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting ? "Processing..." : "Pay Online"}
              </Button>

              <Button
                type="button"
                onClick={handleCash}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Processing..." : "Cash on Delivery"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
