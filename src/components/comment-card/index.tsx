import { cn } from "@/utils/style";
import { IComment } from "@/types/comment";

const CommentCard = ({ name, email, body }: IComment) => {
  return (
    <div>
      <div className={cn("mb-2")}>
        <p className={cn("font-semibold")}>{name}</p>
        <p className={cn("text-xs text-neutral-500")}>{email}</p>
      </div>
      <p className={cn("text-neutral-700 leading-relaxed text-sm")}>{body}</p>
    </div>
  );
};

export default CommentCard;
