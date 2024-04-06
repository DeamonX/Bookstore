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
import { BaseClientProps } from "@/models/components/type";

export const NewBookForm = ({ locale }: BaseClientProps) => {
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
            switch (data?.error) {
              case "invalid_fields":
                setError(locale.invalid_fields);
                break;
              case "title_exists":
                setError(locale.book_title_exists);
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
    <FormCardWrapper headerLabel={locale.new_book}>
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
              placeholder={locale.author_placeholder}
              id="authorId"
              required
              text={locale.author_text}
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
              placeholder={locale.publisher_placeholder}
              id="publisherId"
              required
              text={locale.publisher_placeholder}
              disabled={isPending}
            />

            <FormTextInput
              formControl={form.control}
              id="title"
              required
              text={locale.book_title}
              disabled={isPending}
            />
            <FormSelectInput
              formSetValue={form.setValue}
              placeholder={locale.book_type_placeholder}
              items={bookTypes}
              formControl={form.control}
              id="type"
              required
              text={locale.book_type}
              disabled={isPending}
            />
            <FormDatePickerInput
              formControl={form.control}
              id="publication_date"
              required
              text={locale.publication_date}
              disabled={isPending}
            />

            <FormTextInput
              formControl={form.control}
              id="price"
              required
              inputType="number"
              text={locale.book_price}
              disabled={isPending}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            {locale.insert_book}
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
