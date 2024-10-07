import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

// CustomInput interface with dynamic input props
interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

// CustomInput component
const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  disabled = false,
  required = false,
  autoComplete = "off",
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                className="input-class"
                {...field}
              />
            </FormControl>
            {fieldState.error ? (
              <FormMessage className="form-message mt-2 text-red-500">
                {fieldState.error.message}
              </FormMessage>
            ) : null}
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
