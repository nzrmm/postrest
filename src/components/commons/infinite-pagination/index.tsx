import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { cn } from "@/utils/style";

type IInfinitePaginationProps = {
  page: string | number;
  onNext: () => void;
  onPrevious: () => void;
  disableOnNext?: boolean;
  disableOnPrevious?: boolean;
};

const InfinitePagination = ({
  page,
  onNext,
  onPrevious,
  ...props
}: IInfinitePaginationProps) => {
  return (
    <div className={cn("flex justify-end items-center")}>
      <div
        className={cn(
          "w-9 h-9 rounded-full cursor-pointer",
          "flex justify-center items-center",
          {
            "bg-neutral-900": !props.disableOnPrevious,
            "bg-neutral-500": props.disableOnPrevious,
          }
        )}
        onClick={() => !props.disableOnPrevious && onPrevious()}
      >
        <BiChevronLeft size={20} color={"#FFF"} />
      </div>

      <span className={cn("w-12 font-semibold text-center")}>{page}</span>

      <div
        className={cn(
          "w-9 h-9 bg-neutral-900 rounded-full cursor-pointer",
          "flex justify-center items-center",
          {
            "bg-neutral-900": !props.disableOnNext,
            "bg-neutral-500": props.disableOnNext,
          }
        )}
        onClick={() => !props.disableOnNext && onNext()}
      >
        <BiChevronRight size={20} color={"#FFF"} />
      </div>
    </div>
  );
};

export default InfinitePagination;
