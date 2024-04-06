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
import { BookType, COUNTRY, Genders } from "@prisma/client";
import FormSelectInput from "@/components/input-fields/select-input";
import useGetPublishers from "@/hooks/publisher/useGetAuthors";
import useGetBooks from "@/hooks/book/useGetBooks";
import { BaseClientProps } from "@/models/components/type";

export const NewAuthorForm = ({ locale }: BaseClientProps) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const { publishers } = useGetPublishers();
  const { books } = useGetBooks();

  const genderTypes = enumToSelectFieldItems(Genders);
  const bookTypes = enumToSelectFieldItems(BookType);
  const countrys = enumToSelectFieldItems(COUNTRY);

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
            switch (data?.error) {
              case "invalid_fields":
                setError(locale.something_went_wrong);
                break;
              case "title_exists":
                setError(locale.invalid_fields);
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
    <FormCardWrapper headerLabel={locale.new_author}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormTextInput
              formControl={form.control}
              id="author_first_name"
              required
              text={locale.author_first_name}
              disabled={isPending}
            />
            <FormTextInput
              formControl={form.control}
              id="author_last_name"
              text={locale.author_last_name}
              disabled={isPending}
            />

            <FormDatePickerInput
              formControl={form.control}
              id="dob"
              text={locale.author_dob}
              disabled={isPending}
            />
            <FormSelectInput
              items={countrys}
              formSetValue={form.setValue}
              formControl={form.control}
              placeholder={locale.country_placeholder}
              id="author_country"
              text={locale.author_country}
              disabled={isPending}
            />
            <FormSelectInput
              formSetValue={form.setValue}
              placeholder={locale.gender_placeholder}
              formControl={form.control}
              items={genderTypes}
              id="gender"
              required
              text={locale.gender}
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
              placeholder={locale.publisher_placeholder}
              text={locale.publisher_author}
              disabled={isPending}
            />
            <FormSelectInput
              formSetValue={form.setValue}
              items={books?.map((book) => {
                return {
                  value: book.id,
                  description: book.title,
                };
              })}
              formControl={form.control}
              placeholder={locale.book_favorite_placeholder}
              id="favorite_bookId"
              text={locale.author_favorite_book}
              disabled={isPending}
            />
            <FormSelectInput
              items={bookTypes}
              formSetValue={form.setValue}
              placeholder={locale.favorite_type_placeholder}
              formControl={form.control}
              id="favorite_book_category"
              text={locale.favorite_book_category}
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
            {locale.insert_author}
          </Button>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
