import { ComponentProps } from "react";
import { cn } from "@/utils/style";
import { cva, type VariantProps } from "class-variance-authority";

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

type ITextInputProps = {
  label: string;
  wrapperClassName?: string;
} & ComponentProps<"input"> &
  VariantProps<typeof textInputVariants>;

const TextInput = ({
  label,
  variant,
  className,
  wrapperClassName,
  ...props
}: ITextInputProps) => {
  return (
    <div className={cn("w-full", wrapperClassName)}>
      <label htmlFor={props.id}>{label}</label>
      <input
        id={props.id}
        className={cn(textInputVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
};

export default TextInput;
