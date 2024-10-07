import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { z } from "zod";
import { AuthformSchema } from "@/lib/schema";

const formSchema = AuthformSchema("sign-up");

// CustomInput interface
interface AuthInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

// CustomInput component
const AuthInput = ({ control, name, label, placeholder }: AuthInputProps) => {
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
                className="input-class"
                type={name === "password" ? "password" : "text"}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2">
              {/* Render the error message if it exists */}
              {fieldState.error ? (
                <span>{fieldState.error.message}</span>
              ) : null}
            </FormMessage>
          </div>
        </div>
      )}
    />
  );
};

export default AuthInput;
