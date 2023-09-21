import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/style";

const badgeVariants = cva(
  "flex justify-center items-center rounded-full capitalize",
  {
    variants: {
      size: {
        sm: "w-20 h-6 text-sm",
      },
      variant: {
        success: ["bg-emerald-500 text-white"],
        danger: ["bg-rose-500 text-white"],
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "success",
    },
  }
);

type IBadgeProps = ComponentProps<"div"> & VariantProps<typeof badgeVariants>;

const Badge = ({ variant, className, children, ...props }: IBadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </div>
  );
};

export default Badge;
