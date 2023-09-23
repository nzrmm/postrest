import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ImSpinner6 } from "react-icons/im";

import { cn } from "@/utils/style";

const buttonVariants = cva("font-medium rounded-full", {
  variants: {
    size: {
      sm: "px-6 py-2 text-sm",
    },
    variant: {
      primary: ["bg-neutral-900 text-white hover:bg-neutral-800"],
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "primary",
  },
});

type IButtonProps = {
  isLoading?: boolean;
} & ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

const Button = ({
  size,
  variant,
  isLoading,
  className,
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant, className }),
        "flex justify-center items-center"
      )}
      {...props}
    >
      {isLoading ? <ImSpinner6 className={cn("animate-spin")} /> : children}
    </button>
  );
};

export default Button;
