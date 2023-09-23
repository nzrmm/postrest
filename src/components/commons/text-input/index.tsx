import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { cva, type VariantProps } from "class-variance-authority";
import { FieldErrors, FieldError, UseFormRegister } from "react-hook-form";

const textInputVariants = cva(
  "w-full rounded-lg focus:outline-none px-4 py-2 border",
  {
    variants: {
      variant: {
        outline: ["border-neutral-200 focus:ring-1 focus:ring-neutral-300"],
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

type ITextInputProps = ComponentProps<"input"> & {
  id: string;
  note?: string;
  label?: string;
  wrapperClassName?: string;
  errors?: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
} & VariantProps<typeof textInputVariants>;

const TextInput = ({
  id,
  note,
  label,
  errors,
  variant,
  register,
  className,
  wrapperClassName,
  ...props
}: ITextInputProps) => {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label && <label htmlFor={id}>{label}</label>}

      <input
        id={id}
        className={cn(textInputVariants({ variant, className }), {
          "border-rose-500": errors && errors[id],
          "mt-1": label,
        })}
        {...(register && { ...register(id) })}
        {...props}
      />

      {note && <span className={cn("span-small block px-1 mt-1")}>{note}</span>}

      {errors && errors[id] && (
        <span className={cn("span-small-error block px-1 mt-1")}>
          {(errors[id] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
