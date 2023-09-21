import { ComponentProps } from "react";

import { cn } from "@/utils/style";

type IBoxIconProps = ComponentProps<"div">;

const BoxIcon = ({ children, className, ...props }: IBoxIconProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center cursor-pointer",
        "w-8 h-8 rounded-lg bg-transparant",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BoxIcon;
