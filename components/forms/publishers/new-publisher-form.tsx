"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormTextInput from "@/components/input-fields/text-number-input";
import FormDatePickerInput from "@/components/input-fields/date-input";
import { FormCardWrapper } from "@/components/cards/form-card";
import { NewPublisherSchema } from "@/schemas/publisher/schema";
import addPublisher from "@/actions/publisher";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewPublisherForm = (locales: {}) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPublisherSchema>>({
    resolver: zodResolver(NewPublisherSchema),
    defaultValues: {
      date_of_establishment: undefined,
      publisher_country: undefined,
      publisher_name: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof NewPublisherSchema>) => {
    startTransition(() => {
      addPublisher(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            form.reset();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <FormCardWrapper headerLabel="New Publisher">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormTextInput
              formControl={form.control}
              id="publisher_name"
              required
              text="Publisher's name"
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="publisher_country"
              required
              text="Publisher's origin"
              disabled={isPending}
            />

            <FormDatePickerInput
              formControl={form.control}
              id="date_of_establishment"
              required
              text="Publication Date"
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Add
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
