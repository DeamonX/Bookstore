"use client";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

type FormTextInputModel<T extends FieldValues> = {
  formControl: Control<T>;
  id: Path<T>;
  disabled?: boolean;
  maxLength?: number;
  inputType?: "number" | "text";
  required?: boolean;
  divStyle?: string;
  textStyle?: string;
  text?: string;
  inputStyle?: string;
};
export default function FormTextInput<T extends FieldValues>({
  divStyle,
  formControl,
  inputType = "text",
  maxLength = 200,
  required = false,
  disabled = false,
  id,
  inputStyle,
  text,
  textStyle,
}: FormTextInputModel<T>) {
  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col mb-[5px]", divStyle)}>
          <FormLabel
            className={cn(
              "text-opacity-90 text-[14px] font-breuer-regular",
              textStyle
            )}
          >
            {text}
            {required && "*"}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              value={field.value === undefined ? "" : field.value}
              type={inputType}
              onChange={(event) => {
                if (event.target.value === "") {
                  field.onChange(undefined);
                }
                field.onChange(
                  inputType === "number"
                    ? +event.target.value
                    : event.target.value
                );
              }}
              maxLength={maxLength}
              disabled={disabled}
              className={cn("aria-[invalid=true]:border-[#dc2626]", inputStyle)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
