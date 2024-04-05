"use client";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDown, CheckIcon } from "lucide-react";
import { useState } from "react";

export type ComboBoxItemModel = { value: string; description: string };

type FormSelectInputModel<T extends FieldValues> = {
  formControl: Control<T>;
  emptySelect?: string;
  iconColor?: string;
  formSetValue?: (
    name: any,
    value: any,
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined
  ) => void;
  placeholder?: string;
  items: ComboBoxItemModel[];
  disabled?: boolean;
  required?: boolean;
  divStyle?: string;
  textStyle?: string;
  id: Path<T>;
  text: string;
  specialSearch?: boolean;
};
export default function FormSelectInput<T extends FieldValues>({
  divStyle,
  id,
  formSetValue,
  placeholder = "",
  text,
  emptySelect = "",
  items,
  textStyle,
  formControl,
  required = false,
  disabled = false,
}: FormSelectInputModel<T>) {
  const [open, setOpen] = useState(false);
  const formValue = useWatch({ name: id });
  const expandedItems = [
    { value: undefined, description: placeholder },
    ...items,
  ] as ComboBoxItemModel[];
  const getSelectedValue = () => {
    return (
      expandedItems.find((item) => item.value === formValue)?.description ??
      placeholder
    );
  };

  return (
    <FormField
      control={formControl}
      name={id}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col mb-[5px]", divStyle)}>
          <FormLabel className={textStyle} htmlFor={`input-${id}`}>
            {text}
            {required && "*"}
          </FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
              <FormControl>
                <Button
                  asChild
                  variant="ghost"
                  role="combobox"
                  className="w-full border text-left aria-[invalid=true]:border-[#dc2626]"
                  disabled={disabled}
                >
                  <div className="flex">
                    {getSelectedValue()}
                    <ChevronDown className="ml-auto" />
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="">
              <Command className=" pt-2">
                <CommandInput
                  placeholder={placeholder}
                  className="h-7 mb-2 px-2 border border-solid border-input"
                />
                <CommandEmpty>{emptySelect}</CommandEmpty>
                <CommandGroup className="overflow-auto">
                  {expandedItems.map((item) => (
                    <CommandItem
                      value={item.value}
                      key={item.value}
                      onSelect={() => {
                        formSetValue && formSetValue(id, item.value);
                        setOpen(false);
                      }}
                    >
                      {item.description}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          item.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
