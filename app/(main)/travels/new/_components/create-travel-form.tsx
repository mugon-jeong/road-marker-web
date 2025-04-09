"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createTravel } from "../_actions/travel-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});
export default function CreateTravelForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await createTravel(values);
    if (error) {
      toast.error(`Error creating travel: ${error.message}`);
      return;
    }
    if (data) {
      toast.success(`Travel created successfully with title: ${values.title}`);
      queryClient.invalidateQueries({ queryKey: ["get-travels"] });
      form.reset();
      router.back();
    } else {
      toast.error("Error creating travel");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>여행 제목</FormLabel>
              <FormControl>
                <Input placeholder="한국 여행" {...field} />
              </FormControl>
              <FormDescription>
                여행을 대표하는 제목을 입력해주세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
