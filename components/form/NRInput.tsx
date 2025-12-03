/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PHInputProps = {
  type?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  control: any;
};

const PHInput = ({
  type = "text",
  name,
  label,
  disabled,
  control,
}: PHInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input {...field} type={type} id={name} disabled={disabled} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PHInput;
