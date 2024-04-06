"use client";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format, isValid, parse } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { Input } from "../ui/input";
import { useLocale } from "next-intl";

type FormDatePickerInputModel<T extends FieldValues> = {
  formControl: Control<T>;
  disabled?: boolean;
  iconColor?: string;
  required?: boolean;
  divStyle?: string;
  textStyle?: string;
  id: Path<T>;
  text?: string;
};
export default function FormDatePickerInput<T extends FieldValues>({
  divStyle,
  id,
  text,
  textStyle,
  formControl,
  required = false,
  disabled = false,
}: FormDatePickerInputModel<T>) {
  const locale = useLocale();

  const formDate = useWatch({ name: id }) as Date | string;
  const newDate = new Date(formDate);
  const dateInit = isValid(newDate) ? newDate : undefined;
  const { error } = useFormField();
  const [inputValue, setInputValue] = useState(
    dateInit ? format(dateInit ?? "", "y.MM.dd") : ""
  );
  const [date, setDate] = useState<Date | undefined>(dateInit);

  const handleInputChange = (e: any, onChange: (...event: any[]) => void) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y.MM.dd", new Date());
    if (isValid(date)) {
      setDate(date);
      onChange(date);
    } else setDate(undefined);
  };

  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col mb-[5px]", divStyle)}>
          <FormLabel
            className={cn("text-opacity-90 text-[14px]", textStyle)}
            htmlFor={`input-${id}`}
          >
            {text}
            {required && "*"}
          </FormLabel>

          <Popover>
            <fieldset className="relative w-full">
              <Input
                className={`${error && `border border-red-500`}`}
                placeholder={locale === "en" ? "yyyy.mm.dd" : "éééé.hh.nn"}
                onChange={(e) => {
                  handleInputChange(e, field.onChange);
                }}
                value={inputValue}
              />
              <PopoverTrigger
                disabled={disabled}
                className="cursor-pointer"
                asChild
              >
                <Button
                  variant={"ghost"}
                  className="absolute top-1/2 -translate-y-1/2 right-1.5"
                >
                  <CalendarIcon size={20} className={`ml-auto`} />
                </Button>
              </PopoverTrigger>
            </fieldset>
            <PopoverContent>
              <FormControl>
                <Calendar
                  disabled={disabled}
                  id={`calendar-${id}`}
                  mode="single"
                  defaultMonth={date}
                  selected={date}
                  initialFocus
                  onSelect={(e) => {
                    setDate(e);
                    if (e) setInputValue(format(e, "y.MM.dd"));
                    else setInputValue("");
                    field.onChange(e);
                  }}
                />
              </FormControl>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
