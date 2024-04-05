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
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { NewAuthorSchema } from "@/schemas/author/schema";
import addAuhtor from "@/actions/author";
import { enumToSelectFieldItems } from "@/lib/utils";
import { Genders } from "@prisma/client";
import FormSelectInput from "@/components/input-fields/select-input";
import useGetPublishers from "@/hooks/publisher/useGetAuthors";
import useGetBooks from "@/hooks/book/useGetBooks";

export const NewAuthorForm = (locales: {}) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const { publishers } = useGetPublishers();
  const { books } = useGetBooks();
  const genderTypes = enumToSelectFieldItems(Genders);

  const form = useForm<z.infer<typeof NewAuthorSchema>>({
    resolver: zodResolver(NewAuthorSchema),
    defaultValues: {
      author_country: undefined,
      author_first_name: undefined,
      author_last_name: undefined,
      dob: undefined,
      favorite_book_category: undefined,
      favorite_bookId: undefined,
      gender: undefined,
      publisherId: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof NewAuthorSchema>) => {
    startTransition(() => {
      addAuhtor(values)
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
              id="author_first_name"
              required
              text="Author's first name"
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="author_last_name"
              text="Author's last name"
              disabled={isPending}
            />

            <FormDatePickerInput
              formControl={form.control}
              id="dob"
              text="Date of birth"
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="author_country"
              text="Publisher's origin"
              disabled={isPending}
            />
            <FormSelectInput
              formSetValue={form.setValue}
              placeholder="Select Gender"
              formControl={form.control}
              items={genderTypes}
              id="gender"
              required
              text="Gender"
              disabled={isPending}
            />

            <FormSelectInput
              formSetValue={form.setValue}
              items={publishers?.map((publisher) => {
                return {
                  value: publisher.id,
                  description: publisher.publisher_name,
                };
              })}
              formControl={form.control}
              id="publisherId"
              placeholder="Select Publisher"
              text="Author's Publisher"
              disabled={isPending}
            />
            <FormSelectInput
              items={books?.map((book) => {
                return {
                  value: book.id,
                  description: book.title,
                };
              })}
              formControl={form.control}
              placeholder="Select favorite book"
              id="favorite_bookId"
              text="Author's favorite book"
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="favorite_book_category"
              text="Authors's favorite book category"
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="flex m-auto w-3/4"
          >
            Add
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
