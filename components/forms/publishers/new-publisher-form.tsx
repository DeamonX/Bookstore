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
import { BaseClientProps } from "@/models/components/type";

export const NewPublisherForm = ({ locale }: BaseClientProps) => {
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
            switch (data?.error) {
              case "invalid_fields":
                setError(locale.invalid_fields);
                break;
              case "name_exists":
                setError(locale.name_exists);
                break;
            }
          }
          if (data?.success) {
            form.reset();
            setSuccess(locale.success);
          }
        })
        .catch(() => setError(locale.something_went_wrong));
    });
  };

  return (
    <FormCardWrapper headerLabel={locale.new}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormTextInput
              formControl={form.control}
              id="publisher_name"
              required
              text={locale.publisher_name}
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="publisher_country"
              required
              text={locale.publisher_country}
              disabled={isPending}
            />

            <FormDatePickerInput
              formControl={form.control}
              id="date_of_establishment"
              required
              text={locale.date_of_establishment}
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {locale.add_publisher}
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
