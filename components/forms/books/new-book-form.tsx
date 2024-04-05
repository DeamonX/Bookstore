"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { NewBookSchema } from "@/schemas/book/schema";
import FormTextInput from "@/components/input-fields/text-number-input";
import FormSelectInput from "@/components/input-fields/select-input";
import FormDatePickerInput from "@/components/input-fields/date-input";
import { FormCardWrapper } from "@/components/cards/form-card";
import useGetAuthors from "@/hooks/author/useGetAuthors";
import useGetPublishers from "@/hooks/publisher/useGetAuthors";
import { enumToSelectFieldItems } from "@/lib/utils";
import { BookType } from "@prisma/client";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import addBook from "@/actions/book";

export const NewBookForm = (locales: {}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const { authors } = useGetAuthors();
  const { publishers } = useGetPublishers();
  const bookTypes = enumToSelectFieldItems(BookType);

  const form = useForm<z.infer<typeof NewBookSchema>>({
    resolver: zodResolver(NewBookSchema),
    defaultValues: {
      authorId: undefined,
      price: undefined,
      publication_date: undefined,
      publisherId: undefined,
      title: undefined,
      type: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof NewBookSchema>) => {
    startTransition(() => {
      addBook(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <FormCardWrapper headerLabel="New Book">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormSelectInput
              formSetValue={form.setValue}
              items={authors?.map((author) => {
                return {
                  value: author.id,
                  description: author.author_first_name
                    .concat(" ")
                    .concat(author.author_last_name ?? ""),
                };
              })}
              formControl={form.control}
              placeholder="Select author"
              id="authorId"
              required
              text="Author"
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
              placeholder="Select publisher"
              id="publisherId"
              required
              text="Publisher"
              disabled={isPending}
            />

            <FormTextInput
              formControl={form.control}
              id="title"
              required
              text="Title"
              disabled={isPending}
            />
            <FormSelectInput
              formSetValue={form.setValue}
              placeholder="Select type"
              items={bookTypes}
              formControl={form.control}
              id="type"
              required
              text="Type"
              disabled={isPending}
            />
            <FormDatePickerInput
              formControl={form.control}
              id="publication_date"
              required
              text="Publication Date"
              disabled={isPending}
            />

            <FormTextInput
              formControl={form.control}
              id="price"
              required
              inputType="number"
              text="Price"
              disabled={isPending}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
